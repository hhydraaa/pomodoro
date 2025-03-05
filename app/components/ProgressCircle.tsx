'use client';

import React from 'react';
import { usePomodoro } from '../context/PomodoroContext';

interface ProgressCircleProps {
  progress: number; // 0 to 1
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const { mode } = usePomodoro();
  
  // Define colors for different modes
  const getStrokeColor = () => {
    switch (mode) {
      case 'focus':
        return 'stroke-rose-500';
      case 'shortBreak':
        return 'stroke-emerald-400';
      case 'longBreak':
        return 'stroke-blue-400';
      default:
        return 'stroke-white';
    }
  };
  
  // Circle properties
  const size = 280;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-white opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-500 ${getStrokeColor()}`}
        />
      </svg>
    </div>
  );
};

export default ProgressCircle; 