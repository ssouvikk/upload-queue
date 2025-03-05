// File: components/Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { ListGroup, Button, Card } from 'react-bootstrap';

const Sidebar = () => {
    
    return (
        <div style={{ backgroundColor: '#8ba1e2', minHeight: '100vh' }} className="p-3">

            <Card className="rounded shadow">
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mb-2 rounded">
                            <Link href="/" passHref legacyBehavior>
                                <a className="text-decoration-none text-dark">Home</a>
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="mb-2 rounded">
                            <Link href="/dashboard" passHref legacyBehavior>
                                <a className="text-decoration-none text-dark">Dashboard</a>
                            </Link>
                        </ListGroup.Item>
                        {/* Add other links as needed */}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Sidebar;
