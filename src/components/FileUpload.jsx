// File: components/FileUpload.js

import { useState } from 'react';
import { toast } from 'react-toastify';

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload-logs', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('File uploaded successfully.');
                onUploadSuccess && onUploadSuccess(data);
            } else {
                toast.error(data.message || 'Upload failed.');
            }
        } catch (error) {
            toast.error('An error occurred during upload.');
        }
        setUploading(false);
    };

    return (
        <div className="mb-6">
            <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded mb-2"
            />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {uploading ? 'Uploading...' : 'Upload Log File'}
            </button>
        </div>
    );
};

export default FileUpload;
