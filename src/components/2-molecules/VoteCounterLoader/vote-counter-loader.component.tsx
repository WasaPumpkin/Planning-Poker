// src/components/2-molecules/VoteCounterLoader/vote-counter-loader.component.tsx
import React from 'react';
import './vote-counter-loader.component.scss';

const VoteCounterLoader: React.FC = () => {
  return (
    <div className="vote-counter-loader">
      <div className="vote-counter-loader__dots">
        <div className="vote-counter-loader__dot"></div>
        <div className="vote-counter-loader__dot"></div>
        <div className="vote-counter-loader__dot"></div>
        <div className="vote-counter-loader__dot"></div>
      </div>
      <p className="vote-counter-loader__text">Contando votos</p>
    </div>
  );
};

export default VoteCounterLoader;