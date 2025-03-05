'use client';

import React, { useState, useEffect } from 'react';
import { usePomodoro, type PomodoroSettings } from '../context/PomodoroContext';
import { useLocale } from '../context/LocaleContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = usePomodoro();
  const { locale } = useLocale();
  const [tempSettings, setTempSettings] = useState<PomodoroSettings>({ ...settings });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setTempSettings({ ...settings });
      setShowModal(true);
      // Çok kısa bir gecikme, DOM'a eklendikten sonra animasyon sınıfını eklediğimizden emin olmak için
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Animasyon tamamlandıktan sonra modalı DOM'dan kaldır
      const timer = setTimeout(() => setShowModal(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, settings]);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setTempSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' || name === 'focusDuration' || name === 'shortBreakDuration' || name === 'longBreakDuration' || name === 'cycles'
          ? Number(value)
          : value
    }));
  };
  
  const handleSave = () => {
    updateSettings(tempSettings);
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };
  
  const handleCancel = () => {
    setTempSettings({ ...settings });
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };
  
  if (!showModal) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={handleCancel}
    >
      <div 
        className={`bg-black border border-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold text-white transition-all duration-700 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>{locale.settings_title}</h2>
          <button 
            onClick={handleCancel} 
            className="text-white hover:text-zinc-400 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid gap-6">
          <section className={`space-y-3 transition-all duration-700 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold text-white">{locale.duration.focus}</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="focusDuration"
                min="1"
                max="60"
                value={tempSettings.focusDuration}
                onChange={handleInputChange}
                className="flex-grow h-2 rounded-full appearance-none bg-zinc-800 border border-zinc-700 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <input
                type="number"
                name="focusDuration"
                min="1"
                max="60"
                value={tempSettings.focusDuration}
                onChange={handleInputChange}
                className="w-16 p-1 border rounded bg-zinc-900 border-zinc-700 text-white text-center transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </section>
          
          <section className={`space-y-3 transition-all duration-700 delay-150 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold text-white">{locale.duration.shortBreak}</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="shortBreakDuration"
                min="1"
                max="30"
                value={tempSettings.shortBreakDuration}
                onChange={handleInputChange}
                className="flex-grow h-2 rounded-full appearance-none bg-zinc-800 border border-zinc-700 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <input
                type="number"
                name="shortBreakDuration"
                min="1"
                max="30"
                value={tempSettings.shortBreakDuration}
                onChange={handleInputChange}
                className="w-16 p-1 border rounded bg-zinc-900 border-zinc-700 text-white text-center transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </section>
          
          <section className={`space-y-3 transition-all duration-700 delay-200 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold text-white">{locale.duration.longBreak}</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="longBreakDuration"
                min="1"
                max="60"
                value={tempSettings.longBreakDuration}
                onChange={handleInputChange}
                className="flex-grow h-2 rounded-full appearance-none bg-zinc-800 border border-zinc-700 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <input
                type="number"
                name="longBreakDuration"
                min="1"
                max="60"
                value={tempSettings.longBreakDuration}
                onChange={handleInputChange}
                className="w-16 p-1 border rounded bg-zinc-900 border-zinc-700 text-white text-center transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </section>
          
          <section className={`space-y-3 transition-all duration-700 delay-250 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold text-white">{locale.cycles}</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="cycles"
                min="1"
                max="10"
                value={tempSettings.cycles}
                onChange={handleInputChange}
                className="flex-grow h-2 rounded-full appearance-none bg-zinc-800 border border-zinc-700 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-zinc-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <input
                type="number"
                name="cycles"
                min="1"
                max="10"
                value={tempSettings.cycles}
                onChange={handleInputChange}
                className="w-16 p-1 border rounded bg-zinc-900 border-zinc-700 text-white text-center transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </section>
          
          <section className={`space-y-4 pt-3 border-t border-zinc-800 transition-all duration-700 delay-300 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold text-white mt-3">{locale.sounds}</h3>
            
            <div className="flex items-center gap-3 group">
              <input
                type="checkbox"
                id="autoStartBreaks"
                name="autoStartBreaks"
                checked={tempSettings.autoStartBreaks}
                onChange={handleInputChange}
                className="w-4 h-4 accent-zinc-600 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
              <label htmlFor="autoStartBreaks" className="text-gray-200 transition-colors duration-300 group-hover:text-white cursor-pointer">
                {locale.auto_start} ({locale.shortBreak}/{locale.longBreak})
              </label>
            </div>
            
            <div className="flex items-center gap-3 group">
              <input
                type="checkbox"
                id="autoStartPomodoros"
                name="autoStartPomodoros"
                checked={tempSettings.autoStartPomodoros}
                onChange={handleInputChange}
                className="w-4 h-4 accent-zinc-600 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
              <label htmlFor="autoStartPomodoros" className="text-gray-200 transition-colors duration-300 group-hover:text-white cursor-pointer">
                {locale.auto_start} ({locale.focus})
              </label>
            </div>
            
            <div className="flex items-center gap-3 group">
              <input
                type="checkbox"
                id="sound"
                name="sound"
                checked={tempSettings.sound}
                onChange={handleInputChange}
                className="w-4 h-4 accent-zinc-600 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
              <label htmlFor="sound" className="text-gray-200 transition-colors duration-300 group-hover:text-white cursor-pointer">
                {locale.sounds}
              </label>
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <label htmlFor="background" className="text-gray-200">
                {locale.background.title}
              </label>
              <select
                id="background"
                name="background"
                value={tempSettings.background}
                onChange={handleInputChange}
                className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300"
              >
                <option value="stars">{locale.background.stars}</option>
                <option value="none">{locale.background.none}</option>
              </select>
            </div>
          </section>
          
          <div className={`flex justify-end gap-4 mt-6 pt-4 border-t border-zinc-800 transition-all duration-700 delay-350 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-all duration-300 shadow-sm"
            >
              {locale.cancel}
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-zinc-800 text-white rounded-lg shadow-sm hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 border border-zinc-600"
            >
              {locale.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal; 