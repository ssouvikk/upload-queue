// File: src/components/ui/CustomInput.js
import React from 'react';
import { Form } from 'react-bootstrap';

// This component wraps the react-bootstrap Form.Control for reusability.
const CustomInput = ({ type = "text", label, placeholder, value, onChange, className = "", ...props }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Form.Group>
  );
};

export default CustomInput;
