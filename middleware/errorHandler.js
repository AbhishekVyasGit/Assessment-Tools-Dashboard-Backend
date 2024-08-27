const { ApiError } = require("../utils/ApiError.js");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }

  // For other types of errors, default to 500 Internal Server Error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
    stack: err.stack,
  });
};

module.exports = { errorHandler };
