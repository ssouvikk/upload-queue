// File: components/Sidebar.js
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <div style={{ backgroundColor: '#8ba1e2', minHeight: '100vh' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Link href="/" passHref legacyBehavior>
                        <a className="text-decoration-none text-dark">Home</a>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link href="/dashboard" passHref legacyBehavior>
                        <a className="text-decoration-none text-dark">Dashboard</a>
                    </Link>
                </ListGroup.Item>
                {/* Add other links as needed */}
            </ListGroup>
        </div>
    );
};

export default Sidebar;
