"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../utils/motion";
import { FaHtml5, FaReact, FaCss3Alt, FaJsSquare, FaNodeJs, FaServer, FaAws, FaFire } from 'react-icons/fa';
import AOS from 'aos';
import "./styles/home.css";

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

const HeroContent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
      });
    }
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 m6 w-full z-[20] mt-[100px]"
    >
      {/* Technology icons section - NOW FIRST */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full relative flex justify-center items-center mb-16"
      >
        <div className="relative w-full h-[20rem] md:h-[30rem]">
          <div className="absolute inset-0  rounded-full opacity-30 blur-3xl"></div>
          
          {/* Technology icons rotating around */}
          <div className="absolute inset-0">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="absolute w-8 h-8 md:w-14 md:h-14 bg-gray-800 rounded-lg flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-110  hover:text-white hover:bg-white/5]"
                style={{
                  left: '50%',
                  top: '50%',
                  animation: `rotate-icon 20s linear infinite`,
                  animationDelay: `${-index * (20 / technologies.length)}s`,
                  transformOrigin: 'center'
                }}
              >
                <div className="transform scale-75 md:scale-100">
                  {tech.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center">
            <video 
              src="/b.webm" 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Content section - NOW SECOND */}
      <div className="flex flex-col gap-5 justify-center items-center text-center max-w-4xl mx-auto">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center rounded-full w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#b49bff] mr-[10px] h-5 w-5">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
          </svg>
          <h1 className="Welcome-text text-[13px] text-white">
            Hey I'm Ramji
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold w-auto h-auto text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
            Fullstack Developer
          </span>
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
          className="py-2 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-center text-white cursor-pointer rounded-lg w-[200px] mb-8 hover:scale-105 transition-transform"
        >
          Let's Connect
        </motion.a>
      </div>
    </motion.div>
  );
};

export default HeroContent;