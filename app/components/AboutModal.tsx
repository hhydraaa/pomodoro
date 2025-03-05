'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import Image from 'next/image';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { locale } = useLocale();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      // Çok kısa bir gecikme, DOM'a eklendikten sonra animasyon sınıfını eklediğimizden emin olmak için
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Animasyon tamamlandıktan sonra modalı DOM'dan kaldır
      const timer = setTimeout(() => setShowModal(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleClose = () => {
    setIsAnimating(false);
    // Animasyon tamamlandıktan sonra parent'a bildir
    setTimeout(onClose, 300);
  };
  
  if (!showModal) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-black rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white transition-all duration-500 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold text-white transition-all duration-700 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {locale.about}
          </h2>
          <button 
            onClick={handleClose}
            className="text-white hover:text-zinc-400 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className={`flex flex-col items-center mb-8 transition-all duration-700 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="w-28 h-28 bg-zinc-800 rounded-full mb-3 overflow-hidden border-2 border-zinc-700 shadow-glow transition-transform duration-500 transform hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Avatar" 
                width={112}
                height={112}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image is not found
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=P&background=random';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">Pomodoro</h3>
            <p className="text-sm text-zinc-500">v1.0.0</p>
          </div>
          
          <section className={`text-gray-200 space-y-4 transition-all duration-700 delay-200 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="leading-relaxed">{locale.about_content.description}</p>
            <p className="leading-relaxed">{locale.about_content.usage}</p>
            <p className="leading-relaxed">{locale.about_content.benefits}</p>
          </section>
          
          <section className={`pt-6 border-t border-gray-800 transition-all duration-700 delay-300 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="font-semibold mb-4 text-white text-center">{locale.contact}</h3>
            <div className="flex gap-6 justify-center">
              <a 
                href="https://github.com/hhydraaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white opacity-80 hover:opacity-100 hover:text-zinc-400 transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/batuhan13485" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white opacity-80 hover:opacity-100 hover:text-zinc-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 