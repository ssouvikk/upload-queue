// File: services/queueService.js
// Service for handling BullMQ queue operations

const { Queue } = require('bullmq');
const config = require('../config/config');

const logQueue = new Queue('log-processing-queue', {
    connection: { url: config.redisUrl },
});

exports.enqueueLogJob = async (jobData) => {
    // Enqueue a new job with jobData
    // Configure priority and retry settings as needed
    return await logQueue.add('processLog', jobData, {
        attempts: 3,
        priority: 1,
    });
};
