// src/components/2-molecules/CreateGameForm/create-game-form.component.tsx
import React, { useState } from 'react';
import Input from '../../1-atoms/Input/input.component';
import Button from '../../1-atoms/Button/button.component';
import { validateGameName } from '../../../utils/validators';
import Label from '../../1-atoms/Label/label.component'; 
import './create-game-form.component.scss';

interface CreateGameFormProps {
  onGameCreated: (gameName: string) => void;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({ onGameCreated }) => {
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Use the validator function to check the name
    const validationError = validateGameName(gameName);

    if (validationError) {
      // If there's an error, display it
      setError(validationError);
    } else {
      // If valid, clear any previous error and proceed
      setError(null);
      onGameCreated(gameName.trim());
    }
  };

  return (
    <form className="create-game-form" onSubmit={handleSubmit}>
      <div className="create-game-form__field-group">
        <Label htmlFor="game-name">Nombra la partida</Label>
        <Input
          id="game-name"
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          autoFocus
          // FIX: Pass the new prop to align the text to the left
          align="left"
        />
      </div>

      {error && <p className="create-game-form__error">{error}</p>}
      <Button type="submit" variant="secondary">
        Crear partida
      </Button>
    </form>
  );
};

export default CreateGameForm;