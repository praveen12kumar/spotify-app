import { UserService } from "../services/index.js";

const userService = new UserService();


export const getUserDetails = async(req, res)=>{
    try {
        const user = await userService.getUserById(req.user._id);
        return res.status(200).json({
            success: true,
            data: user,
            message: "User found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}


export const findUserById = async(req, res)=>{
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(200).json({
            success: true,
            data: user,
            message: "User found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}

export const  getAllUsers = async(req, res)=>{
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({
            success: true,
            data: users,
            message: "Users found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}


export const updateUserProfile = async(req, res)=>{
    try {
       
        const localImagePath = req.file?.path;
        const username = req.body.username;
        const user = await userService.updateUser(req.user.id, username, localImagePath );
        return res.status(200).json({
            success: true,
            data: user,
            message: "User updated successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "User not found") {
            return res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error
            })
        }
        if(error.message === "Avatar is required") {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Avatar is required",
                err: error
            })
        }
        if(error.message === "Avatar upload failed"){
            return res.status(408).json({
                success: false,
                data: {},
                message: "Avatar upload failed",
                err: error
            })
        }
        else {return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
        }
    }
}