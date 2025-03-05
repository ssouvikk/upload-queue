// File: src/services/fileService.js
// Service for handling file-related operations using Supabase Storage

import { createClient } from '@supabase/supabase-js';
import config from '../config/config.js';

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const saveFile = async (file) => {
    // file: object containing file details (e.g., file.originalname, file.buffer, file.mimetype)
    // Upload file to Supabase Storage bucket "log-files"
    const { data, error } = await supabase.storage
        .from('log-files')
        .upload(file.originalname, file.buffer, {
            contentType: file.mimetype,
        });
    if (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
    // Return file metadata (using data.Key as file identifier/path)
    return { id: data.Key, path: data.Key };
};
