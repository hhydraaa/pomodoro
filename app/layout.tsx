import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ADSENSE_CONFIG } from "./config/adsense";

import { LocaleProvider } from "./context/LocaleContext";
import { PomodoroProvider } from "./context/PomodoroContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomodoro - Modern Pomodoro Timer",
  description: "A modern, customizable Pomodoro timer to boost your productivity",
  other: {
    'google-adsense-account': ADSENSE_CONFIG.client,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {ADSENSE_CONFIG.isEnabled && (
          <>
            {/* Google AdSense Doğrulama Meta Etiketi */}
            <meta name="google-adsense-account" content={ADSENSE_CONFIG.client} />
            
            {/* Google AdSense */}
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
            {/* AdSense Auto Ads Kodu */}
            <Script
              id="adsbygoogle-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${ADSENSE_CONFIG.client}",
                    enable_page_level_ads: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100 min-h-screen`}
      >
        <LocaleProvider>
          <PomodoroProvider>
            {children}
          </PomodoroProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
