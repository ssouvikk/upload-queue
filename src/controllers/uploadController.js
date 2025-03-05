// File: controllers/uploadController.js
// Controller for handling file uploads

const fileService = require('../services/fileService');
const queueService = require('../services/queueService');
const { successResponse } = require('../utils/responseHelper');
const AppError = require('../utils/AppError');

exports.uploadLogFile = async (req, res, next) => {
    try {
        const { file } = req; // Assuming file is available via middleware (like multer)
        if (!file) {
            throw new AppError('No file uploaded.', 400);
        }

        // Save file to Supabase Storage using fileService
        const fileData = await fileService.saveFile(file);

        // Enqueue job for processing using queueService
        const job = await queueService.enqueueLogJob({
            fileId: fileData.id,
            filePath: fileData.path,
        });

        return successResponse(res, { jobId: job.id }, 'File uploaded successfully.');
    } catch (error) {
        next(error);
    }
};
