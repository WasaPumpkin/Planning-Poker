// src/components/2-molecules/JoinGameForm/join-game-form.component.tsx
import React, { useState } from 'react';
import Input from '../../1-atoms/Input/input.component';
import Button from '../../1-atoms/Button/button.component';
import RadioButton from '../../1-atoms/RadioButton/radio-button.component';
import Label from '../../1-atoms/Label/label.component'; // <-- 1. Import the Label atom
import { validateGameName } from '../../../utils/validators';
import './join-game-form.component.scss';

export type PlayerRole = 'player' | 'spectator';

interface JoinGameFormProps {
  onJoinSuccess: (name: string, role: PlayerRole) => void;
}

const JoinGameForm: React.FC<JoinGameFormProps> = ({ onJoinSuccess }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState<PlayerRole>('player');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateGameName(playerName);

    if (validationError) {
      setError(validationError);
    } else {
      setError(null);
      onJoinSuccess(playerName.trim(), playerRole);
    }
  };

  return (
    <form className="join-game-form" onSubmit={handleSubmit}>
      <div className="join-game-form__field-group">
        <Label htmlFor="player-name">Tu nombre</Label>
        <Input
          id="player-name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          autoFocus
        />
      </div>

      {error && <p className="join-game-form__error">{error}</p>}

      <div className="join-game-form__role-selector">
        <RadioButton
          id="role-player"
          name="player-role"
          label="Jugador"
          value="player"
          checked={playerRole === 'player'}
          onChange={() => setPlayerRole('player')}
        />
        <RadioButton
          id="role-spectator"
          name="player-role"
          label="Espectador"
          value="spectator"
          checked={playerRole === 'spectator'}
          onChange={() => setPlayerRole('spectator')}
        />
      </div>

      <Button type="submit" variant="secondary">
        Continuar
      </Button>
    </form>
  );
};

export default JoinGameForm;