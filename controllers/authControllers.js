const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


      





const signupUser = async (req, res) => {
    try{

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ message: "User allready exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({

            name,
            email,
            password: hashPassword

        });

        res.json({ message: "User registered."});





    }
    catch (error) {

        res.status(500).json({ message: "Server error", error});

    }
};

const loginUser = async(req,res)=>{
    try{
        
         const { email, password } = req.body;

         const user = await User.findOne({ email });

         if(!user){
            return res.status(400).json({ message: "User not found"});
         } 

         const match = await bcrypt.compare(password, user.password);

         if (!match){
            return res.status(400).json({ message: "Invalid credentials" });
         }

         const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn : "300d"}
         );

         res.json({ 
            message: "Login successful", 
            token,
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

         }
    catch (error){

        res.status(500).json({ message: "Server error", error});

    }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message,
    });

    res.json({ message: "Password reset email sent" });

  } catch (error) {
    res.status(500).json({ message: "Email could not be sent" });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};














module.exports = { signupUser, loginUser, forgotPassword, resetPassword };








   