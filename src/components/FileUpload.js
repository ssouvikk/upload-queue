// components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    // Handle file selection from input
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload file to /api/upload-logs endpoint
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setUploadMessage('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload-logs', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                setUploadMessage('File uploaded successfully!');
                onUploadSuccess(data);
            } else {
                setUploadMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadMessage('An error occurred during upload.');
        }
        setUploading(false);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <h3>Upload Log File</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading || !file}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadMessage && <p>{uploadMessage}</p>}
        </div>
    );
};

export default FileUpload;
