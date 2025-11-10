"use client"

import React, { useRef, useState, useEffect } from "react";
import { FaSearch, FaDownload, FaGraduationCap, FaQuoteRight, FaExternalLinkAlt, FaShieldAlt } from 'react-icons/fa';
import { gsap } from "gsap";

const Research: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const patents = [
    {
      id: 1,
      title: "AI-Powered Smart Parking System Enhancing Convenience and Security with Web IoT and Cloud Technologies",
      patentNumber: "202441093238 A",
      inventors: ["Dr. Premkumar D", "Munirathinam T", "S. Ramasami", "Karthik S", "Pranav V M", "Navaneethakrishnan M V", "Ramji B"],
      filingDate: "November 28, 2024",
      issueDate: "December 6, 2024",
      abstract: "A smart parking system leveraging AI, IoT, cloud, and web technologies to optimize parking efficiency and security. The system integrates React.js (frontend) and Node.js (backend), with Firebase authentication and FastAPI-based microservices. Key innovations include number plate recognition using Tesseract OCR and automated gate access, creating a secure and user-friendly parking experience.",
      type: "patent",
      category: ["IoT & Smart Systems"],
      image: "/assets/research/smart-parking-patent.webp",
      bgColor: "from-blue-500/20 to-purple-500/20",
      label: "Patent",
      color: "#060010",
      description: "Smart Parking System with AI-based License Plate Recognition"
    }
  ];

  const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
  });

  const updateCardGlowProperties = (
    card: HTMLElement,
    mouseX: number,
    mouseY: number,
    glow: number,
    radius: number
  ) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty("--glow-x", `${relativeX}%`);
    card.style.setProperty("--glow-y", `${relativeY}%`);
    card.style.setProperty("--glow-intensity", glow.toString());
    card.style.setProperty("--glow-radius", `${radius}px`);
  };

  useEffect(() => {
    if (!gridRef.current || isMobile) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(0, 191, 255, 0.15) 0%,
        rgba(0, 191, 255, 0.08) 15%,
        rgba(0, 191, 255, 0.04) 25%,
        rgba(0, 191, 255, 0.02) 40%,
        rgba(0, 191, 255, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlight || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".magic-card");

      if (!mouseInside) {
        gsap.to(spotlight, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const spotlightRadius = 300;
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlight?.parentNode?.removeChild(spotlight);
    };
  }, [gridRef, isMobile]);

  return (
    <section id="research" className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#030014] to-[#080324]">
      <style>{`
        .magic-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --border-color: rgba(0, 191, 255, 0.3);
          --background-dark: #060010;
          --white: hsl(0, 0%, 100%);
        }
        
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(0, 191, 255, calc(var(--glow-intensity) * 0.8)) 0%,
              rgba(0, 191, 255, calc(var(--glow-intensity) * 0.4)) 30%,
              transparent 60%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .magic-card:hover::after {
          opacity: 1;
        }
        
        .magic-card:hover {
          box-shadow: 0 4px 20px rgba(0, 191, 255, 0.2), 0 0 30px rgba(0, 191, 255, 0.2);
        }
        
        .particle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(0, 191, 255, 0.2);
          border-radius: 50%;
          z-index: -1;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .float {
          animation: float 4s ease-in-out infinite;
        }
        
        .float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .patent-highlight {
          position: relative;
        }
        
        .patent-highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(0, 191, 255, 0.1), 
            transparent 60%);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .patent-highlight:hover::before {
          opacity: 1;
        }
        
        .bento-section {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
          padding: 1.5rem 0;
        }
        
        @media (min-width: 768px) {
          .bento-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center mb-4">
            <FaGraduationCap className="text-3xl md:text-4xl text-[#00BFFF] mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Research & <span className="text-[#00BFFF]">Patents</span>
            </h1>
          </div>
          <p className="text-gray-400 text-center max-w-3xl mt-4">
            Innovations and intellectual property contributing to the advancement of technology
          </p>
        </div>

        <div className="bento-section" ref={gridRef}>
          {/* Patent Card with Magic Bento Style */}
          <div className="patent-highlight w-full h-full">
            <div 
              className="magic-card card--border-glow bg-[#060010] text-white border border-[#00BFFF]/30 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-[#00BFFF]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-[#00BFFF]/30">
                  Patent
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 md:w-full md:h-auto aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center overflow-hidden border border-[#00BFFF]/30 float">
                      <FaShieldAlt className="text-6xl text-[#00BFFF]" />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-white mb-3">AI-Powered Smart Parking System Enhancing Convenience and Security with Web IoT and Cloud Technologies</h2>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="bg-[#00BFFF]/10 px-3 py-1 rounded-full text-sm border border-[#00BFFF]/30">
                        <span className="text-gray-400">Patent #: </span>
                        <span className="text-white">202441093238 A</span>
                      </div>
                      <div className="bg-[#00BFFF]/10 px-3 py-1 rounded-full text-sm border border-[#00BFFF]/30">
                        <span className="text-gray-400">Filed: </span>
                        <span className="text-white">November 28, 2024</span>
                      </div>
                      <div className="bg-[#00BFFF]/10 px-3 py-1 rounded-full text-sm border border-[#00BFFF]/30">
                        <span className="text-gray-400">Published: </span>
                        <span className="text-white">December 6, 2024</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-400 mb-2">
                        <span className="text-[#00BFFF]">Inventors: </span>
                        Dr. Premkumar D, Munirathinam T, S. Ramasami, Karthik S, Pranav V M, Navaneethakrishnan M V, Ramji B
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-[#00BFFF]/20 text-[#00BFFF] text-xs px-3 py-1 rounded-full">
                        Smart Parking
                      </span>
                      <span className="bg-[#00BFFF]/20 text-[#00BFFF] text-xs px-3 py-1 rounded-full">
                        AI/ML
                      </span>
                      <span className="bg-[#00BFFF]/20 text-[#00BFFF] text-xs px-3 py-1 rounded-full">
                        IoT
                      </span>
                      <span className="bg-[#00BFFF]/20 text-[#00BFFF] text-xs px-3 py-1 rounded-full">
                        OCR
                      </span>
                    </div>
                    
                    <div className="flex justify-start gap-3">
                      <a 
                        href="/assets/research/smart-parking-patent.pdf" 
                        className="flex items-center px-4 py-2 bg-[#00BFFF] hover:bg-[#1E90FF] text-white rounded-full text-sm transition-colors duration-300"
                      >
                        <FaDownload className="mr-2" /> Download Patent
                      </a>
                      <a 
                        href="https://ipindiaservices.gov.in/publicsearch" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="mr-2" /> View Patent
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Patent Description */}
          <div className="patent-highlight">
            <div className="magic-card card--border-glow bg-[#060010] text-white border border-[#00BFFF]/30 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <FaQuoteRight className="text-[#00BFFF] mr-2" />
                  <h4 className="text-lg font-semibold text-white">Abstract</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  A smart parking system leveraging AI, IoT, cloud, and web technologies to optimize parking efficiency and security. 
                  The system integrates React.js (frontend) and Node.js (backend), with Firebase authentication and FastAPI-based microservices. 
                  Key innovations include number plate recognition using Tesseract OCR and automated gate access, creating a secure and 
                  user-friendly parking experience.
                </p>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-3">System Architecture</h4>
              
              <div className="bg-[#151030]/80 backdrop-blur-sm rounded-lg p-4 mb-6">
                <h5 className="font-medium text-[#00BFFF] mb-2">Stage 1: User Interface</h5>
                <p className="text-sm text-gray-300 mb-2">React.js frontend with Firebase authentication allowing users to search and book parking spots.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">React.js</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Firebase Auth</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Node.js</span>
                </div>
              </div>
              
              <div className="bg-[#151030]/80 backdrop-blur-sm rounded-lg p-4 mb-6">
                <h5 className="font-medium text-[#00BFFF] mb-2">Stage 2: Backend Services</h5>
                <p className="text-sm text-gray-300 mb-2">Node.js backend with FastAPI-based microservices for handling bookings and payments.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">FastAPI</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Microservices</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Cloud Integration</span>
                </div>
              </div>
              
              <div className="bg-[#151030]/80 backdrop-blur-sm rounded-lg p-4">
                <h5 className="font-medium text-[#00BFFF] mb-2">Stage 3: AI & IoT Integration</h5>
                <p className="text-sm text-gray-300 mb-2">Tesseract OCR-powered number plate recognition system with automated gate access control.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Tesseract OCR</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">IoT Sensors</span>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">Automated Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed">
            This patent represents a significant innovation in the field of smart parking systems, 
            combining AI, web technologies, and IoT to enhance convenience and security in parking facilities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Research;