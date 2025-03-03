// pages/api/upload-logs.js

import { IncomingForm } from 'formidable';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// Create a BullMQ queue instance with Redis connection configuration
const logQueue = new Queue('log-processing-queue', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
});

// Disable Next.js built-in bodyParser to handle multipart/form-data
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Only POST requests are allowed
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Create a new IncomingForm instance from formidable to parse the file upload
    const form = new IncomingForm({
        uploadDir: path.join(process.cwd(), 'uploads'),
        keepExtensions: true,
    });

    // Parse the request containing the form data
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing the form:', err);
            return res.status(500).json({ error: 'Error parsing the form data' });
        }

        try {
            // Assume the uploaded file field is named "file"
            const uploadedFile = files.file;
            if (!uploadedFile) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Generate a unique fileId using uuid
            const fileId = uuidv4();
            // Construct a new file path using fileId and original file extension
            const newFilePath = path.join(
                path.dirname(uploadedFile.filepath),
                fileId + path.extname(uploadedFile.originalFilename)
            );
            // Rename the file to the new unique file name
            fs.renameSync(uploadedFile.filepath, newFilePath);

            // Enqueue a new job into BullMQ with metadata including fileId and filePath
            await logQueue.add(
                'process-log',
                { fileId, filePath: newFilePath },
                {
                    attempts: 3, // Retry limit of 3 attempts on failure
                    // Prioritize smaller files (priority 1) vs larger files (priority 2)
                    priority: uploadedFile.size < 1000000 ? 1 : 2,
                }
            );

            // Respond with success message and fileId
            return res.status(200).json({
                message: 'File uploaded and job enqueued',
                fileId,
            });
        } catch (error) {
            console.error('Error processing file upload:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
