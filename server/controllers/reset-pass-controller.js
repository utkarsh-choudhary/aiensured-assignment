const sendResetSuccess = require("../functions/send-pass-success");
const User = require("../models/user-model");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,  //587
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid EmailID" });
    }
    user.password = newpassword;
    await user.save();
    return res.status(200).json({ message: "Password Reset Successfully" });
    sendResetSuccess(transporter);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = resetPassword;
