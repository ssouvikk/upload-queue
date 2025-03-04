// File: src/pages/api/upload-logs.js
// API route for uploading log files

import nextConnect from 'next-connect';
import multer from 'multer';
import { uploadLogFile } from '@/controllers/uploadController';

// Set up multer for file parsing using memory storage
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error('API Error:', error);
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
    // Call controller function to handle file upload, validation, storage and enqueue job
    await uploadLogFile(req, res);
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disable default body parser to use multer
    },
};
