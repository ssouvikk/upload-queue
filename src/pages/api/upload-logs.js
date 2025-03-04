// File: src/pages/api/upload-logs.js
// API route for uploading log files with centralized error handling and logging

import nextConnect from 'next-connect';
import multer from 'multer';
import { uploadLogFile } from '@/controllers/uploadController';
import errorHandler from '@/middleware/errorHandler';
import logger from '@/config/logger';

// Set up multer for file parsing using memory storage
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
    onError(error, req, res) {
        // Attach logger instance to req object if needed
        req.logger = logger;
        // Use the centralized error handler
        errorHandler(error, req, res);
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
    // Attach logger instance to req object
    req.logger = logger;
    await uploadLogFile(req, res);
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,  // Disable default body parser to use multer
    },
};
