import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import { DB_URL } from "./config.js";

const connect = async()=>{
    try {
        const connect =  await mongoose.connect(`${DB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected ! DB host: ${connect.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
}

export default connect;