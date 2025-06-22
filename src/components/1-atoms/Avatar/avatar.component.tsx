// src/components/1-atoms/Avatar/avatar.component.tsx
import React from 'react';
import './avatar.component.scss';

interface AvatarProps {
  initials: string;
}

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  return (
    <div className="avatar">
      <span>{initials}</span>
    </div>
  );
};

export default Avatar;