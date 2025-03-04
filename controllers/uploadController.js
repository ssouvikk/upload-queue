// File: controllers/uploadController.js

const fileService = require('../services/fileService');
const queueService = require('../services/queueService');

exports.uploadLogFile = async (req, res) => {
    try {
        // Validate and process file upload
        const { file } = req; // Assuming file is available via middleware (like multer)
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Save file to Supabase Storage using fileService
        const fileData = await fileService.saveFile(file);

        // Enqueue job for processing using queueService
        const job = await queueService.enqueueLogJob({
            fileId: fileData.id,
            filePath: fileData.path,
        });

        res.status(200).json({ message: 'File uploaded successfully.', jobId: job.id });
    } catch (error) {
        console.error('Error in uploadLogFile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
