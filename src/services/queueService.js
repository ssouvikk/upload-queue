// File: src/services/queueService.js
// Service for handling BullMQ queue operations

import { Queue } from 'bullmq';
import config from '@/config/config';

const logQueue = new Queue('log-processing-queue', {
    connection: { url: config.redisUrl },
});

export const enqueueLogJob = async (jobData) => {
    // Enqueue a new job with jobData, set retry attempts and priority as needed
    return await logQueue.add('processLog', jobData, {
        attempts: 3,
        priority: 1,
    });
};

export const getQueueStatus = async () => {
    // Retrieve counts for different job statuses: waiting, active, failed
    const waiting = await logQueue.getWaitingCount();
    const active = await logQueue.getActiveCount();
    const failed = await logQueue.getFailedCount();
    return { waiting, active, failed };
};
