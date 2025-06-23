// // src/components/3-organisms/GameBoard/game-board.component.tsx
// // src/components/3-organisms/GameBoard/game-board.component.tsx
// import React, { useState } from 'react';
// // We only need the types from PlayerRole, not the component itself
// import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';
// import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
// import PlayerSeat from '../../2-molecules/PlayerSeat/player-seat.component';
// import Avatar from '../../1-atoms/Avatar/avatar.component';
// import Button from '../../1-atoms/Button/button.component';
// import Modal from '../Modal/modal.component';
// import InvitePlayers from '../../2-molecules/InvitePlayers/invite-players.component';
// import {
//   useRoomState,
//   type CardValue,
//   type RoomState,
// } from '../../../hooks/useRoomState';
// import CardDeck from '../../2-molecules/CardDeck/card-deck.component';
// import './game-board.component.scss';

// interface Player {
//   name: string;
//   role: PlayerRole;
//   vote?: CardValue; // Make sure Player interface is consistent with RoomState
// }

// interface GameBoardProps {
//   player: Player | null;
//   gameName: string;
// }

// const getInitials = (name: string): string => {
//   if (!name || typeof name !== 'string') return '';
//   const names = name.trim().toUpperCase().split(' ');
//   if (names.length === 1) return names[0].slice(0, 2);
//   return names[0][0] + names[1][0];
// };

// const GameBoard: React.FC<GameBoardProps> = ({ player, gameName }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [roomState, setRoomState] = useRoomState(gameName);

//   const handleCardSelect = (value: CardValue) => {
//     if (!roomState || !player) return;

//     const updatedPlayers = roomState.players.map((p) =>
//       p.name === player.name ? { ...p, vote: value } : p
//     );

//     const updatedRoom: RoomState = { ...roomState, players: updatedPlayers };
//     setRoomState(updatedRoom);
//   };

//   // NEW: Placeholder function for revealing votes
//   const handleRevealVotes = () => {
//     console.log('Reveal Votes button clicked. Logic to be implemented.');
//     // In the future, this will update the room state to show all votes.
//   };

//   if (!roomState || !player) {
//     return <div className="game-board">Cargando sala...</div>;
//   }

//   // --- NEW: Logic to determine button visibility ---
//   // The host is the first player in the array.
//   const isHost =
//     player && roomState.players.length > 0 && roomState.players[0].name === player.name;
//   // The button should only appear for the host when there are 2 or more players.
//   const canRevealVotes = isHost && roomState.players.length >= 2;
//   // --- END NEW LOGIC ---

//   const currentUser = player;
//   const currentUserInRoom = roomState.players.find(
//     (p) => p.name === currentUser.name
//   );
//   const currentUserVote = currentUserInRoom?.vote;

//   const boardClassName = `game-board ${isModalOpen ? 'blurred' : ''}`;

//   return (
//     <>
//       <div className={boardClassName}>
//         <header className="game-board__header">
//           <PragmaLogo showText={false} iconSize={48} />
//           <h1 className="game-board__title">{roomState.gameName}</h1>
//           <div className="game-board__header-right">
//             <Avatar initials={getInitials(currentUser.name)} />
//             <Button onClick={() => setIsModalOpen(true)}>
//               Invitar jugadores
//             </Button>
//           </div>
//         </header>

//         <main className="game-board__main-content">
//           <div className="game-board__poker-table">
//             {/* --- NEW: Conditionally rendered button --- */}
//             {canRevealVotes && (
//               <Button variant="cta" onClick={handleRevealVotes}>
//                 Revelar cartas
//               </Button>
//             )}
//           </div>

//           {roomState.players.map((p) => {
//             const isCurrentUser = p.name === currentUser.name;

//             const seatPositionClass = isCurrentUser
//               ? 'player-seat-wrapper--current-user'
//               : `player-seat-wrapper--other-${
//                   roomState.players
//                     .filter((op) => op.name !== currentUser.name)
//                     .findIndex((op) => op.name === p.name) + 1
//                 }`;

//             return (
//               <div
//                 key={p.name}
//                 className={`player-seat-wrapper ${seatPositionClass}`}
//               >
//                 <PlayerSeat
//                   name={p.name}
//                   initials={getInitials(p.name)}
//                   isCurrentUser={isCurrentUser}
//                   hasVoted={!!p.vote}
//                 />
//               </div>
//             );
//           })}
//         </main>

//         <footer className="game-board__footer">
//           <CardDeck
//             onCardSelect={handleCardSelect}
//             selectedValue={currentUserVote}
//           />
//         </footer>
//       </div>
//       <Modal
//         title="Invitar jugadores"
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       >
//         <InvitePlayers gameId={gameName} />
//       </Modal>
//     </>
//   );
// };

// export default GameBoard;

// src/components/3-organisms/GameBoard/game-board.component.tsx
// src/components/3-organisms/GameBoard/game-board.component.tsx
import React, { useState, useMemo } from 'react';

// --- FIX: Ensure ALL used components are imported ---
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
// --- END FIX ---

import {
  useRoomState,
  type CardValue,
  type RoomState,
} from '../../../hooks/useRoomState';

import './game-board.component.scss';

// These interfaces are part of the component's definition
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
    if (!roomState || !player) return;
    const updatedPlayers = roomState.players.map((p) =>
      p.name === player.name ? { ...p, vote: value } : p
    );
    const updatedRoom: RoomState = { ...roomState, players: updatedPlayers };
    setRoomState(updatedRoom);
  };

  const handleRevealVotes = () => {
    setGamePhase('REVEALING');
    setTimeout(() => {
      setGamePhase('REVEALED');
    }, 2000);
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
          </div>

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