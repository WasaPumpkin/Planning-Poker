// src/components/3-organisms/Modal/modal.component.tsx
import React from 'react';
import Button from '../../1-atoms/Button/button.component'; 
import './modal.component.scss';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path
      d="M18 6L6 18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-header__title">{title}</h2>
          <Button variant="tertiary" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </Button>
        </header>
        <main className="modal-content">{children}</main>
      </div>
    </div>
  );
};

export default Modal;