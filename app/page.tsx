'use client';

import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PomodoroTimer from './components/PomodoroTimer';
import BackgroundManager from './components/backgrounds/BackgroundManager';

export default function Home() {
  useEffect(() => {
    try {
      // @ts-expect-error - AdSense global window object
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // @ts-expect-error - AdSense global window object
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background */}
      <BackgroundManager />
      
      {/* Sol Reklam */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-client="ca-pub-3562568083054797"
          data-ad-slot="AUTO"
          data-ad-format="vertical"
          data-full-width-responsive="false">
        </ins>
      </div>

      {/* Sağ Reklam */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-client="ca-pub-3562568083054797"
          data-ad-slot="AUTO"
          data-ad-format="vertical"
          data-full-width-responsive="false">
        </ins>
      </div>
      
      {/* Content */}
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          <PomodoroTimer />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
