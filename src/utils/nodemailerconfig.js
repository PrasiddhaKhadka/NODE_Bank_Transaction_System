const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
        user: 'jefferey.goodwin@ethereal.email',
        pass: 'rJtYqeGJTcuwXZNeRt'
    }
});





module.exports = transporter