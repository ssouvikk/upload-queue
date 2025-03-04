// File: pages/api/upload-logs.js
// API route for uploading log files

import nextConnect from 'next-connect';
import multer from 'multer';
import { uploadLogFile } from '../../controllers/uploadController';

// Set up multer for file parsing (memory storage for simplicity)
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(uploadLogFile);

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, use multer instead
    },
};
