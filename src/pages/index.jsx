// File: pages/index.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FileUpload from '@/components/FileUpload';
import DashboardTable from '@/components/DashboardTable';
import { withAuth } from '@/utils/withAuth';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LiveStatsProvider } from '@/context/LiveStatsContext';

// This Dashboard page uses react-bootstrap for a modern layout.
const HomePage = () => {
  const [stats, setStats] = useState([]);

  // LiveStatsProvider updates stats via context (if needed, you can use useContext here)
  // For demonstration, you might merge WebSocket data with API fetched stats

  const handleUploadSuccess = (data) => {
    console.log('File uploaded successfully:', data);
    // You can update stats here as required.
  };

  return (
    <ErrorBoundary>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">Dashboard</h1>
          </Col>
        </Row>
        <Row className="mb-4 justify-content-center">
          <Col md={8} lg={6}>
            <Card>
              <Card.Body>
                <FileUpload onUploadSuccess={handleUploadSuccess} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <DashboardTable stats={stats} />
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
};

export default withAuth((props) => (
  <LiveStatsProvider>
    <HomePage {...props} />
  </LiveStatsProvider>
));
