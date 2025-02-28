import { config } from 'dotenv';

config({
    path:'./.env'
});

const PORT = process.env.PORT
const DB_URL = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN
const cloud_name = process.env.CLOUDINARY_NAME
const cloud_api_key = process.env.CLOUDINARY_API_KEY
const cloud_api_secret = process.env.CLOUDINARY_SECRET


export {PORT, DB_URL, JWT_SECRET, JWT_EXPIRY, MAILTRAP_TOKEN, cloud_name, cloud_api_key, cloud_api_secret};