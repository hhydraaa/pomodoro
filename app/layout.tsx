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
    google: ADSENSE_CONFIG.getClient(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = ADSENSE_CONFIG.getClient();
  
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {ADSENSE_CONFIG.isEnabled && (
          <>
            <meta name="google-adsense-account" content={adsenseClient} />
            <meta name="google-site-verification" content={adsenseClient} />
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
                id="adsense-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    (function() {
                      const script = document.createElement('script');
                      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}';
                      script.async = true;
                      script.crossOrigin = 'anonymous';
                      document.head.appendChild(script);
                    })();
                  `
                }}
              />
            )}
          </PomodoroProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
