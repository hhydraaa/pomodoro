'use client';

import React from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import { useLocale } from '../context/LocaleContext';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import ModeSelector from './ModeSelector';
import ProgressCircle from './ProgressCircle';

const PomodoroTimer: React.FC = () => {
  const { timeLeft, progress, mode, isActive, completedPomodoros } = usePomodoro();
  const { locale, isChangingLocale } = useLocale();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg">
      <div className="text-center mb-4">
        <h2 className={`text-2xl font-semibold mb-1 text-white transition-all duration-500 ${isChangingLocale ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {locale.title}
        </h2>
        <p className={`text-sm text-white opacity-75 transition-all duration-500 delay-100 ${isChangingLocale ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {completedPomodoros} {completedPomodoros === 1 ? 'pomodoro' : 'pomodoros'} {locale.focus.toLowerCase()}
        </p>
      </div>
      
      <ModeSelector />
      
      <div className="relative w-80 h-80 mx-auto my-4">
        <ProgressCircle progress={progress} />
        <TimerDisplay timeLeft={timeLeft} mode={mode} isActive={isActive} />
      </div>
      
      <TimerControls />
    </div>
  );
};

export default PomodoroTimer; 