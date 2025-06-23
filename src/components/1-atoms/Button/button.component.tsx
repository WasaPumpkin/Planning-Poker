//src/components/1-atoms/Button/button.component.tsx
// import React from 'react';
// import './button.component.scss';

// // ADDED: A new 'tertiary' variant for icon-only/transparent buttons
// type ButtonProps = {
//   variant?: 'primary' | 'secondary' | 'tertiary';
// } & React.ButtonHTMLAttributes<HTMLButtonElement>;

// const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = 'primary',
//   className,
//   ...props
// }) => {
//   const buttonClassName = `
//     custom-button
//     custom-button--${variant}
//     ${className || ''}
//   `;

//   return (
//     <button className={buttonClassName.trim()} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;

import React from 'react';
import './button.component.scss';

// UPDATED: Added a new 'cta' variant for the solid purple button.
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cta';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const buttonClassName = `
    custom-button
    custom-button--${variant}
    ${className || ''}
  `;

  return (
    <button className={buttonClassName.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;