//src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './components/5-pages/HomePage/home-page.component';
import JoinPage from './components/5-pages/JoinPage/join-page.component'; // We will create this new page
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Route 1: The root URL "/" will show our original HomePage */}
      <Route path="/" element={<HomePage />} />

      {/* Route 2: A URL with a game ID, e.g., "/GAME123", will show the new JoinPage */}
      <Route path="/:gameId" element={<JoinPage />} />
    </Routes>
  );
};

export default App;