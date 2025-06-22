// src/components/2-molecules/CardDeck/card-deck.component.tsx
import React from 'react';
import VotingCard from '../../1-atoms/VotingCard/voting-card.component';
import { type CardValue } from '../../../hooks/useRoomState';
import './card-deck.component.scss';

interface CardDeckProps {
  onCardSelect: (value: CardValue) => void;
  selectedValue?: CardValue;
}

const DECK_VALUES: CardValue[] = [0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];

const CardDeck: React.FC<CardDeckProps> = ({ onCardSelect, selectedValue }) => {
  return (
    <div className="card-deck">
      <h2 className="card-deck__title">
        Elige una carta <span className="icon">👇</span>
      </h2>
      <div className="card-deck__grid">
        {DECK_VALUES.map((value) => (
          <VotingCard
            key={value}
            value={value}
            isSelected={selectedValue === value}
            onClick={() => onCardSelect(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDeck;