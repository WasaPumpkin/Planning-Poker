// // src/components/3-organisms/GameBoard/game-board.component.tsx
// src/components/3-organisms/GameBoard/game-board.component.tsx

import React, { useState, useMemo } from 'react';

import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
import PlayerSeat from '../../2-molecules/PlayerSeat/player-seat.component';
import Avatar from '../../1-atoms/Avatar/avatar.component';
import Button from '../../1-atoms/Button/button.component';
import Modal from '../Modal/modal.component';
import InvitePlayers from '../../2-molecules/InvitePlayers/invite-players.component';
import CardDeck from '../../2-molecules/CardDeck/card-deck.component';
import VoteCounterLoader from '../../2-molecules/VoteCounterLoader/vote-counter-loader.component';
import VoteResults from '../../2-molecules/VoteResults/vote-results.component';

import {
  useRoomState,
  type CardValue,
  type RoomState,
} from '../../../hooks/useRoomState';

import './game-board.component.scss';

interface Player {
  name: string;
  role: PlayerRole;
  vote?: CardValue;
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
  type GamePhase = 'VOTING' | 'REVEALING' | 'REVEALED';
  const [gamePhase, setGamePhase] = useState<GamePhase>('VOTING');

  const voteResults = useMemo(() => {
    // ... (no changes needed)
    if (gamePhase !== 'REVEALED' || !roomState) {
      return { voteCounts: {}, average: '0,0' };
    }
    const numericVotes: number[] = [];
    const voteCounts = roomState.players.reduce((acc, p) => {
      if (p.vote !== undefined) {
        const key = String(p.vote);
        acc[key] = (acc[key] || 0) + 1;
        const numericValue = parseInt(String(p.vote), 10);
        if (!isNaN(numericValue)) {
          numericVotes.push(numericValue);
        }
      }
      return acc;
    }, {} as Record<string, number>);
    const average =
      numericVotes.length > 0
        ? (
            numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length
          ).toFixed(1)
        : '0.0';
    return { voteCounts, average: average.replace('.', ',') };
  }, [gamePhase, roomState]);

  const handleCardSelect = (value: CardValue) => {
    // ... (no changes needed)
    if (!roomState || !player) return;
    const updatedPlayers = roomState.players.map((p) =>
      p.name === player.name ? { ...p, vote: value } : p
    );
    const updatedRoom: RoomState = { ...roomState, players: updatedPlayers };
    setRoomState(updatedRoom);
  };

  const handleRevealVotes = () => {
    // ... (no changes needed)
    setGamePhase('REVEALING');
    setTimeout(() => {
      setGamePhase('REVEALED');
    }, 2000);
  };

  const handleNewVote = () => {
    // ... (no changes needed)
    if (!roomState) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const playersWithClearedVotes = roomState.players.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ vote: _vote, ...player }) => player
    );
    const updatedRoom: RoomState = { ...roomState, players: playersWithClearedVotes };
    setRoomState(updatedRoom);
    setGamePhase('VOTING');
  };

  if (!roomState || !player) {
    return <div className="game-board">Cargando sala...</div>;
  }

  const isHost =
    player &&
    roomState.players.length > 0 &&
    roomState.players[0].name === player.name;
  const canRevealVotes = isHost && roomState.players.length >= 2;

  const currentUser = player;
  const currentUserInRoom = roomState.players.find(
    (p) => p.name === currentUser.name
  );
  const currentUserVote = currentUserInRoom?.vote;

  const boardClassName = `game-board ${isModalOpen ? 'blurred' : ''}`;

  // --- All the rendering logic is now inside the main return statement ---
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
          <div className="game-board__poker-table">
            {gamePhase === 'VOTING' && canRevealVotes && (
              <Button variant="cta" onClick={handleRevealVotes}>
                Revelar cartas
              </Button>
            )}
            {gamePhase === 'REVEALING' && <VoteCounterLoader />}
            {gamePhase === 'REVEALED' && isHost && (
              <Button variant="cta" onClick={handleNewVote}>
                Nueva Votación
              </Button>
            )}
          </div>

          {/* --- CORRECTED PLAYER RENDERING LOGIC --- */}
          {(() => {
            const currentUserData = roomState.players.find(p => p.name === currentUser.name);
            const otherPlayers = roomState.players.filter(p => p.name !== currentUser.name);
            const radiusX = 300;
            const radiusY = 200;

            return (
              <>
                {currentUserData && (
                  <div
                    key={currentUserData.name}
                    className="player-seat-wrapper player-seat-wrapper--current-user"
                  >
                    <PlayerSeat
                      name={currentUserData.name}
                      initials={getInitials(currentUserData.name)}
                      isCurrentUser={true}
                      hasVoted={!!currentUserData.vote}
                    />
                  </div>
                )}
                {otherPlayers.map((p, index) => {
                  const totalOtherPlayers = otherPlayers.length;
                  const angle = -Math.PI / 2 + (index / totalOtherPlayers) * (2 * Math.PI);
                  const x = Math.cos(angle) * radiusX;
                  const y = Math.sin(angle) * radiusY;

                  return (
                    <div
                      key={p.name}
                      className="player-seat-wrapper"
                      style={{ '--x': `${x}px`, '--y': `${y}px` } as React.CSSProperties}
                    >
                      <PlayerSeat
                        name={p.name}
                        initials={getInitials(p.name)}
                        isCurrentUser={false}
                        hasVoted={!!p.vote}
                      />
                    </div>
                  );
                })}
              </>
            );
          })()}
          {/* --- END OF CORRECTION --- */}
        </main>

        <footer className="game-board__footer">
          {gamePhase === 'VOTING' && (
            <CardDeck
              onCardSelect={handleCardSelect}
              selectedValue={currentUserVote}
            />
          )}
          {gamePhase === 'REVEALED' && (
            <VoteResults
              voteCounts={voteResults.voteCounts}
              average={voteResults.average}
            />
          )}
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