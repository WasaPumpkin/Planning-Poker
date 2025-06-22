// src/components/4-templates/AppLayout/app-layout.component.tsx
import React from 'react';
import './app-layout.component.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

// This template provides the page structure. It simply renders its children.
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <div className="app-layout">{children}</div>;
};

export default AppLayout;