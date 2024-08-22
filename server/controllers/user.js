// get user details
const user = async (req, res, next) => {
  try {
    const user = req.user;

    console.log("user from req user : ", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User fetched failed",
      });
    }

    // console.log("LoggedIn user verified successfully");

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { user };
