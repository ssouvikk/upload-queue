// File: src/controllers/uploadController.js
// Controller for handling file uploads

import { saveFile } from '../services/fileService.js';
import * as queueService from '../services/queueService.js';
import { successResponse } from '../utils/responseHelper.js';
import AppError from '../utils/AppError.js';

export const uploadLogFile = async (req, res, next) => {
    try {
        const { file } = req; // Assuming file is available via multer middleware
        if (!file) {
            throw new AppError('No file uploaded.', 400);
        }

        // Optionally, add file format and size validation here

        // Save file to Supabase Storage using fileService
        const fileData = await saveFile(file);

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
