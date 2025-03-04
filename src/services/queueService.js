// File: src/services/queueService.js
// Service for handling BullMQ queue operations

import { Queue } from 'bullmq';
import config from '@/config/config';

const logQueue = new Queue('log-processing-queue', {
    connection: { url: config.redisUrl },
});

export const enqueueLogJob = async (jobData) => {
    return await logQueue.add('processLog', jobData, {
        attempts: 3,
        priority: 1,
    });
};

export const getQueueStatus = async () => {
    // Get counts for different job statuses
    const waiting = await logQueue.getWaitingCount();
    const active = await logQueue.getActiveCount();
    const failed = await logQueue.getFailedCount();
    return { waiting, active, failed };
};
