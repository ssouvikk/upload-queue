// File: components/ErrorBoundary.js
import React from 'react';
import { Alert } from 'react-bootstrap';

// This component catches errors and displays a fallback UI using react-bootstrap Alert.
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error information.
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert variant="danger" className="m-3">
                    <Alert.Heading>Something went wrong.</Alert.Heading>
                    <p>{this.state.error && this.state.error.toString()}</p>
                </Alert>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
