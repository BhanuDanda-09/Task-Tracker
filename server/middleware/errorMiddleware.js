/**
 * Centralized error handling middleware.
 * Catches all errors forwarded via next(error) and returns a JSON response.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(404).json({ success: false, message: "Resource not found" });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
