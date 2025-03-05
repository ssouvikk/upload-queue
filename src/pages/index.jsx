// File: pages/index.js
import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import DashboardTable from '@/components/DashboardTable';
import { withAuth } from '@/utils/withAuth';
import ErrorBoundary from '@/components/ErrorBoundary';

const HomePage = () => {
  const [stats, setStats] = useState([]);
  const [socketData, setSocketData] = useState(null);

  // WebSocket integration for live updates
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/live-stats');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setSocketData(data);
      } catch (e) {
        console.error('Error parsing WebSocket data:', e);
      }
    };
    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
    return () => {
      socket.close();
    };
  }, []);

  // Function to handle successful file upload
  const handleUploadSuccess = (data) => {
    // Optionally, you can update stats or trigger a refetch here
    console.log('Upload success:', data);
  };

  // For demonstration, merge WebSocket data with current stats
  // In a real app, you might want to merge or refetch data from an API
  useEffect(() => {
    if (socketData) {
      setStats((prevStats) => [socketData, ...prevStats]);
    }
  }, [socketData]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <DashboardTable stats={stats} />
      </div>
    </ErrorBoundary>
  );
};

export default withAuth(HomePage);
