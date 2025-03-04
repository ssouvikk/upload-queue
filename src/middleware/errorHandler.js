// File: src/middleware/errorHandler.js
// Centralized error handling middleware for API routes

export default function errorHandler(err, req, res, next) {
    // Log the error using the logger
    req.logger.error(err.stack || err);

    // Customize error response based on error type if needed
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
}
