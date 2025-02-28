import {UserRepository} from "../repository/index.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessfulEmail } from "../mailtrap/emails.js";
import crypto from "crypto";
import brcypt from "bcrypt";
import uploadOnCloudinary from "../config/cloudinary-config.js";
import { log } from "console";

class UserService{

    constructor(){
        this.userRespository = new UserRepository();
    }
    
    async signup(data) {
        // check if user already exist
        const {username, email, password} = data;
        const user = await this.userRespository.findBy({email: data.email});

        if(user){
            throw{
                message: "user already exists",
                success: false,
            }
        }

        const result = await uploadOnCloudinary(data.localImagePath, "profile");
        //console.log("result", result.secure_url);
 
        
        
        if(!result){
            throw{
                message:"profile upload failed",
                success:false
            }
        }

        const newObj = {
            username,
            email,
            password,
            avatar:result?.secure_url
        }

        const newUser = await this.userRespository.create(newObj);
        //console.log("newUser", newUser);
        
        const token = newUser.generateJWTToken();

        sendVerificationEmail(newUser.email, newUser.verificationToken);
        
        return {newUser, token};
    }

    // ------------verify user Email--------------

    async verifyUserEmail(code){
        
        const user = await this.userRespository.findUserByToken(code)
        if(!user){
            throw{
                message: "invalid verification code",
                success: false,
            }
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.username);
        return user
    }

// ------------login user------------

    async signin(data){
        try {
            const user = await this.userRespository.findByEmail(data.email); 
            if(!user){
                throw{
                    message: "no user found",
                    success: false,
                }
            }
            // compare the password of user
            if(!user.comparepassword(data.password)){
                throw{
                    message: "invalid password",
                    success: false,
                }
            }
            
            //generate token
            const token = user.generateJWTToken();
            return {user, token};    
        } catch (error) {
            throw error
        }
    }

// -------------forgot -password Service--------------

  async forgotUserPassword(email){
        try {
            const user = await this.userRespository.findByEmail(email);
            if(!user){
                throw{
                    message: "User not found",
                    success: false,
                }
            }

            //generate Reset token

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 1 hr

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = resetTokenExpire;
            await user.save();

            await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
            return user;

        } catch (error) {
            throw error
        }
    }



// ----------resetUserPassword----------------

    async resetUserPassword(token, password){
        try {
            const user = await this.userRespository.findByResetPassword(token);
            if(!user){
                throw{
                    message: "Invalid or Expired token",
                    success: false,
                }
            }
            console.log("user", user);
            
            const hashedPassword = await brcypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            console.log("user", user);
            await sendResetSuccessfulEmail(user.email);

        } catch (error) {
            throw error
        }
    }

    //-------------- Update profile-----------------

    async updateUser(id, username,localImagePath){
        try {
            const user = await this.userRespository.findById(id);
            if(!user){
                throw{
                    message: "User not found",
                    success: false,
                }
            }

            if(!localImagePath){
                throw{
                    message:"Avatar is required",
                    success: false,
                }
            }

            // update avatar to cloudinary
            const result = await uploadOnCloudinary(localImagePath, "profile");
            if(!result){
                throw{
                    message:"Avatar upload failed",
                    success: false,
                }
            }
            const newUser = await this.userRespository.findAndUpdate(id,{avatar: result?.secure_url, username});
            // user.avatar = result?.secure_url;
            // user.username = username;
            // await user.save();
            return newUser;
        } catch (error) {
            console.log("error", error);
            throw error
        }
    }

    async getUserById(id){
        
        try {
            const user = await this.userRespository.get(id);
            //console.log("user", user)
            if(!user){
                throw{
                    message: "User not found",
                    success: false,
                }
            }
            return user;
        } catch (error) {
            throw error
        }
    }



    async getAllUsers(){
        try {
            const users = await this.userRespository.getAll(); 
            return users

        } catch (error) {
            throw error;
        }
    }

}


export default UserService;