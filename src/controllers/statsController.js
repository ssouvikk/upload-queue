// File: controllers/statsController.js
// Controller for handling statistics fetching

const dbService = require('../services/dbService');
const { successResponse } = require('../utils/responseHelper');

exports.getStats = async (req, res, next) => {
    try {
        const stats = await dbService.fetchAggregatedStats();
        return successResponse(res, stats);
    } catch (error) {
        next(error);
    }
};

exports.getJobStats = async (req, res, next) => {
    try {
        const { jobId } = req.query;
        const jobStats = await dbService.fetchJobStats(jobId);
        return successResponse(res, jobStats);
    } catch (error) {
        next(error);
    }
};
