// src/redux/slices/gameSlice.ts
// FIX: Add the 'type' keyword before PayloadAction in the import.
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the shape of a single player
interface Player {
  name: string;
  role: 'player' | 'spectator';
}

// Define the shape of our game state
interface GameState {
  gameName: string | null;
  status: 'idle' | 'creating' | 'joined' | 'playing';
  players: Player[];
}

// Define the initial state when the app loads
const initialState: GameState = {
  gameName: null,
  status: 'idle',
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // Reducers define how the state can be updated.
  reducers: {
    // Action to create a new game
    createGame: (state, action: PayloadAction<string>) => {
      state.gameName = action.payload;
      state.status = 'creating';
    },
    // Action to add a player to the game
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
      // For now, let's say the first player to join starts the game
      if (state.players.length === 1) {
        state.status = 'playing';
      }
    },
    // Action to reset the game state
    resetGame: (state) => {
      state.gameName = null;
      state.status = 'idle';
      state.players = [];
    },
  },
});

// ... (The rest of the file is unchanged and correct)
export const { createGame, addPlayer, resetGame } = gameSlice.actions;
export const selectGameStatus = (state: RootState) => state.game.status;
export const selectGameName = (state: RootState) => state.game.gameName;
export const selectPlayers = (state: RootState) => state.game.players;
export default gameSlice.reducer;