// File: components/Loader.tsx
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoaderProps {
    message?: string;
    spinnerSize?: number;
    spinnerVariant?: string;
    backgroundColor?: string;
}

// This Loader component uses react-bootstrap Spinner to show a full-page loading state.
const Loader: React.FC<LoaderProps> = ({
    message = "Loading...",
    spinnerSize = 64,
    spinnerVariant = "primary",
    backgroundColor = "#f8f9fa"
}) => {
    return (
        <div
            style={{ backgroundColor, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}
            className="d-flex align-items-center justify-content-center"
        >
            <Container className="text-center">
                <Spinner
                    animation="border"
                    variant={spinnerVariant}
                    style={{ width: spinnerSize, height: spinnerSize }}
                    className="mb-3"
                />
                <div className="fs-4 fw-bold">{message}</div>
            </Container>
        </div>
    );
};

export default Loader;
