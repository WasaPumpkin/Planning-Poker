// src/components/3-organisms/SplashScreen/splash-screen.component.tsx
import React, { useEffect, useState } from 'react';
import PragmaLogo from '../../2-molecules/PragmaLogo/pragma-logo.component'; // 
import './splash-screen.component.scss';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 400);
    const navigationTimer = setTimeout(() => onFinished(), 400 + 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [onFinished]);

  return (
    <div className={`splash-screen-container ${!isVisible ? 'hidden' : ''}`}>
      <div className="logo-wrapper">
        <PragmaLogo />
      </div>
    </div>
  );
};

export default SplashScreen;
