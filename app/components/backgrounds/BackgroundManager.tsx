'use client';

import React from 'react';
import { usePomodoro } from '../../context/PomodoroContext';
import StarsBackground from './StarsBackground';

const BackgroundManager: React.FC = () => {
  const { settings } = usePomodoro();
  
  return (
    <>
      {settings.background === 'stars' && <StarsBackground />}
    </>
  );
};

export default BackgroundManager; 