'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { locales, LocaleKey, Locale } from '../locales';

interface LocaleContextType {
  locale: Locale;
  localeKey: LocaleKey;
  setLocaleKey: (localeKey: LocaleKey) => void;
  isChangingLocale: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localeKey, setLocaleKey] = useState<LocaleKey>('en');
  const [isChangingLocale, setIsChangingLocale] = useState(false);

  useEffect(() => {
    // Try to load the locale from localStorage
    const savedLocale = localStorage.getItem('locale') as LocaleKey | null;
    if (savedLocale && Object.keys(locales).includes(savedLocale)) {
      setLocaleKey(savedLocale);
    } else {
      // Try to use browser preferred language
      const browserLang = navigator.language.split('-')[0] as LocaleKey;
      if (Object.keys(locales).includes(browserLang)) {
        setLocaleKey(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', localeKey);
  }, [localeKey]);
  
  // Locale değişiminde animasyon kontrolü
  const handleLocaleChange = (newLocaleKey: LocaleKey) => {
    if (newLocaleKey !== localeKey) {
      setIsChangingLocale(true);
      
      // Kısa bir gecikme ile animasyon tetikle
      setTimeout(() => {
        setLocaleKey(newLocaleKey);
        
        // Animasyon bittikten sonra state'i sıfırla
        setTimeout(() => {
          setIsChangingLocale(false);
        }, 500);
      }, 100);
    }
  };

  const locale = locales[localeKey];

  return (
    <LocaleContext.Provider value={{ locale, localeKey, setLocaleKey: handleLocaleChange, isChangingLocale }}>
      <div className={`${isChangingLocale ? 'animate-lang-change' : ''}`}>
        {children}
      </div>
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}; 