// File: src/utils/AppError.js
// Custom error class for centralized error management

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
