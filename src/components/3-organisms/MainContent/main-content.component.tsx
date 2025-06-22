// src/components/3-organisms/MainContent/main-content.component.tsx
import React from 'react';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
import CreateGameForm from '../../2-molecules/CreateGameForm/create-game-form.component';
import './main-content.component.scss';

// Add the prop here
interface MainContentProps {
  onGameCreated: (gameName: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onGameCreated }) => {
  return (
    <main className="main-content">
      <header className="main-content__header">
        <PragmaLogo showText={false} iconSize={48} />
        <h1 className="main-content__header_title">Crear partida</h1>
      </header>
      {/* Pass the prop down to the form */}
      <CreateGameForm onGameCreated={onGameCreated} />
    </main>
  );
};

export default MainContent;
