// File: src/workers/logWorker.js
// Worker for processing log files using BullMQ with centralized error handling and logging

import { Worker } from 'bullmq';
import fs from 'fs';
import readline from 'readline';
import config from '@/config/config';
import { saveLogStats } from '@/services/dbService';
import logger from '@/config/logger';

const worker = new Worker(
    'log-processing-queue',
    async job => {
        const { fileId, filePath } = job.data;
        try {
            // Create a read stream for the file located at filePath
            const fileStream = fs.createReadStream(filePath);
            // Use readline to process the file line by line
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            // Placeholder for processed results
            const processedData = [];

            // Process each line and parse log entries
            for await (const line of rl) {
                // Example log format: "[2025-02-20T10:00:00Z] ERROR Database timeout {\"userId\": 123, \"ip\": \"192.168.1.1\"}"
                // Regular expression to parse the log entry
                const regex = /^\[(.*?)\]\s+(\w+)\s+(.*?)(\s+\{.*\})?$/;
                const match = line.match(regex);
                if (match) {
                    const [, timestamp, level, message, jsonPayload] = match;
                    let additionalData = {};
                    if (jsonPayload) {
                        try {
                            additionalData = JSON.parse(jsonPayload.trim());
                        } catch (e) {
                            // If JSON parsing fails, log error and continue processing next line
                            logger.error('Error parsing JSON payload: ' + e.message);
                        }
                    }
                    processedData.push({
                        fileId,
                        timestamp,
                        level,
                        message,
                        ...additionalData,
                    });
                }
            }

            // Save the processed log stats to Supabase via dbService
            await saveLogStats(processedData);
            // Return result on successful processing
            return { success: true, processedCount: processedData.length };
        } catch (error) {
            logger.error(`Error processing file ${filePath}: ${error.message}`);
            // Throw error to let BullMQ handle retry based on configuration
            throw error;
        }
    },
    {
        connection: { url: config.redisUrl },
        concurrency: 4, // Process up to 4 jobs concurrently
    }
);

// Listen to worker events for logging and debugging
worker.on('completed', job => {
    logger.info(`Job ${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed: ${err.message}`);
});

export default worker;
