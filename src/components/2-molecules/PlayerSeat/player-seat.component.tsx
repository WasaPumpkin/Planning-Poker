// src/components/2-molecules/PlayerSeat/player-seat.component.tsx
import React from 'react';
import Avatar from '../../1-atoms/Avatar/avatar.component';
import './player-seat.component.scss';

interface PlayerSeatProps {
  name: string;
  initials: string;
}

const PlayerSeat: React.FC<PlayerSeatProps> = ({ name, initials }) => {
  return (
    <div className="player-seat">
      <Avatar initials={initials} />
      <p className="player-seat__name">{name}</p>
    </div>
  );
};

export default PlayerSeat;