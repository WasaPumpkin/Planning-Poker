//src/components/2-molecules/PragmaLogo/index.tsx
import React from 'react';

// Add props to control which parts of the logo are visible
interface PragmaLogoProps {
  showIcon?: boolean;
  showText?: boolean;
  iconSize?: number; // Add a prop to control size
}

const PragmaLogo: React.FC<PragmaLogoProps> = ({
  showIcon = true,
  showText = true,
  iconSize = 108, // Default size of the icon part
}) => (
  <svg
    width={showText ? 158 : iconSize}
    height={showText ? 184 : iconSize}
    viewBox={showText ? '0 0 158 184' : '0 0 158 110'} // Adjust viewBox for icon-only
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Pragma Logo"
  >
    {/* ----- Conditionally render the icon ----- */}
    {showIcon && (
      <g id="icon-group">
        <circle cx="79" cy="55" r="53.5" stroke="white" strokeWidth="3" />
        <circle cx="79" cy="55" r="37.5" stroke="white" strokeWidth="3" />
        <g transform="translate(79, 55)">
          {/* ... lines remain the same ... */}
          <line y1="-37.5" y2="-53.5" stroke="white" strokeWidth="3" />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(45)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(90)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(135)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(180)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(225)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(270)"
          />
          <line
            y1="-37.5"
            y2="-53.5"
            stroke="white"
            strokeWidth="3"
            transform="rotate(315)"
          />
        </g>
        <path
          d="M82.1667 46.1667C82.1667 48.4578 80.7911 50.3333 79 50.3333C77.2089 50.3333 75.8333 48.4578 75.8333 46.1667C75.8333 43.8756 77.2089 42 79 42C80.7911 42 82.1667 43.8756 82.1667 46.1667Z"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          d="M85.5 64.5C85.5 67.8137 82.5939 70.5 79 70.5C75.4061 70.5 72.5 67.8137 72.5 64.5C72.5 61.1863 75.4061 58.5 79 58.5C82.5939 58.5 85.5 61.1863 85.5 64.5Z"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          d="M73 48C70.6667 52.6667 70.6 61.2 73.5 64.5"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
        />
      </g>
    )}

    {/* ----- Conditionally render the text image ----- */}
    {showText && (
      <image
        href="https://www.pragma.co/hs-fs/hubfs/logo-pragma_blanco%201.png?width=153&height=46&name=logo-pragma_blanco%201.png"
        x="2.5"
        y="125"
        width="153"
        height="46"
      />
    )}
  </svg>
);

export default PragmaLogo;