// File: src/utils/responseHelper.js
// Utility functions for unified API responses

export const successResponse = (res, data, message = '') => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        data: null,
        error: error.message || 'Internal Server Error',
    });
};
