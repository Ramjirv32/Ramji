"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { FaHtml5, FaReact, FaCss3Alt, FaJsSquare, FaNodeJs, FaServer, FaAws, FaFire } from 'react-icons/fa';
import './Hero.css';

const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.8 }
  }
};

const slideInFromLeft = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay, duration: 0.8 }
  }
});

const slideInFromRight = (delay: number) => ({
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay, duration: 0.8 }
  }
});

const technologies = [
  { name: 'HTML', icon: <FaHtml5 size={24} /> },
  { name: 'React', icon: <FaReact size={24} /> },
  { name: 'CSS', icon: <FaCss3Alt size={24} /> },
  { name: 'JavaScript', icon: <FaJsSquare size={24} /> },
  { name: 'Node.js', icon: <FaNodeJs size={24} /> },
  { name: 'Express', icon: <FaServer size={24} /> },
  { name: 'AWS', icon: <FaAws size={24} /> },
  { name: 'Firebase', icon: <FaFire size={24} /> },
];

const Hero = () => {
  useEffect(() => {
    // Dynamically import AOS only when component mounts
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      });
    }
  }, []);

  return (
    <motion.div
      id="hero" 
      className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 mt-6 w-full relative pt-[80px] sm:pt-[100px] pb-12 sm:pb-16 hero-section"
      initial="hidden"
      animate="visible"
    >
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full relative flex justify-center items-center mb-16"
        >
          <div className="relative w-full h-[25rem] md:h-[35rem] mt-[100px]">
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl z-10 w-64 h-64 md:w-80 md:h-80"
              style={{
                background: "rgba(0, 191, 255, 0.3)",
                boxShadow: "0 0 60px rgba(0, 191, 255, 0.8)",
              }}
            />

            <div className="absolute inset-0">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className="absolute w-8 h-8 md:w-14 md:h-14 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                  style={{
                    left: '50%',
                    top: '50%',
                    animation: `rotate-icon 20s linear infinite`,
                    animationDelay: `${-index * (20 / technologies.length)}s`,
                    transformOrigin: 'center',
                    border: '1px solid rgba(0, 191, 255, 0.6)'
                  }}
                >
                  <div className="transform scale-75 md:scale-100">
                    {tech.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center z-20">
              <div
                className="absolute inset-[-20px] rounded-full blur-3xl animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(0, 191, 255, 0.4) 0%, rgba(0, 191, 255, 0.2) 50%, transparent 80%)",
                  animationDuration: "3s"
                }}
              />
              <div
                className="absolute inset-[-15px] rounded-full blur-2xl animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, rgba(30, 144, 255, 0.1) 60%, transparent 90%)",
                  animationDuration: "2.5s",
                  animationDelay: "1s"
                }}
              />
              <div
                className="absolute inset-[-10px] rounded-full blur-xl animate-pulse"
                style={{
                  background: "rgba(0, 191, 255, 0.2)",
                  animationDuration: "2s",
                  animationDelay: "0.5s"
                }}
              />
              
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 60px rgba(0, 191, 255, 0.8), inset 0 0 30px rgba(0, 191, 255, 0.3), 0 0 100px rgba(30, 144, 255, 0.6)",
                  border: "2px solid rgba(0, 191, 255, 0.6)"
                }}
              />
              
              <Image
                src="/h/j1.webp" 
                alt="Ramji - Full Stack Developer"
                width={256}
                height={256}
                priority
                quality={85}
                className="w-full h-full object-cover relative z-10 rounded-full"
                sizes="(max-width: 768px) 128px, 256px"
              />
              
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  boxShadow: "inset 0 0 20px rgba(0, 191, 255, 0.2)"
                }}
              />
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col gap-5 justify-center items-center text-center max-w-4xl mx-auto ">
          <motion.div
            variants={slideInFromTop}
            className="animate-bounce Welcome-box py-[8px] px-[7px] border border-[#00BFFF]/50 opacity-[0.9] flex items-center rounded-full w-fit "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#00BFFF] mr-[10px] h-5 w-5">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
            </svg>
            <h1 className="Welcome-text text-[13px] text-white">
              Hey I'm Ramji
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 font-bold w-auto h-auto text-center"
          >
            <h1 className="hero-main-title text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] animate-pulse">
              <span className="block sm:inline">Engineering the Future with</span>
              <span className="block sm:inline"> Code, Automation & Intelligence</span>
            </h1>
          </motion.div>

          <motion.h2
            variants={slideInFromLeft(0.6)}
            className="text-xl md:text-4xl font-semibold text-white"
          >
            I build things for the web.
          </motion.h2>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-3xl text-center"
          >
            I'm a Full Stack Software Engineer with experience in Website Development. Check out my projects below.
          </motion.p>
          
          <motion.a
            variants={slideInFromLeft(1)}
            className="py-2 px-6 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-center text-white cursor-pointer rounded-lg w-[200px] mb-8 hover:scale-105 transition-transform"
          >
            Let's Connect
          </motion.a>
        </div>
      </motion.div>
  );
};

export default Hero;