// src/hooks/useRoomState.ts
import { useState, useEffect, useCallback } from 'react';
import { type PlayerRole } from '../components/2-molecules/JoinGameForm/join-game-form.component';

// Define the shape of our shared state
export type CardValue = number | '?' | '☕' | '∞';

// Add an optional 'vote' property to the Player interface
interface Player {
  name: string;
  role: PlayerRole;
  vote?: CardValue; // The card this player has selected
}

export interface RoomState {
  gameName: string;
  players: Player[];
}

// This hook manages the state for a single "room" in localStorage.
export function useRoomState(
  roomId: string | null
): [RoomState | null, (newState: RoomState) => void] {
  const getInitialState = useCallback((): RoomState | null => {
    if (!roomId) return null;
    try {
      const storedState = localStorage.getItem(roomId);
      return storedState ? JSON.parse(storedState) : null;
    } catch (error) {
      console.error('Failed to parse state from localStorage', error);
      return null;
    }
  }, [roomId]);

  const [roomState, setRoomState] = useState<RoomState | null>(getInitialState);

  // A function to update both React state and localStorage
  const updateState = useCallback(
    (newState: RoomState) => {
      if (!roomId) return;
      setRoomState(newState);
      try {
        localStorage.setItem(roomId, JSON.stringify(newState));
        // Manually dispatch a storage event so the current tab also reacts
        window.dispatchEvent(new StorageEvent('storage', { key: roomId }));
      } catch (error) {
        console.error('Failed to save state to localStorage', error);
      }
    },
    [roomId]
  );

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === roomId) {
        setRoomState(getInitialState());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [roomId, getInitialState]);

  return [roomState, updateState];
}