// src/components/5-pages/HomePage/home-page.component.tsx
import React, { useState } from 'react'; // 1. We still need useState for the splash screen
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  createGame,
  addPlayer,
  selectGameStatus,
  selectGameName,
  selectPlayers,
} from '../../../redux/slices/gameSlice';
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';

// Import all the organism components
import AppLayout from '../../4-templates/AppLayout/app-layout.component';
import SplashScreen from '../../3-organisms/SplashScreen/splash-screen.component';
import MainContent from '../../3-organisms/MainContent/main-content.component';
import JoinGame from '../../3-organisms/JoinGame/join-game.component';
import GameBoard from '../../3-organisms/GameBoard/game-board.component';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const gameName = useAppSelector(selectGameName);
  const players = useAppSelector(selectPlayers);

  // 2. We keep a local state just for the initial splash screen visibility.
  const [showSplash, setShowSplash] = useState(true);

  // Handler functions now dispatch Redux actions
  const handleGameCreated = (name: string) => {
    dispatch(createGame(name));
  };

  const handleJoinSuccess = (name: string, role: PlayerRole) => {
    dispatch(addPlayer({ name, role }));
  };

  // 3. The main render logic now has two stages.

  // Stage 1: Check if the splash screen should be shown.
  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  // Stage 2: Once splash is done, render the correct view based on Redux state.
  const renderView = () => {
    switch (gameStatus) {
      case 'idle':
        return <MainContent onGameCreated={handleGameCreated} />;

      case 'creating':
        // When a game is created, the creator needs to join.
        return <JoinGame onJoinSuccess={handleJoinSuccess} />;

      case 'playing':
        // The first player in the array is the one who just joined.
        // A more robust app might find the player by a unique ID.
        { const currentPlayer = players.length > 0 ? players[0] : null;
        return <GameBoard player={currentPlayer} gameName={gameName || ''} />; }

      default:
        return <MainContent onGameCreated={handleGameCreated} />;
    }
  };

  return <AppLayout>{renderView()}</AppLayout>;
};

export default HomePage;