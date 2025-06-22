// src/components/2-molecules/InvitePlayers/invite-players.component.tsx
import React, { useState } from 'react';
import Button from '../../1-atoms/Button/button.component';
import './invite-players.component.scss';

interface InvitePlayersProps {
  gameId: string;
}

const InvitePlayers: React.FC<InvitePlayersProps> = ({ gameId }) => {
  const [buttonText, setButtonText] = useState('Copiar link');
  // MODIFIED: Use the real gameId to create the link
  const inviteLink = `${window.location.origin}/${gameId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setButtonText('Copiado!');
      setTimeout(() => setButtonText('Copiar link'), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setButtonText('Error al copiar');
    }
  };

  return (
    <div className="invite-players">
      <div className="invite-players__link-container">
        <span className="invite-players__link-text">{inviteLink}</span>
      </div>

      {/* ADDED: A wrapper div to control the button's alignment and width */}
      <div className="invite-players__button-wrapper">
        <Button onClick={handleCopyLink} variant="secondary">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default InvitePlayers;