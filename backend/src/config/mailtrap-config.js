import nodemailer from "nodemailer";

// Load .env file (default location)
// Looking to send emails in production? Check out our Email API/SMTP product!
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "apitest2561@gmail.com",
    pass: "btrw vjde rctq ptal",
  },
});