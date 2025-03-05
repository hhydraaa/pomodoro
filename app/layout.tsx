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
  metadataBase: new URL('https://pomodoro-hhydraaa.vercel.app'),
  verification: {
    google: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'your-adsense-client-id',
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
            <meta name="google-adsense-account" content={ADSENSE_CONFIG.client} />
            <meta name="google-site-verification" content={ADSENSE_CONFIG.client} />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100 min-h-screen`}
      >
        <LocaleProvider>
          <PomodoroProvider>
            {children}
            {ADSENSE_CONFIG.isEnabled && (
              <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`}
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />
            )}
          </PomodoroProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
