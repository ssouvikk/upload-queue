// File: controllers/statsController.js
// Controller for handling statistics fetching

const dbService = require('../services/dbService');

exports.getStats = async (req, res) => {
    try {
        const stats = await dbService.fetchAggregatedStats();
        res.status(200).json({ stats });
    } catch (error) {
        console.error('Error in getStats:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.getJobStats = async (req, res) => {
    try {
        const { jobId } = req.query; // or req.params if using dynamic routing
        const jobStats = await dbService.fetchJobStats(jobId);
        res.status(200).json({ jobStats });
    } catch (error) {
        console.error('Error in getJobStats:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
