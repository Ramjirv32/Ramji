import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/app/components/SmoothScroll";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ramji - Full-Stack Developer",
  description: "Full-Stack Developer | Automation Enthusiast | AI Integrator",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: '460x460' },
    ],
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: "Momo Trust Display";
              src: url("/Momo_Trust_Display/MomoTrustDisplay-Regular.ttf") format("truetype");
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            .momo-trust-display-regular {
              font-family: "Momo Trust Display", sans-serif;
              font-weight: 400;
              font-style: normal;
            }
            html {
              overflow-x: hidden;
              max-width: 100vw;
              scroll-behavior: smooth;
            }
            body {
              font-family: "Momo Trust Display", sans-serif;
              background-color: #030014 !important;
              overflow-x: hidden;
              max-width: 100vw;
              position: relative;
              min-height: 100vh;
            }
            * {
              box-sizing: border-box;
            }
            .hero-section {
              min-height: 100vh;
            }
            nav {
              z-index: 50;
            }
          `
        }} />
        
        {/* Preload deferred stylesheet and allow noscript fallback */}
        <link rel="preload" href="/non-critical.css" as="style" />
        <link rel="stylesheet" href="/non-critical.css" media="print" id="non-critical-css" />
        <noscript>
          <link rel="stylesheet" href="/non-critical.css" />
        </noscript>
      </head>
      <body className="momo-trust-display-regular antialiased overflow-x-hidden">
        <SmoothScroll>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </SmoothScroll>
        
        {/* Activate deferred stylesheet after hydration */}
        <Script id="load-non-critical-css" strategy="afterInteractive">
          {`
            const link = document.getElementById('non-critical-css');
            if (link) {
              link.media = 'all';
            }
          `}
        </Script>
      </body>
    </html>
  );
}
