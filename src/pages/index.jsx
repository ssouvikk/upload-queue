// File: pages/index.js
// Dashboard page with real-time updates via WebSocket, state management, and error boundary

import React, { useState, useEffect, useContext } from 'react';
import FileUpload from '@/components/FileUpload';
import DashboardTable from '@/components/DashboardTable';
import { withAuth } from '@/utils/withAuth';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LiveStatsProvider } from '@/context/LiveStatsContext';

const HomePage = () => {
  const [stats, setStats] = useState([]);

  // LiveStatsProvider updates stats via context (if needed, you can use useContext here)
  // For demonstration, you might merge WebSocket data with API fetched stats

  const handleUploadSuccess = (data) => {
    console.log('File uploaded successfully:', data);
  };

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

export default withAuth((props) => (
  <LiveStatsProvider>
    <HomePage {...props} />
  </LiveStatsProvider>
));
