// src/components/5-pages/HomePage/home-page.component.tsx
import React, { useState, useEffect } from 'react';
// We don't need useNavigate in this component anymore.
import { useRoomState, type RoomState } from '../../../hooks/useRoomState';
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';

// Import Organisms
import AppLayout from '../../4-templates/AppLayout/app-layout.component';
import SplashScreen from '../../3-organisms/SplashScreen/splash-screen.component';
import MainContent from '../../3-organisms/MainContent/main-content.component';
import GameBoard from '../../3-organisms/GameBoard/game-board.component';
import JoinGame from '../../3-organisms/JoinGame/join-game.component';

// Define the shape of a player outside the component for reuse
interface Player {
  name: string;
  role: PlayerRole;
}

// A helper component to manage loading and rendering the game board.
const GameBoardProxy: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [roomState] = useRoomState(gameId);
  const [currentUser, setCurrentUser] = useState<Player | null>(null);

  useEffect(() => {
    // --- FIX: The core logic to identify the current user ---
    if (roomState && roomState.players.length > 0) {
      // 1. Get the current user's name from sessionStorage.
      const currentUserName = sessionStorage.getItem('currentUserName');

      // 2. Find the full player object in the room state that matches that name.
      const foundPlayer = roomState.players.find(
        (p) => p.name === currentUserName
      );

      // 3. Set that found player as our currentUser.
      setCurrentUser(foundPlayer || null);
    }
  }, [roomState]); // This effect re-runs whenever the roomState changes.

  if (!roomState || !currentUser) {
    return <div style={{ color: 'white' }}>Loading Game Board...</div>;
  }

  // Now, we pass the CORRECT user object to the GameBoard.
  return <GameBoard player={currentUser} gameName={roomState.gameName} />;
};



const HomePage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [gameIdForCreator, setGameIdForCreator] = useState<string | null>(null);

  const handleGameCreated = (newGameName: string) => {
    sessionStorage.removeItem('activeGameId');
    sessionStorage.removeItem('currentUserName');
    localStorage.removeItem(newGameName);
    setGameIdForCreator(newGameName);
  };

  const handleCreatorJoin = (name: string, role: PlayerRole) => {
    if (!gameIdForCreator) return;

    const initialState: RoomState = {
      gameName: gameIdForCreator,
      players: [{ name, role }],
    };
    localStorage.setItem(gameIdForCreator, JSON.stringify(initialState));
    sessionStorage.setItem('activeGameId', gameIdForCreator);
    sessionStorage.setItem('currentUserName', name); // Remember who the creator is

    window.location.href = '/';
  };

  // --- RENDER LOGIC ---
  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  // If the creator just created a game, show them the join form.
  if (gameIdForCreator) {
    return (
      <AppLayout>
        <JoinGame onJoinSuccess={handleCreatorJoin} />
      </AppLayout>
    );
  }

  // If a game ID exists in session storage, the user is part of an active game.
  const activeGameId = sessionStorage.getItem('activeGameId');
  if (activeGameId) {
    return (
      <AppLayout>
        <GameBoardProxy gameId={activeGameId} />
      </AppLayout>
    );
  }

  // The default view is the game creation form.
  return (
    <AppLayout>
      <MainContent onGameCreated={handleGameCreated} />
    </AppLayout>
  );
};

export default HomePage;