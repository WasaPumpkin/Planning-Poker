// src/components/3-organisms/GameBoard/game-board.component.tsx
import React, { useState } from 'react';
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
import PlayerSeat from '../../2-molecules/PlayerSeat/player-seat.component';
import Avatar from '../../1-atoms/Avatar/avatar.component';
import Button from '../../1-atoms/Button/button.component';
import Modal from '../Modal/modal.component'; 
import InvitePlayers from '../../2-molecules/InvitePlayers/invite-players.component';
import './game-board.component.scss';

interface Player {
  name: string;
  role: PlayerRole;
}

interface GameBoardProps {
  player: Player | null;
  gameName: string;
}

// A small utility to get initials from a name
const getInitials = (name: string): string => {
  // Handle empty or invalid input gracefully
  if (!name || typeof name !== 'string') {
    return '';
  }

  // First, clean up the name and split it into parts
  const names = name.trim().toUpperCase().split(' ');

  if (names.length === 1) {
    // If it's a single word (like "ANTONIO"), take the first two letters.
    return names[0].slice(0, 2);
  } else {
    // If it's multiple words (like "Luisa Perez"), take the first letter of the first two words.
    return names[0][0] + names[1][0];
  }
};

const GameBoard: React.FC<GameBoardProps> = ({ player, gameName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!player) {
    return <div className="game-board">Cargando...</div>;
  }

  const playerInitials = getInitials(player.name);

  const boardClassName = `game-board ${isModalOpen ? 'blurred' : ''}`;
  

  return (
    <>
      <div className={boardClassName}>
        <header className="game-board__header">
          <PragmaLogo showText={false} iconSize={48} />
          <h1 className="game-board__title">{gameName}</h1>
          <div className="game-board__header-right">
            <Avatar initials={playerInitials} />
            <Button onClick={() => setIsModalOpen(true)}>
              Invitar jugadores
            </Button>
          </div>
        </header>

        {/* This main section will now grow to fill the available space */}
        <main className="game-board__main-content">
          <div className="game-board__poker-table" />
          <div className="game-board__player-seat-wrapper">
            <PlayerSeat name={player.name} initials={playerInitials} />
          </div>
        </main>
      </div>
      <Modal
        title="Invitar jugadores"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <InvitePlayers />
      </Modal>
    </>
  );
};

export default GameBoard;