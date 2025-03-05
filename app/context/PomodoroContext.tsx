'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroSettings {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  cycles: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  sound: boolean;
  background: 'stars' | 'none';
}

interface PomodoroContextType {
  isActive: boolean;
  mode: TimerMode;
  timeLeft: number; // seconds
  progress: number; // 0 to 1
  completedPomodoros: number;
  currentCycle: number;
  settings: PomodoroSettings;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  changeMode: (mode: TimerMode) => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
}

const defaultSettings: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cycles: 4,
  autoStartBreaks: true,
  autoStartPomodoros: true,
  sound: true,
  background: 'stars',
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PomodoroSettings>(defaultSettings);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);

  // Load settings from localStorage on initial load
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  // Calculate total duration of current mode in seconds
  const getTotalDuration = useCallback(() => {
    switch (mode) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.focusDuration * 60;
    }
  }, [mode, settings]);

  // Calculate progress (0 to 1)
  const progress = 1 - timeLeft / getTotalDuration();

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(getTotalDuration());
    // Auto start timer if enabled in settings
    if (
      (mode === 'shortBreak' || mode === 'longBreak') && 
      settings.autoStartBreaks
    ) {
      setIsActive(true);
    } else if (
      mode === 'focus' && 
      settings.autoStartPomodoros && 
      completedPomodoros > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [mode, settings, completedPomodoros, getTotalDuration]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (mode === 'focus') {
        // Play notification sound if enabled
        if (settings.sound) {
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.error('Failed to play sound', e));
        }
        
        setCompletedPomodoros(prev => prev + 1);
        
        // Check if we need to take a long break
        if (currentCycle === settings.cycles) {
          setMode('longBreak');
          setCurrentCycle(1);
        } else {
          setMode('shortBreak');
          setCurrentCycle(prev => prev + 1);
        }
      } else {
        // Break timer completed
        if (settings.sound) {
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.error('Failed to play sound', e));
        }
        
        setMode('focus');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, settings, currentCycle]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  
  const reset = () => {
    setTimeLeft(getTotalDuration());
    setIsActive(false);
  };
  
  const skip = () => {
    setTimeLeft(0);
  };
  
  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
  };
  
  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  };
  
  return (
    <PomodoroContext.Provider
      value={{
        isActive,
        mode,
        timeLeft,
        progress,
        completedPomodoros,
        currentCycle,
        settings,
        start,
        pause,
        reset,
        skip,
        changeMode,
        updateSettings
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}; 