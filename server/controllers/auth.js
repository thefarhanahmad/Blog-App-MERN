const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup controller
const registerUser = async (req, res, next) => {
  try {
    // fetch user and validate
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alreadyUserExists = await User.findOne({ email });
    if (alreadyUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user in db
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // send response
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      // user: user,
    });
  } catch (error) {
    next(error);
  }
};

// login controller
const loginUser = async (req, res, next) => {
  try {
    // fetch data and validate
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User",
      });
    }

    // compare password
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credencials",
      });
    }

    // create payload and create token and store
    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "48h",
    });

    // send response
    return res.status(201).json({
      success: true,
      message: "User logged in successfully!",
      token: token,
      // user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
