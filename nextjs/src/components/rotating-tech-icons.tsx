"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaPython, FaGitAlt, FaJenkins } from 'react-icons/fa';
import { SiKubernetes, SiMongodb, SiTypescript, SiNextdotjs, SiArgo, SiGrafana, SiTerraform } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';

const technologies = [
  { name: 'React', icon: <FaReact size={24} />, color: '#61DAFB' },
  { name: 'TypeScript', icon: <SiTypescript size={24} />, color: '#3178C6' },
  { name: 'Next.js', icon: <SiNextdotjs size={24} />, color: '#FFFFFF' },
  { name: 'Node.js', icon: <FaNodeJs size={24} />, color: '#339933' },
  { name: 'Python', icon: <FaPython size={24} />, color: '#3776AB' },
  { name: 'Docker', icon: <FaDocker size={24} />, color: '#2496ED' },
  { name: 'Kubernetes', icon: <SiKubernetes size={24} />, color: '#326CE5' },
  { name: 'AWS', icon: <FaAws size={24} />, color: '#FF9900' },
  { name: 'Azure', icon: <TbBrandAzure size={24} />, color: '#0078D4' },
  { name: 'Jenkins', icon: <FaJenkins size={24} />, color: '#D24939' },
//   { name: 'ArgoCD', icon: <SiArgo size={24} />, color: '#EF7B4D' },
//   { name: 'Terraform', icon: <SiTerraform size={24} />, color: '#7B42BC' },
//   { name: 'Grafana', icon: <SiGrafana size={24} />, color: '#F46800' },
  { name: 'MongoDB', icon: <SiMongodb size={24} />, color: '#47A248' },
  { name: 'Git', icon: <FaGitAlt size={24} />, color: '#F05032' },
];

const RotatingTechIcons = () => {
  return (
    <div className="w-full relative flex justify-center items-center mt-32">
      <div className="relative w-full h-[500px] md:h-[600px]">
        {/* Subtle glow effect */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl z-0 w-80 h-80 md:w-96 md:h-96"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 0 60px rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Rotating icons */}
        <div className="absolute inset-0">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="absolute w-14 h-14 md:w-20 md:h-20 bg-zinc-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:bg-zinc-800 border border-zinc-700"
              style={{
                left: '50%',
                top: '50%',
                animation: `rotate-icon 20s linear infinite`,
                animationDelay: `${-index * (20 / technologies.length)}s`,
                transformOrigin: 'center',
              }}
              title={tech.name}
            >
              <div className="transform scale-90 md:scale-110" style={{ color: tech.color }}>
                {tech.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Center icon display - Code symbol */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-44 md:h-44 rounded-full bg-zinc-900/50 backdrop-blur-md border-2 border-zinc-700 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="text-4xl md:text-6xl mb-1 text-white font-mono">
              {"</>"}
            </div>
            <div className="text-xs md:text-sm text-zinc-400 font-mono">
              DevOps & MLOps
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate-icon {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(220px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(220px) rotate(-360deg);
          }
        }

        @media (min-width: 768px) {
          @keyframes rotate-icon {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateX(280px) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateX(280px) rotate(-360deg);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default RotatingTechIcons;
