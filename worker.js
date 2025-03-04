// worker.js

import { Worker } from 'bullmq';
import fs from 'fs';
import readline from 'readline';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Supabase client using service key for secure server-side operations
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Retrieve keywords from environment variables (comma-separated list)
const keywords = process.env.LOG_KEYWORDS
    ? process.env.LOG_KEYWORDS.split(',').map((keyword) => keyword.trim())
    : [];

// Regular expression to parse a log line
// Expected format: [TIMESTAMP] LEVEL MESSAGE {optional JSON payload}
const logLineRegex = /^\[(.+?)\]\s+(\w+)\s+(.*?)(\s+\{.*\})?$/;

// Create a BullMQ worker that processes jobs with concurrency of 4
const worker = new Worker(
    'log-processing-queue',
    async (job) => {
        const { fileId, filePath } = job.data;
        console.log(`Processing file: ${filePath}`);

        // Initialize counters for error logs, keyword matches, and IP addresses
        let errorCount = 0;
        let keywordMatches = {};
        let ipAddresses = new Set();

        // Initialize keyword match counts to zero
        keywords.forEach((keyword) => {
            keywordMatches[keyword] = 0;
        });

        // Create a readable stream for the log file
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
                    console.warn(`Invalid log format: ${line}`);
                    continue;
                }

                // Destructure the parsed components
                const [, timestamp, level, message, jsonPayload] = match;

                // Increment error counter if log level is "ERROR"
                if (level.toUpperCase() === 'ERROR') {
                    errorCount++;
                }

                // Check and count keyword occurrences in the message
                keywords.forEach((keyword) => {
                    if (message.includes(keyword)) {
                        keywordMatches[keyword]++;
                    }
                });

                // Use a simple regex to extract an IPv4 address from the message, if present
                const ipRegex = /(\d{1,3}\.){3}\d{1,3}/;
                const ipMatch = message.match(ipRegex);
                if (ipMatch) {
                    ipAddresses.add(ipMatch[0]);
                }
            } catch (lineError) {
                // Log error for the specific line but continue processing subsequent lines
                console.error(`Error processing line: ${lineError}`);
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

        // Insert the aggregated log statistics into the Supabase log_stats table
        const { error } = await supabase.from('log_stats').insert([logStats]);

        if (error) {
            console.error('Error inserting log stats into Supabase:', error);
            // Throw error to allow BullMQ to handle retries based on configured attempts
            throw error;
        }

        console.log(`Finished processing file ${fileId}. Results:`, logStats);
    },
    {
        concurrency: 4, // Process 4 jobs concurrently
        connection: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
        },
    }
);

// Global error handling for the worker
worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully.`);
});
