// src/components/2-molecules/PlayerSeat/player-seat.component.tsx
import React from 'react';
import Avatar from '../../1-atoms/Avatar/avatar.component';
import CardPlaceholder from '../CardPlaceholder/card-placeholder.component';
import './player-seat.component.scss';

interface PlayerSeatProps {
  name: string;
  initials: string;
  isCurrentUser: boolean;
  hasVoted: boolean;
}

const PlayerSeat: React.FC<PlayerSeatProps> = ({
  name,
  initials,
  isCurrentUser,
  hasVoted,
}) => {
  return (
    <div className="player-seat">
      {isCurrentUser ? (
        <Avatar initials={initials} />
      ) : (
        <CardPlaceholder hasVoted={hasVoted} />
      )}
      <p className="player-seat__name">{name}</p>
    </div>
  );
};

export default PlayerSeat;