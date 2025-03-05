// File: components/Layout.js
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Container fluid className="flex-grow-1">
                <Row>
                    {/* Sidebar column; visible on md and larger screens */}
                    <Col md={3} className="d-none d-md-block p-0">
                        <Sidebar />
                    </Col>
                    {/* Main content */}
                    <Col md={9} className="p-3" style={{ backgroundColor: '#b2cdee', minHeight: '100vh' }}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Layout;
