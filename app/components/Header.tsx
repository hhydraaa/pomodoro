'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';
import SettingsModal from './SettingsModal';
import AboutModal from './AboutModal';

const Header: React.FC = () => {
  const { locale, localeKey, setLocaleKey } = useLocale();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 py-4">
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Pomodoro Logo" 
          width={32} 
          height={32} 
          className="mr-2"
        />
        <h1 className="text-xl font-bold hidden sm:block">Pomodoro</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative group">
          <button className="px-3 py-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-black transition-colors">
            <span className="sr-only">Switch Language</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
          </button>
          
          <div className="absolute left-1/2 -translate-x-1/2 mt-1 bg-black shadow-lg rounded-lg py-1 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => setLocaleKey('en')}
              className={`block w-full text-left px-4 py-2 hover:bg-zinc-800 transition-all duration-300 rounded-md flex items-center space-x-2 ${
                localeKey === 'en' ? 'font-medium bg-zinc-790 shadow-inner border-l-2 border-white' : ''
              }`}
            >
              <span className="text-xs bg-zinc-800 rounded-full px-1.5 py-0.5 mr-2">EN</span>
              English
            </button>
            <div className="my-1"></div>
            <button
              onClick={() => setLocaleKey('tr')}
              className={`block w-full text-left px-4 py-2 hover:bg-zinc-800 transition-all duration-300 rounded-md flex items-center space-x-2 ${
                localeKey === 'tr' ? 'font-medium bg-zinc-790 shadow-inner border-l-2 border-white' : ''
              }`}
            >
              <span className="text-xs bg-zinc-800 rounded-full px-1.5 py-0.5 mr-2">TR</span>
              Türkçe
            </button>
          </div>
        </div>
        
        {/* Settings Button */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-black transition-colors"
          aria-label={locale.settings}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        {/* About Button */}
        <button
          onClick={() => setAboutOpen(true)}
          className="p-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-black transition-colors"
          aria-label={locale.about}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>
      </div>
      
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
};

export default Header; 