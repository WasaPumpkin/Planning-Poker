// src/components/1-atoms/Input/input.component.tsx
import React from 'react';
import './input.component.scss';

// Add a prop to control text alignment
type InputProps = {
  align?: 'center' | 'left';
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  align = 'center', // Default to center for existing inputs
  className,
  ...props
}) => {
  // Build the class name dynamically
  const inputClassName = `
    custom-input
    custom-input--align-${align}
    ${className || ''}
  `;

  return <input className={inputClassName.trim()} {...props} />;
};

export default Input;

