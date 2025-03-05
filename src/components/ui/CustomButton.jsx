// File: src/components/ui/CustomButton.js
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

// This component wraps the react-bootstrap Button and shows a loader when loading is true.
const CustomButton = ({ children, variant = "primary", className = "", loading = false, ...props }) => {
  return (
    <Button variant={variant} className={className} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
