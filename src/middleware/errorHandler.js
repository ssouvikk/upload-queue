// File: src/middleware/errorHandler.js
// Centralized error handling middleware for API routes

const { errorResponse } = require('../utils/responseHelper');

module.exports = function errorHandler(err, req, res, next) {
    // Log the error using your logger (assuming req.logger is set, or use a global logger)
    if (req.logger) {
        req.logger.error(err.stack || err);
    }
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};
