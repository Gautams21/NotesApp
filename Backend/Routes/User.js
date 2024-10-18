const express = require("express");
const Route = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const {AuthenticationToken, PasswordToken}=require('../Utilities');
const bcrypt=require('bcrypt');
const nodemailer = require("nodemailer");
require('dotenv').config(); 



// Create a new user (Sign up)
Route.post("/create-account", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: true, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: true, message: "Password is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }
    const hashpassword=bcrypt.hashSync(password,10);
    // Create new user
    const user = await userModel.create({
      name,
      email,
      password:hashpassword,
    });

    // Sign JWT token (use an object for payload)
    const accessToken = jwt.sign({user}, process.env.ACCESS_SECRET, { expiresIn: '36000m' });

    // Send success response
    return res.status(201).json({
      success: true,
      accessToken,
      data: user,
    });

  } catch (error) {
    // Catch and return errors
    console.error(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

// login a USer
Route.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email){
            return res.status(401).json({error:true,message:'Email is required'});
        }
        if(!password){
            return res.status(401).json({error:true,message:'Password is required'});
        }
        const user=await userModel.findOne({email:email});
       if(!user){
        return res.status(401).json({error:true,message:"User not found"});
       }
       const comparepass=bcrypt.compareSync(password,user.password);
       if(!comparepass){
        return res.status(401).json({error:true,message:"Wrong Password"});
       }
       if(user.email===email && comparepass){
        const accessToken=jwt.sign({user},process.env.ACCESS_SECRET,{expiresIn:"36000m"});

        return res.status(200).json({
            success:true,
            email,
            message:"Login Successfull",
            accessToken
           })
       }

    } catch (error) {
        return res.status(501).json({error:true,message:"Server error"});
    }

})

// Get user
Route.get('/getuser',AuthenticationToken,async(req,res)=>{
    const {user}=req.user
    try {
     const isuser=await userModel.findOne({_id:user._id});
     if(!isuser){
        return res.status(401).json({error:true,message:"User not found"})
     }else{
        return res.status(200).json({
            user:{
               Fullname:isuser.name,
               email:isuser.email,
               "_id":isuser._id
            }
        })
     }     
    } catch (error) {
     return res.status(501).json({error:true,message:"Server Error"});
    }
 })

// forgot-password

// Route.put('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Validate email input
//     if (!email) {
//       return res.status(400).json({ error: true, message: "Enter a valid email" });
//     }

//     // Find user by email
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: true, message: "User not found" });
//     }

//     // Generate reset token
//     const resettoken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '15m' });

//     // Send reset token response (you'll send this via email in production)
//     return res.status(200).json({ success: true, resettoken, message: "Reset token generated. User found" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: true, message: "Server Error" });
//   }
// });

Route.put('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email input
    if (!email) {
      return res.status(400).json({ error: true, message: "Enter a valid email" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });

    // Nodemailer configuration (using Ethereal for testing)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports like 587
      auth: {
        user: process.env.EMAIL_USER, // Your Ethereal test email address
        pass: process.env.EMAIL_PASS, // Your Ethereal test email password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: user.email, // Recipient email
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link below to reset your password:\n\n
             ${process.env.CLIENT_URL}/newpassword/${resetToken}\n\n
             The link will expire in 15 minutes.`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId); // Log the message ID
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Preview the URL in case you're using Ethereal for testing

    return res.status(200).json({ success: true, message: "Reset token sent to your email address." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Server Error" });
  }
});

// 
Route.put('/newpassword/:token', async (req, res) => {
  const { token } = req.params; // Extract the token from URL params
  const { newPassword, confirmPassword } = req.body; // Passwords come from request body

  try {
    // Validate input
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ error: true, message: "Both password fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: true, message: "Passwords do not match." });
    }

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password has been reset successfully." });

  } catch (error) {
    console.error(error);

    // Check if token is expired or invalid
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: true, message: "Reset token has expired. Please request a new password reset." });
    }

    return res.status(500).json({ error: true, message: "Server Error." });
  }
});




module.exports = Route;
