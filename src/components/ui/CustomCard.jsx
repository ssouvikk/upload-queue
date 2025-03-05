// File: src/components/ui/CustomCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

// This component wraps the react-bootstrap Card for reusability.
const CustomCard = ({ title, children, className = "", ...props }) => {
    return (
        <Card className={`shadow ${className}`} {...props}>
            <Card.Body>
                {title && <Card.Title className="mb-4 text-center">{title}</Card.Title>}
                {children}
            </Card.Body>
        </Card>
    );
};

export default CustomCard;
