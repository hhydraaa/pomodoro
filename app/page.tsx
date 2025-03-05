'use client';

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PomodoroTimer from './components/PomodoroTimer';
import BackgroundManager from './components/backgrounds/BackgroundManager';
import Script from 'next/script';
import { ADSENSE_CONFIG } from './config/adsense';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background */}
      <BackgroundManager />
      
      {/* Sol Reklam */}
      {ADSENSE_CONFIG.isEnabled && (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '160px', height: '600px' }}
            data-ad-client={ADSENSE_CONFIG.client}
            data-ad-slot="AUTO"
            data-ad-format="vertical"
            data-full-width-responsive="false">
          </ins>
          <Script id="adsbygoogle-left">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>
      )}

      {/* Sağ Reklam */}
      {ADSENSE_CONFIG.isEnabled && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '160px', height: '600px' }}
            data-ad-client={ADSENSE_CONFIG.client}
            data-ad-slot="AUTO"
            data-ad-format="vertical"
            data-full-width-responsive="false">
          </ins>
          <Script id="adsbygoogle-right">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>
      )}
      
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
