"use client";

import React, { useCallback, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";

interface ScrollContextType {
  handleClick: (targetId: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a SmoothScroll provider");
  }
  return context;
};

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  const handleClick = useCallback((targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement && lenisRef.current) {
      lenisRef.current.scrollTo(targetElement);
    }
  }, []);

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
    }

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ handleClick }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default SmoothScroll;
