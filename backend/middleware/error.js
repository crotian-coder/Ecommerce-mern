const ErrorHandler = require("../utils/errorhandler");

console.log("error middleware");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.messege = err.messege || "Internal server Error";

  //Wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. invalid ${err.path} `;
    err = new ErrorHandler(messege, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    messege: err.messege,
  });
};
