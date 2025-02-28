
import {UserService} from "../services/index.js";


const userService = new UserService();


//-------------------- Signup Controller --------------------

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const localImagePath = req?.files?.avatar[0]?.path;

    if(!username || !email || !password || !localImagePath){
        return res.status(400).json({
            success: false,
            data: {},
            message: "All fields are required",
            err:{}
        })
    }

    try {
        const response = await userService.signup({username, email, password, localImagePath}); 
        
        res.cookie("token", response.token, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7
            }            
        );
        return res.status(200).json({
            success: true,
            data: response.newUser,
            message: "User created successfully",
            err:{}
        })
    } catch (error) {  
      
        if(error.message == "user already exists") {
            return res.status(409).json({
                success: false,
                data: {},
                message: "User already exists",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",    
            err: error
            })
        }
    }
};


//-------------------- Login Controller --------------------

export const login = async(req, res)=>{
    const {email, password} = req.body;  

    // verify email
    if(!email || !password){
        return res.status(400).json({
            success: false,
            data: {},
            message: "All fields are required",
            err:{}
        })
    }

    try{  
          const response = await userService.signin({email, password});
          
          res.cookie("token", response.token, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7
            }            
        );
          return res.status(200).json({
              success: true,
              data: response.user,
              message: "User logged in successfully",
              err:{}
          })
        } catch (error) {
        if(error.message === "no user found"){
            return res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error.message
            })
        }
        if(error.message === "invalid password"){
            return res.status(400).json({
                success: false,
                data: {},
                message: "invalid password",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
            }) 
        }  
    }
}



//----------------- Verify Email Controller ---------------------

export const verifyEmail = async(req, res)=>{
    // 1 2 3 4 5 6  six digits code
    const {code} = req.body;
    try{
        const response = await userService.verifyUserEmail(code);
        return res.status(200).json({
            success: true,
            data: response,
            message: "User verified successfully",
            err:{}
        })
    }
    catch(error){
        if(error.message === "invalid verification code"){
            return res.status(400).json({
                success: false,
                data: {},
                message: "invalid verification code",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
           })
        }
    }
} 



//-------------logout Controller-----------------


export const logout = async (req, res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success:true,
            data:{},
            message:"User logout successfully",
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
        })
    }
}



//--------------forgot -password Controller------------------

export const forgotPassword = async(req, res)=>{
    const {email} = req.body;
    try{
        const response = await userService.forgotUserPassword(email);
        return res.status(200).json({
            success: true,
            data:{},
            message: "Password reset link sent to your email",
            err:{}
        })
    }
    catch(error){
        if(error.message === "User not found"){
            return res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
            })
        }
    }
}


//----------------- Reset-password Controller ------------------

export const resetPassword = async(req, res)=>{
    const {password} = req.body;
    const {token} = req.params;

    console.log("token", token);
    console.log("password", password);
        try{
        const response = await userService.resetUserPassword(token, password);
        return res.status(200).json({
            success: true,
            data: response,
            message: "Password reset successfully",
            err:{}
        })
    }
    catch(error){
        if(error.message === "User not found"){
            return res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error.message
            })
        }
    }
}






