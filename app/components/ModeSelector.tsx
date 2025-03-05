'use client';

import React from 'react';
import { TimerMode, usePomodoro } from '../context/PomodoroContext';
import { useLocale } from '../context/LocaleContext';

const ModeSelector: React.FC = () => {
  const { mode, changeMode } = usePomodoro();
  const { locale, isChangingLocale } = useLocale();

  const modeButtons = [
    { value: 'focus' as TimerMode, label: locale.focus },
    { value: 'shortBreak' as TimerMode, label: locale.shortBreak },
    { value: 'longBreak' as TimerMode, label: locale.longBreak },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-black border border-zinc-800 rounded-full">
      {modeButtons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => changeMode(btn.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            mode === btn.value
              ? btn.value === 'focus'
                ? 'bg-rose-600 text-white' 
                : btn.value === 'shortBreak' 
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white'
              : 'text-white hover:bg-zinc-800'
          }`}
        >
          <span className={`block transition-all duration-500 ${isChangingLocale ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {btn.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;