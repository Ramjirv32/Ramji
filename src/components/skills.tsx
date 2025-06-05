"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaGit, 
  FaGithub, 
  FaJava, 
  FaLinux 
} from "react-icons/fa";
import { 
  SiTypescript, 

  SiTailwindcss, 

  SiExpress, 
  SiMongodb, 

  SiPostgresql, 
 
  SiVercel, 
  SiPostman, 
  
  
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RxShadowNone } from "react-icons/rx";
// import { PiCubeFocus } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20" data-aos="fade-up">
      <div className="flex flex-col items-center justify-center">
        {/* Black 3D flower/shape image */}
        <img
          src="/tech.png" 
          alt="Abstract 3D shape" 
          width={300} 
          height={200} 
          className="mb-4"
          data-aos="zoom-in"
          data-aos-delay="200"
        />
        
        <h4 
          className="text-gray-400 text-center text-sm tracking-widest uppercase mb-2"
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          I CONSTANTLY TRY TO IMPROVE
        </h4>
        
        <h2 
          className="text-white text-center text-5xl md:text-6xl font-bold"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          My Tech Stack
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl px-4">
        {/* Row 1 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#E44D26] hover:shadow-[0_0_15px_rgba(228,77,38,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <span className="text-[#E44D26] group-hover:animate-bounce"><FaHtml5 size={20} /></span>
          <span className="group-hover:text-[#E44D26]">HTML</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#1572B6] hover:shadow-[0_0_15px_rgba(21,114,182,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="text-[#1572B6] group-hover:animate-bounce"><FaCss3Alt size={20} /></span>
          <span className="group-hover:text-[#1572B6]">CSS</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#F7DF1E] hover:shadow-[0_0_15px_rgba(247,223,30,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <span className="text-[#F7DF1E] group-hover:animate-bounce"><FaJs size={20} /></span>
          <span className="group-hover:text-[#F7DF1E]">JavaScript</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#3178C6] hover:shadow-[0_0_15px_rgba(49,120,198,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in" 
          data-aos-delay="400"
        >
          <span className="text-[#3178C6] group-hover:animate-bounce"><SiTypescript size={18} /></span>
          <span className="group-hover:text-[#3178C6]">TypeScript</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#61DAFB] hover:shadow-[0_0_15px_rgba(97,218,251,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <span className="text-[#61DAFB] group-hover:animate-bounce"><FaReact size={20} /></span>
          <span className="group-hover:text-[#61DAFB]">ReactJS</span>
        </motion.div>
        
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <span className="text-white group-hover:animate-bounce"><SiNextdotjs size={20} /></span>
          <span className="group-hover:text-white">NextJS</span>
        </motion.div> */}
        
        {/* Continue with the same pattern for all remaining technologies */}
        {/* Row 2 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          <span className="text-[#38bdf8] group-hover:animate-bounce"><SiTailwindcss size={20} /></span>
          <span className="group-hover:text-[#38bdf8]">Tailwind CSS</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#0055FF] hover:shadow-[0_0_15px_rgba(0,85,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          <span className="text-[#0055FF] group-hover:animate-bounce"><TbBrandFramerMotion size={20} /></span>
          <span className="group-hover:text-[#0055FF]">Framer Motion</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="900"
        >
          <span className="text-white group-hover:animate-bounce"><RxShadowNone size={20} /></span>
          <span className="group-hover:text-white">Shadcn</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#339933] hover:shadow-[0_0_15px_rgba(51,153,51,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1000"
        >
          <span className="text-[#339933] group-hover:animate-bounce"><FaNodeJs size={20} /></span>
          <span className="group-hover:text-[#339933]">NodeJS</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1100"
        >
          <span className="text-white group-hover:animate-bounce"><SiExpress size={20} /></span>
          <span className="group-hover:text-white">ExpressJS</span>
        </motion.div>
        
        {/* Row 3 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#47A248] hover:shadow-[0_0_15px_rgba(71,162,72,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1200"
        >
          <span className="text-[#47A248] group-hover:animate-bounce"><SiMongodb size={20} /></span>
          <span className="group-hover:text-[#47A248]">MongoDB</span>
        </motion.div>
        
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#4479A1] hover:shadow-[0_0_15px_rgba(68,121,161,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1300"
        >
          <span className="text-[#4479A1] group-hover:animate-bounce"><SiMysql size={20} /></span>
          <span className="group-hover:text-[#4479A1]">MySQL</span>
        </motion.div>
         */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#336791] hover:shadow-[0_0_15px_rgba(51,103,145,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1400"
        >
          <span className="text-[#336791] group-hover:animate-bounce"><SiPostgresql size={20} /></span>
          <span className="group-hover:text-[#336791]">PostgreSQL</span>
        </motion.div>
        
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#5A67D8] hover:shadow-[0_0_15px_rgba(90,103,216,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1500"
        >
          <span className="text-[#5A67D8] group-hover:animate-bounce"><SiPrisma size={20} /></span>
          <span className="group-hover:text-[#5A67D8]">Prisma</span>
        </motion.div> */}
        
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#FF5A5F] hover:shadow-[0_0_15px_rgba(255,90,95,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1600"
        >
          <span className="text-[#FF5A5F] group-hover:animate-bounce"><PiCubeFocus size={20} /></span>
          <span className="group-hover:text-[#FF5A5F]">Zustand</span>
        </motion.div> */}
{/*         
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#3068B7] hover:shadow-[0_0_15px_rgba(48,104,183,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1700"
        >
          <span className="text-[#3068B7] group-hover:animate-bounce"><SiZod size={20} /></span>
          <span className="group-hover:text-[#3068B7]">Zod</span>
        </motion.div> */}
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#F05032] hover:shadow-[0_0_15px_rgba(240,80,50,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1800"
        >
          <span className="text-[#F05032] group-hover:animate-bounce"><FaGit size={20} /></span>
          <span className="group-hover:text-[#F05032]">Git</span>
        </motion.div>
        
        {/* Row 4 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="1900"
        >
          <span className="text-white group-hover:animate-bounce"><FaGithub size={20} /></span>
          <span className="group-hover:text-white">GitHub</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="2000"
        >
          <span className="text-white group-hover:animate-bounce"><SiVercel size={20} /></span>
          <span className="group-hover:text-white">Vercel</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#FF6C37] hover:shadow-[0_0_15px_rgba(255,108,55,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="2100"
        >
          <span className="text-[#FF6C37] group-hover:animate-bounce"><SiPostman size={20} /></span>
          <span className="group-hover:text-[#FF6C37]">Postman</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#007396] hover:shadow-[0_0_15px_rgba(0,115,150,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="2200"
        >
          <span className="text-[#007396] group-hover:animate-bounce"><FaJava size={20} /></span>
          <span className="group-hover:text-[#007396]">Java</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#FCC624] hover:shadow-[0_0_15px_rgba(252,198,36,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="2300"
        >
          <span className="text-[#FCC624] group-hover:animate-bounce"><FaLinux size={20} /></span>
          <span className="group-hover:text-[#FCC624]">Linux</span>
        </motion.div>
{/*         
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white hover:border-[#F69220] hover:shadow-[0_0_15px_rgba(246,146,32,0.5)] transform transition-all duration-300 hover:scale-110 group"
          whileHover={{ y: -5 }}
          data-aos="zoom-in"
          data-aos-delay="2400"
        >
          <span className="text-[#F69220] group-hover:animate-bounce"><SiPnpm size={20} /></span>
          <span className="group-hover:text-[#F69220]">pnpm</span>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Skills;