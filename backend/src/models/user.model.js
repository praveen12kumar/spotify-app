import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../config/config.js";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "can't be blank"],
        trim:true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true, "Email already exists"],
        trim:true,
        match:[/\S+@\S+\.\S+/, 'Please fill a valid email'],
    },

    password:{
        type: String,
        required: [true, "Password is required"],
        trim:true,
        minLength: [3, 'Password cannot be less than 3 characters']
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default:""
    },
    likedSongs:{
        type: [String],
        default:""
    },
    subscribedArtists:{
        type: [String],
        default:""
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date
},
{
    timestamps: true
});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);
        this.password = encryptedPassword;
        const verToken = Math.floor(100000 + Math.random() * 900000).toString();
        this.verificationToken = verToken;
        this.verificationTokenExpire = Date.now() + 10 * 60 * 1000;
        if(!this.avatar){
            this.avatar = `https://robohash.org/${this.username}`;
        }
        next();
    } catch (error) {
        next(error)
        console.error("Error saving user:", error);
    }
})

userSchema.methods.comparepassword = function compare(password){
    const result = bcrypt.compareSync(password, this.password);
    return result;   
}

userSchema.methods.generateJWTToken = function() {
    const token = jwt.sign(
        {
            id: this._id.toString(), // Use the string representation of the ObjectId
            email: this.email,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
    return token;
};


const User = mongoose.model("users", userSchema);
export default User;
