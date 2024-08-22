const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer", "").trim();
    // console.log("token from headers :", token);

    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      // console.log("decoded token : ", decodedToken);

      const user = await User.findOne({
        email: decodedToken.email,
      })
        .select({ password: 0 })
        .populate("posts");
      // console.log("user after decoded : ", user);
      // console.log("req : ",req)
      req.user = user;
      // console.log("req : ",req)
      req.token = decodedToken;
    } catch (error) {
      console.log("error in verify token");
      console.log(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
