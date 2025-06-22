// src/components/5-pages/JoinPage/join-page.component.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 1. Import Redux hooks and actions
import { useAppDispatch } from '../../../redux/hooks';
import { addPlayer, createGame } from '../../../redux/slices/gameSlice';
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';

import AppLayout from '../../4-templates/AppLayout/app-layout.component';
import JoinGame from '../../3-organisms/JoinGame/join-game.component';

const JoinPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // 2. Initialize dispatch

  const handleJoinSuccess = (name: string, role: PlayerRole) => {
    // 3. Dispatch actions to update the Redux state
    if (gameId) {
      // Set the game name from the URL and add the new player
      dispatch(createGame(gameId));
      dispatch(addPlayer({ name, role }));
    }

    // 4. Navigate the user to the game board (which will now show the correct state)
    // A real app might navigate to `/game/${gameId}`, but for now, home works.
    navigate('/');
  };

  return (
    <AppLayout>
      <JoinGame onJoinSuccess={handleJoinSuccess} />
    </AppLayout>
  );
};

export default JoinPage;