// src/components/2-molecules/VoteResults/vote-results.component.tsx
import React from 'react';
import VotingCard from '../../1-atoms/VotingCard/voting-card.component';
import { type CardValue } from '../../../hooks/useRoomState'; // Import CardValue type
import './vote-results.component.scss';

interface VoteResultsProps {
  voteCounts: Record<string, number>;
  average: string;
}

const VoteResults: React.FC<VoteResultsProps> = ({ voteCounts, average }) => {
  return (
    <div className="vote-results">
      <div className="vote-results__cards">
        {Object.entries(voteCounts).map(([value, count]) => {
  
          const cardValue = (
            !isNaN(parseInt(value, 10)) ? parseInt(value, 10) : value
          ) as CardValue;

          return (
            <div key={value} className="vote-results__card-item">
              {/* --- FIX 2: This now works because 'onClick' is optional in VotingCardProps --- */}
              <VotingCard value={cardValue} isSelected={false} />
              <span className="vote-results__vote-count">
                {count} Voto{count > 1 ? 's' : ''}
              </span>
            </div>
          );
        })}
      </div>
      <div className="vote-results__average">
        <span className="vote-results__average-label">Promedio:</span>
        <span className="vote-results__average-value">{average}</span>
      </div>
    </div>
  );
};

export default VoteResults;