//src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './components/5-pages/HomePage/home-page.component';
import JoinPage from './components/5-pages/JoinPage/join-page.component'; 
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:gameId" element={<JoinPage />} />
    </Routes>
  );
};

export default App;