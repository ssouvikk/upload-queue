// File: src/workers/logWorker.js
// Worker for processing log files using BullMQ with additional logic:
// - Counting error logs
// - Matching keywords in log messages
// - Extracting IP addresses from log messages
// Centralized error handling and logging are implemented using config and logger

const { Worker } = require('bullmq'); // Using require instead of import
const fs = require('fs');
const readline = require('readline');
const config = require('../config/config');
const { saveLogStats } = require('../services/dbService');
const logger = require('../config/logger');

// Retrieve keywords from environment variables (comma-separated list)
const keywords = process.env.LOG_KEYWORDS
    ? process.env.LOG_KEYWORDS.split(',').map(keyword => keyword.trim())
    : [];

// Regular expression to parse a log line
// Expected format: [TIMESTAMP] LEVEL MESSAGE {optional JSON payload}
const logLineRegex = /^\[(.+?)\]\s+(\w+)\s+(.*?)(\s+\{.*\})?$/;

const worker = new Worker(
    'log-processing-queue',
    async job => {
        const { fileId, filePath } = job.data;
        logger.info(`Processing file: ${filePath}`);

        // Initialize counters and storage for additional log information
        let errorCount = 0;
        let keywordMatches = {};
        let ipAddresses = new Set();

        // Initialize keyword match counts to zero
        keywords.forEach(keyword => {
            keywordMatches[keyword] = 0;
        });

        // Create a readable stream for the log file with UTF-8 encoding
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity, // Recognize all instances of CR LF as a single newline
        });

        // Process the file line by line
        for await (const line of rl) {
            try {
                // Skip empty lines
                if (!line.trim()) continue;

                // Use regex to parse the log line
                const match = line.match(logLineRegex);
                if (!match) {
                    logger.warn(`Invalid log format: ${line}`);
                    continue;
                }

                // Destructure the parsed components
                const [, timestamp, level, message, jsonPayload] = match;

                // Increment error counter if log level is "ERROR"
                if (level.toUpperCase() === 'ERROR') {
                    errorCount++;
                }

                // Check and count keyword occurrences in the message
                keywords.forEach(keyword => {
                    if (message.includes(keyword)) {
                        keywordMatches[keyword]++;
                    }
                });

                // Extract IPv4 address from the message, if present
                const ipRegex = /(\d{1,3}\.){3}\d{1,3}/;
                const ipMatch = message.match(ipRegex);
                if (ipMatch) {
                    ipAddresses.add(ipMatch[0]);
                }
            } catch (lineError) {
                // Log error for the specific line but continue processing subsequent lines
                logger.error(`Error processing line: ${lineError.message}`);
            }
        }

        // Convert the Set of IP addresses into an array for storage
        const ipList = Array.from(ipAddresses);

        // Prepare the aggregated results object
        const logStats = {
            file_id: fileId,
            processed_at: new Date().toISOString(),
            error_count: errorCount,
            keyword_matches: JSON.stringify(keywordMatches),
            ip_addresses: JSON.stringify(ipList),
        };

        // Insert the aggregated log statistics into the Supabase log_stats table via dbService
        const { error } = await saveLogStats(logStats);
        if (error) {
            logger.error(`Error inserting log stats into Supabase: ${error.message}`);
            // Throw error to let BullMQ handle retries based on configuration
            throw error;
        }

        logger.info(`Finished processing file ${fileId}. Results: ${JSON.stringify(logStats)}`);
        return { success: true, processedCount: errorCount };
    },
    {
        connection: { url: config.redisUrl },
        concurrency: 4, // Process up to 4 jobs concurrently
    }
);

// Global event listeners for the worker
worker.on('completed', job => {
    logger.info(`Job ${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed: ${err.message}`);
});

console.log('Log worker started.');

module.exports = worker;
