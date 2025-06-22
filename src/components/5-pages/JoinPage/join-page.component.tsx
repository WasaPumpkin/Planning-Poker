// src/components/5-pages/JoinPage/join-page.component.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../../4-templates/AppLayout/app-layout.component';
import JoinGame from '../../3-organisms/JoinGame/join-game.component';
// We only need the types from these files, not the actual Redux actions.
import { type PlayerRole } from '../../2-molecules/JoinGameForm/join-game-form.component';
import { type RoomState } from '../../../hooks/useRoomState';

const JoinPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const handleJoinSuccess = (name: string, role: PlayerRole) => {
    if (!gameId) return;
    try {
      const storedState = localStorage.getItem(gameId);
      if (storedState) {
        const currentRoom: RoomState = JSON.parse(storedState);
        const updatedRoom: RoomState = {
          ...currentRoom,
          players: [...currentRoom.players, { name, role }],
        };
        localStorage.setItem(gameId, JSON.stringify(updatedRoom));
        window.dispatchEvent(new StorageEvent('storage', { key: gameId }));

        // --- FIX: Save BOTH the game ID and THIS USER'S name to sessionStorage ---
        sessionStorage.setItem('activeGameId', gameId);
        sessionStorage.setItem('currentUserName', name); // Remember who this user is

        navigate('/');
      } else {
        alert(`Error: No se encontró la sala de juego "${gameId}".`);
      }
    } catch (error) {
      console.error('Failed to join room:', error);
      alert('Ocurrió un error al unirse a la sala.');
    }
  };

  return (
    <AppLayout>
      <JoinGame onJoinSuccess={handleJoinSuccess} />
    </AppLayout>
  );
};

export default JoinPage;