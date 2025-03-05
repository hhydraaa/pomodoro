'use client';

import React from 'react';
import { TimerMode } from '../context/PomodoroContext';
import { formatTime } from '../utils/timeUtils';
import { useLocale } from '../context/LocaleContext';

interface TimerDisplayProps {
  timeLeft: number;
  mode: TimerMode;
  isActive: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, mode, isActive }) => {
  const { locale, isChangingLocale } = useLocale();

  const getModeColor = () => {
    switch (mode) {
      case 'focus':
        return 'text-rose-500';
      case 'shortBreak':
        return 'text-emerald-400';
      case 'longBreak':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  const getModeName = () => {
    switch (mode) {
      case 'focus':
        return locale.focus;
      case 'shortBreak':
        return locale.shortBreak;
      case 'longBreak':
        return locale.longBreak;
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
      <div className={`flex flex-col items-center justify-center ${isActive ? 'animate-pulse-slow' : ''}`}>
        <div className={`text-6xl font-bold ${getModeColor()} transition-all duration-300`}>
          {formatTime(timeLeft)}
        </div>
        <div className={`text-sm mt-2 text-white opacity-80 transition-all duration-500 ${
          isChangingLocale ? 'opacity-0 scale-95' : 'opacity-80 scale-100'
        }`}>
          {getModeName()}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;