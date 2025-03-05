// File: src/controllers/statsController.js
// Controller for handling statistics fetching

import * as dbService from '../services/dbService.js';
import { successResponse } from '../utils/responseHelper.js';

export const getStats = async (req, res, next) => {
    try {
        const stats = await dbService.fetchAggregatedStats();
        return successResponse(res, stats);
    } catch (error) {
        next(error);
    }
};

export const getJobStats = async (req, res, next) => {
    try {
        const { jobId } = req.query;
        const jobStats = await dbService.fetchJobStats(jobId);
        return successResponse(res, jobStats);
    } catch (error) {
        next(error);
    }
};
