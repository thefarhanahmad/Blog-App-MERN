// function to handle error in express
const errorHandlingMiddleware = (err, req, res, next) => {
    console.log("error in middleware :", err);
  
    return res.status(401).json({
      error: "Internal server error",
      message: "something went wrong, try again",
    });
  };
  
  module.exports = errorHandlingMiddleware;