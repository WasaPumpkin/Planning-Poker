// src/components/3-organisms/GameBoard/game-board.component.tsx
import React, { useState } from 'react';
// We only need the types from PlayerRole, not the component itself
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
import PlayerSeat from '../../2-molecules/PlayerSeat/player-seat.component';
import Avatar from '../../1-atoms/Avatar/avatar.component';
import Button from '../../1-atoms/Button/button.component';
import Modal from '../Modal/modal.component';
import InvitePlayers from '../../2-molecules/InvitePlayers/invite-players.component';
import {
  useRoomState,
  type CardValue,
  type RoomState,
} from '../../../hooks/useRoomState';
import CardDeck from '../../2-molecules/CardDeck/card-deck.component';
import './game-board.component.scss';

interface Player {
  name: string;
  role: PlayerRole;
  vote?: CardValue; // Make sure Player interface is consistent with RoomState
}

interface GameBoardProps {
  player: Player | null;
  gameName: string;
}

const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  const names = name.trim().toUpperCase().split(' ');
  if (names.length === 1) return names[0].slice(0, 2);
  return names[0][0] + names[1][0];
};

const GameBoard: React.FC<GameBoardProps> = ({ player, gameName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomState, setRoomState] = useRoomState(gameName);

  const handleCardSelect = (value: CardValue) => {
    if (!roomState || !player) return;

    const updatedPlayers = roomState.players.map((p) =>
      p.name === player.name ? { ...p, vote: value } : p
    );

    const updatedRoom: RoomState = { ...roomState, players: updatedPlayers };
    setRoomState(updatedRoom);
  };

  if (!roomState || !player) {
    return <div className="game-board">Cargando sala...</div>;
  }

  const currentUser = player;
  const currentUserInRoom = roomState.players.find(
    (p) => p.name === currentUser.name
  );
  const currentUserVote = currentUserInRoom?.vote;

  const boardClassName = `game-board ${isModalOpen ? 'blurred' : ''}`;

  return (
    <>
      <div className={boardClassName}>
        <header className="game-board__header">
          <PragmaLogo showText={false} iconSize={48} />
          <h1 className="game-board__title">{roomState.gameName}</h1>
          <div className="game-board__header-right">
            <Avatar initials={getInitials(currentUser.name)} />
            <Button onClick={() => setIsModalOpen(true)}>
              Invitar jugadores
            </Button>
          </div>
        </header>

        <main className="game-board__main-content">
          <div className="game-board__poker-table" />

          {/* FIX: Removed the unused 'index' parameter from the map function. */}
          {roomState.players.map((p) => {
            const isCurrentUser = p.name === currentUser.name;

            const seatPositionClass = isCurrentUser
              ? 'player-seat-wrapper--current-user'
              : `player-seat-wrapper--other-${
                  roomState.players
                    .filter((op) => op.name !== currentUser.name)
                    .findIndex((op) => op.name === p.name) + 1
                }`;

            return (
              <div
                key={p.name}
                className={`player-seat-wrapper ${seatPositionClass}`}
              >
                <PlayerSeat
                  name={p.name}
                  initials={getInitials(p.name)}
                  isCurrentUser={isCurrentUser}
                  hasVoted={!!p.vote}
                />
              </div>
            );
          })}
        </main>

        <footer className="game-board__footer">
          <CardDeck
            onCardSelect={handleCardSelect}
            selectedValue={currentUserVote}
          />
        </footer>
      </div>
      <Modal
        title="Invitar jugadores"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <InvitePlayers gameId={gameName} />
      </Modal>
    </>
  );
};

export default GameBoard;