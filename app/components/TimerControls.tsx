'use client';

import React from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import { useLocale } from '../context/LocaleContext';

const TimerControls: React.FC = () => {
  const { isActive, start, pause, reset, skip, mode } = usePomodoro();
  const { locale } = useLocale();

  // Modun rengine göre start butonunun stilini belirleme
  const getStartButtonStyle = () => {
    switch (mode) {
      case 'focus':
        return 'bg-rose-600 hover:bg-rose-500 border-rose-400 hover:shadow-glow-rose';
      case 'shortBreak':
        return 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 hover:shadow-glow-emerald';
      case 'longBreak':
        return 'bg-blue-600 hover:bg-blue-500 border-blue-400 hover:shadow-glow-blue';
      default:
        return 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700';
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {isActive ? (
        <button
          onClick={pause}
          className="px-6 py-3 rounded-lg bg-black border border-white text-white hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105"
          aria-label={locale.pause}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        </button>
      ) : (
        <button
          onClick={start}
          className={`px-6 py-3 rounded-lg text-white border transition-all duration-300 transform hover:scale-105 ${getStartButtonStyle()}`}
          aria-label={locale.start}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </button>
      )}
      
      <button
        onClick={reset}
        className="px-4 py-3 rounded-lg bg-black border border-white text-white hover:bg-zinc-800 transition-all duration-300"
        aria-label={locale.reset}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
      
      <button
        onClick={skip}
        className="px-4 py-3 rounded-lg bg-black border border-white text-white hover:bg-zinc-800 transition-all duration-300"
        aria-label="Skip"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
        </svg>
      </button>
    </div>
  );
};

export default TimerControls; 