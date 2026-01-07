"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaPython, FaGitAlt, FaJenkins } from 'react-icons/fa';
import { SiKubernetes, SiMongodb, SiTypescript, SiNextdotjs, SiArgo, SiGrafana, SiTerraform } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';

const technologies = [
  { name: 'React', icon: <FaReact size={24} />, color: '#61DAFB' },
  { name: 'TypeScript', icon: <SiTypescript size={24} />, color: '#3178C6' },
  { name: 'Next.js', icon: <SiNextdotjs size={24} />, color: '#000000' },
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
    <div className="w-full relative flex justify-center items-center mt-0 sm:mt-8 md:mt-16 lg:mt-32">
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        {/* Subtle glow effect */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl z-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
          style={{
            background: "rgba(0, 0, 0, 0.03)",
            boxShadow: "0 0 60px rgba(0, 0, 0, 0.05)",
          }}
        />

        {/* Rotating icons */}
        <div className="absolute inset-0">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="absolute w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-20 xl:h-20 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-zinc-900 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:bg-white border border-zinc-200 shadow-sm"
              style={{
                left: '50%',
                top: '50%',
                animation: `rotate-icon 20s linear infinite`,
                animationDelay: `${-index * (20 / technologies.length)}s`,
                transformOrigin: 'center',
              }}
              title={tech.name}
            >
              <div className="transform scale-95 sm:scale-75 md:scale-90 lg:scale-100 xl:scale-110" style={{ color: tech.color }}>
                {tech.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Center icon display - Code symbol */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-44 xl:h-44 rounded-full bg-white/80 backdrop-blur-md border-2 border-zinc-100 flex items-center justify-center z-20 shadow-sm">
          <div className="text-center">
            <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl mb-0.5 sm:mb-1 text-zinc-950 font-mono">
              {"</>"}
            </div>
            <div className="text-[12px] sm:text-[10px] md:text-xs lg:text-sm text-zinc-500 font-mono">
              DevOps & MLOps
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate-icon {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @media (min-width: 640px) {
          @keyframes rotate-icon {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
            }
          }
        }

        @media (min-width: 768px) {
          @keyframes rotate-icon {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateX(160px) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateX(160px) rotate(-360deg);
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes rotate-icon {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateX(220px) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateX(220px) rotate(-360deg);
            }
          }
        }

        @media (min-width: 1280px) {
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
