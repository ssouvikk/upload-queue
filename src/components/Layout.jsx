// File: components/Layout.js
import Navbar from './Navbar'; // Updated Navbar component using react-bootstrap.
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <div className="min-vh-100 d-flex flex-column bg-white">
            <Navbar />
            <Container fluid>
                <Row className="flex-grow-1">
                    <Col md={3} className="d-none d-md-block p-0">
                        <Sidebar />
                    </Col>
                    <Col md={9} className="p-3" style={{ backgroundColor: '#b2cdee', minHeight: '100vh' }}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Layout;
