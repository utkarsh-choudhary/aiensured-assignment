const User = require("../models/user-model");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");
require('dotenv').config();

/**
 * The function `register` is an asynchronous function that handles user registration by checking if
 * the email already exists, creating a new user if it doesn't, and returning a success message along
 * with a generated token and user ID.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `req.body` which contains the data sent
 * in the request body, `req.params` which contains route parameters, `req.query` which contains query
 * parameters, and many
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with the following properties:
 * - If the email already exists, it returns a 400 status code and a message "Email already exist".
 * - If the user is successfully created, it returns a 201 status code and a JSON object with the
 * following properties:
 *   - "msg": "Registration Successfull"
 *   - "token": the generated token for the user
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  //smtp.gmail.com
  port: 465,  //465
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, phone, password } = req.body;

    // Check whether the email already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create a new user
    const userCreated = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password,
    });

    // Configure the email options
    const mailOptions = {
      from: "utkarshchoudhary734@gmail.com",
      to: email,
      subject: "Welcome to aiensured Notes!",
      text: `Hi ${userCreated.firstname} ${userCreated.lastname},
    
    Thank you for signing up for aiensured Notes! We're thrilled to have you as part of our community dedicated to improving productivity and organizing ideas effectively.
    
    aiensured Notes is your ultimate solution for keeping track of your thoughts, tasks, and important information. Whether you're managing personal projects, academic notes, or professional tasks, our tool is designed to make note-taking easy and efficient.
    
    Get Started with aiensured Notes:
    
    Here's how you can make the most of your aiensured Notes experience:
    
    1. Create Your First Note:
       Start capturing your ideas, tasks, or reminders. Use features like rich text formatting and tags to make your notes clear and personalized.
    
    2. Organize Your Notes:
       Stay organized with folders, categories, and color coding. Our intuitive design ensures you can quickly find what you're looking for.
    
    3. Boost Your Productivity:
       Utilize aiensured Notes to streamline your workflow, stay on top of tasks, and achieve your goals with ease.
    
    Need Help?
    
    Our team is here for you! If you have any questions or need support, feel free to reach out to us at utkarshchoudhary734@gmail.com.
    
    We hope you enjoy using aiensured Notes and can't wait to see how it helps you stay organized and productive!
    
    Best regards,  
    The aiensured Notes Team`,
    };
    

    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
      }

      // Return success response after email is sent
      return res.status(201).json({
        msg: "Registration Successful. Email sent to your email.",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/**
 * The above function is a user login logic that checks if the provided email and password match a user
 * in the database, and returns a token and user ID if the login is successful.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns The login function returns a response object with a status code and a JSON object
 * containing a message or a success message, token, and userId.
 */
// user login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // const user = await bcrypt.compare(password,userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
    // console.error(error);
  }
};

const otpVerify = async (req, res) => { 
  //   console.log(req.body);
  const { otp, email } = req.body;
  try {
    // Query the database for the user with the provided email
    const user = await User.findOne({ email });

    // Check if user exists and if OTP matches
    if (user && user.resetPassCode === otp) {
      // OTP is valid, proceed with password reset
      res.status(200).json({ success: true, message: "OTP Verified Successfully" });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  
}

// fetching all data of user using userid get from authenticating token
const getAllUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({message:'User not found'});

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({message:'Internal Server Error'});
  }
};

const updateUserData = async (req, res) => {
  const updatedFields = req.body;

  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that were edited
    Object.keys(updatedFields).forEach(key => {
      if (updatedFields[key] !== undefined) {
        user[key] = updatedFields[key];
      }
    });

    const updatedUser = await user.save();
    res.json({ message: "User has been successfully updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { register, login ,getAllUserData,updateUserData,otpVerify};
