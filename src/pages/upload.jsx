// File: pages/upload.js
import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Function to handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Function to handle file upload
    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        // API call to /api/upload-logs
        const res = await fetch('/api/upload-logs', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            setUploadStatus('Upload successful. Job ID: ' + data.jobId);
        } else {
            setUploadStatus('Upload failed: ' + data.error);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
}
