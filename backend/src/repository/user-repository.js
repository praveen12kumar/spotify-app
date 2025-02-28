import User from "../models/user.model.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    
    async findBy(data){
        
        try {
            const response = await User.findOne(data);
            
            return response;
        } catch (error) {
           // console.log("error", error);
            
            throw error;
        }
    }

    async findById(id){
        try {
            const response = await User.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async findByEmail(data){
        try {
            const response = await User.findOne({email:data});
            return response;
        } catch (error) {
            throw error;
        }
    }


    async findUserByToken(code){
        //console.log("code",code);
        
        try {
            const response = await User.findOne({
                verificationToken:code, 
                verificationTokenExpire: {$gt: Date.now()}});
                //console.log("response repository",response);
                
            return response;
        } catch (error) {
            throw error
        }
    }

    async findByResetPassword(token){
        try {
            const response = await User.findOne({
                resetPasswordToken:token, 
                resetPasswordExpire: {$gt: Date.now()}});
            return response;
        } catch (error) {
            throw error
        }
    }

    async findAndUpdate(id, data){
        //console.log("id", id);
        try {
            const response = await User.findByIdAndUpdate(id,{
                $set:{
                    avatar:data.avatar,
                    username: data.username
                }
            },{
                new:true
            })
            //console.log("response", response);
            
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;