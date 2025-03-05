// File: src/components/ui/CustomButton.js
import React from 'react';
import { Button } from 'react-bootstrap';

// This component wraps the react-bootstrap Button for reusability.
const CustomButton = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <Button variant={variant} className={className} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
