// src/components/3-organisms/JoinGame/join-game.component.tsx
import React from 'react';
import JoinGameForm, {
  type PlayerRole,
} from '../../2-molecules/JoinGameForm/join-game-form.component';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component';
import './join-game.component.scss';

interface JoinGameProps {
  onJoinSuccess: (name: string, role: PlayerRole) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoinSuccess }) => {
  const fibonacciCards = [0, 1, 2, 3, 5, 8, 13, 21, 45, 99, 11, 41];

  return (
    <div className="join-game">
      {/* 1. A single wrapper for ALL blurry background elements */}
      <div className="join-game__background-elements">
        {/* The poker table is FIRST inside the wrapper, so it's at the bottom of the stack */}
        <div className="join-game__poker-table" />

        {/* The header and footer will render on top of the table */}
        <header className="join-game__header">
          <PragmaLogo showText={false} iconSize={48} />
          <span className="join-game__logout">Logout</span>
        </header>

        <footer className="join-game__footer">
          <p>Elige una carta</p>
          <div className="join-game__card-placeholders">
            {fibonacciCards.map((number) => (
              <div key={number} className="join-game__card-placeholder">
                <span className="join-game__card-number">{number}</span>
              </div>
            ))}
          </div>
        </footer>
      </div>

      {/* 2. The focused modal container is a SIBLING to the background wrapper, ensuring it sits on top */}
      <div className="join-game__modal-container">
        <JoinGameForm onJoinSuccess={onJoinSuccess} />
      </div>
    </div>
  );
};

export default JoinGame;