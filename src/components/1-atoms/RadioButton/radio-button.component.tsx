// src/components/1-atoms/RadioButton/radio-button.component.tsx
import React from 'react';
import './radio-button.component.scss';

type RadioButtonProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const RadioButton: React.FC<RadioButtonProps> = ({ label, id, ...props }) => {
  return (
    <label htmlFor={id} className="radio-button">
      <input type="radio" id={id} {...props} />
      <span className="radio-button__circle"></span>
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;