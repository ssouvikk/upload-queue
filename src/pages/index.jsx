// File: pages/index.js
import { withAuth } from '@/utils/withAuth'

import { useState, useEffect } from 'react';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [stats, setStats] = useState([]);

  // Example: Fetch stats on component mount
  useEffect(() => {
    fetch('/api/stats')
      .then(async (res) => {
        if (res.ok) {
          const { data } = await res.json()
          setStats(data)
        }
      })
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  // Example: WebSocket connection for live updates
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/live-stats');
    socket.onmessage = (event) => {
      // Update UI based on live stats
      console.log('Live update:', event.data);
    };
    return () => socket.close();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload-logs', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setUploadMessage(data.message);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Log File</button>
      <p>{uploadMessage}</p>
      <div>
        <h2>Stats</h2>
        {/* Render stats in a table or list */}
        {stats.map((stat, index) => (
          <div key={index}>{JSON.stringify(stat)}</div>
        ))}
      </div>
    </div>
  );
}
export default withAuth(HomePage);