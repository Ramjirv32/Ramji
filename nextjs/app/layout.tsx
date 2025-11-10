import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/app/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramji",
  description: "Full-Stack Developer | Automation Enthusiast | AI Integrator",
  icons: {
    icon: '/favicon.ico', // Add your custom favicon path here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} momo-trust-display-regular antialiased overflow-x-hidden`}
      >
        <SmoothScroll>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
