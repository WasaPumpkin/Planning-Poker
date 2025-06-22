// src/components/1-atoms/Label/label.component.tsx
import React from 'react';
import './label.component.scss';

// The props will accept all standard HTML label attributes
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  // Combine our base class with any additional classes passed via props
  const labelClassName = `custom-label ${className || ''}`;

  return (
    <label className={labelClassName.trim()} {...props}>
      {children}
    </label>
  );
};

export default Label;