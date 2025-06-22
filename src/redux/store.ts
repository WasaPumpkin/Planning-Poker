// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    // Add our game slice's reducer to the store
    game: gameReducer,
    // We can add other slices here in the future, e.g., 'user: userReducer'
  },
});

// These are crucial TypeScript types for working with our store.
// They allow us to have type safety with our state and dispatch functions.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;