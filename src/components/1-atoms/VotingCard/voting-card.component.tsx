// src/components/1-atoms/VotingCard/voting-card.component.tsx
import React from 'react';
import { type CardValue } from '../../../hooks/useRoomState';
import './voting-card.component.scss';

interface VotingCardProps {
  value: CardValue;
  isSelected: boolean;
  onClick: () => void;
}

// Simple SVG icons as React components
const CoffeeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const InfinityIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 8a4 4 0 0 0-4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 1 4 4 4 4 0 0 1 4-4 4 4 0 0 0 4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4" />
  </svg>
);

const VotingCard: React.FC<VotingCardProps> = ({
  value,
  isSelected,
  onClick,
}) => {
  const cardClassName = `voting-card ${
    isSelected ? 'voting-card--selected' : ''
  }`;

  const renderValue = () => {
    if (value === '☕') return <CoffeeIcon />;
    if (value === '∞') return <InfinityIcon />;
    return value;
  };

  return (
    <button className={cardClassName} onClick={onClick}>
      {renderValue()}
    </button>
  );
};

export default VotingCard;