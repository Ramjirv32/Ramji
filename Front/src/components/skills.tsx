"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaGit, 
  FaGithub, 
  FaJava, 
  FaLinux,
  FaPython,
  FaDocker,
  FaAws,
  FaAngular,
  FaVuejs,
  FaPhp,
  FaSass,
  FaBootstrap,
  FaFigma,
  FaJenkins,
  FaStripe,
  FaWordpress
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiVercel, 
  SiPostman, 
  SiPrisma,
  SiC,
  SiRust,
  SiGo,
  SiKotlin,
  SiSwift,
  SiDart,
  SiFlutter,
  SiFirebase,
  SiRedis,
  SiMysql,
  SiGraphql,
  SiElasticsearch,
  SiKubernetes,
  SiTerraform,
  SiDjango,
  SiCloudflare,
  SiNextdotjs,
  SiNestjs,
  SiSpring,
  SiDotnet,
  SiSvelte,
  SiJest,
  SiCypress,
  SiWebpack,
  SiVite,
  SiSupabase,
  SiRedux,
  SiWebgl,
  SiFastapi
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RxShadowNone } from "react-icons/rx";
import { IoLogoJavascript } from "react-icons/io5";
import { DiJqueryLogo } from "react-icons/di";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';

// Interface for the skills data from the backend
interface SkillsData {
  id: number;
  created_at: string;
  s: string[];
}

// Extended mapping for skill names to their icons and colors
const skillIconsMap: Record<string, { icon: React.ReactElement; color: string }> = {
  // Front-end
  "HTML": { icon: <FaHtml5 size={20} />, color: "#E44D26" },
  "CSS": { icon: <FaCss3Alt size={20} />, color: "#1572B6" },
  "JavaScript": { icon: <FaJs size={20} />, color: "#F7DF1E" },
  "TypeScript": { icon: <SiTypescript size={18} />, color: "#3178C6" },
  "Cloudflare": { icon: <SiCloudflare size={20} />, color: "#F38020" },
  "ReactJS": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "React": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "fastapi": { icon: <SiFastapi size={20} />, color: "#009688" },
  "FastAPI": { icon: <SiFastapi size={20} />, color: "#009688" },
  "Framer Motion": { icon: <TbBrandFramerMotion size={20} />, color: "#0055FF" },
  "Shadcn": { icon: <RxShadowNone size={20} />, color: "#FFFFFF" },
  "Next.js": { icon: <SiNextdotjs size={20} />, color: "#000000" },
  "Angular": { icon: <FaAngular size={20} />, color: "#DD0031" },
  "Vue.js": { icon: <FaVuejs size={20} />, color: "#4FC08D" },
  "Svelte": { icon: <SiSvelte size={20} />, color: "#FF3E00" },
  "jQuery": { icon: <DiJqueryLogo size={20} />, color: "#0769AD" },
  "Tailwind CSS": { icon: <SiTailwindcss size={20} />, color: "#38bdf8" },
  "TailwindCSS": { icon: <SiTailwindcss size={20} />, color: "#38bdf8" },
  "Bootstrap": { icon: <FaBootstrap size={20} />, color: "#7952B3" },
  "Sass": { icon: <FaSass size={20} />, color: "#CC6699" },
  "NextJs": { icon: <SiNextdotjs size={20} />, color: "#000000" },
  "Redux": { icon: <SiRedux size={20} />, color: "#764ABC" },
  "WebGL": { icon: <SiWebgl size={20} />, color: "#990000" },
  "WordPress": { icon: <FaWordpress size={20} />, color: "#21759B" },
  
  // Back-end
  "NodeJS": { icon: <FaNodeJs size={20} />, color: "#339933" },
  "Node.js": { icon: <FaNodeJs size={20} />, color: "#339933" },
  "Express": { icon: <SiExpress size={20} />, color: "#FFFFFF" },
  "ExpressJS": { icon: <SiExpress size={20} />, color: "#FFFFFF" },
  "PHP": { icon: <FaPhp size={20} />, color: "#777BB4" },
  "Django": { icon: <SiDjango size={20} />, color: "#092E20" },
  "NestJS": { icon: <SiNestjs size={20} />, color: "#E0234E" },
  "Spring": { icon: <SiSpring size={20} />, color: "#6DB33F" },
  ".NET": { icon: <SiDotnet size={20} />, color: "#512BD4" },
  
  // Databases
  "MongoDB": { icon: <SiMongodb size={20} />, color: "#47A248" },
  "PostgreSQL": { icon: <SiPostgresql size={20} />, color: "#336791" },
  "MySQL": { icon: <SiMysql size={20} />, color: "#4479A1" },
  "Redis": { icon: <SiRedis size={20} />, color: "#DC382D" },
  "GraphQL": { icon: <SiGraphql size={20} />, color: "#E10098" },
  "Elasticsearch": { icon: <SiElasticsearch size={20} />, color: "#005571" },
  "Prisma": { icon: <SiPrisma size={20} />, color: "#5A67D8" },
  "Supabase": { icon: <SiSupabase size={20} />, color: "#3ECF8E" },
  "Firebase": { icon: <SiFirebase size={20} />, color: "#FFCA28" },
  
  // Programming Languages
  "C": { icon: <SiC size={20} />, color: "#A8B9CC" },
  "Java": { icon: <FaJava size={20} />, color: "#007396" },
  "Python": { icon: <FaPython size={20} />, color: "#3776AB" },
  "Rust": { icon: <SiRust size={20} />, color: "#000000" },
  "Go": { icon: <SiGo size={20} />, color: "#00ADD8" },
  "Kotlin": { icon: <SiKotlin size={20} />, color: "#7F52FF" },
  "Swift": { icon: <SiSwift size={20} />, color: "#FA7343" },
  "Dart": { icon: <SiDart size={20} />, color: "#0175C2" },
  
  // DevOps & Tools
  "Git": { icon: <FaGit size={20} />, color: "#F05032" },
  "GitHub": { icon: <FaGithub size={20} />, color: "#FFFFFF" },
  "Docker": { icon: <FaDocker size={20} />, color: "#2496ED" },
  "Kubernetes": { icon: <SiKubernetes size={20} />, color: "#326CE5" },
  "AWS": { icon: <FaAws size={20} />, color: "#FF9900" },
  "Vercel": { icon: <SiVercel size={20} />, color: "#FFFFFF" },
  "Jenkins": { icon: <FaJenkins size={20} />, color: "#D24939" },
  "Terraform": { icon: <SiTerraform size={20} />, color: "#7B42BC" },
  "Postman": { icon: <SiPostman size={20} />, color: "#FF6C37" },
  "Linux": { icon: <FaLinux size={20} />, color: "#FCC624" },
  "Webpack": { icon: <SiWebpack size={20} />, color: "#8DD6F9" },
  "Vite": { icon: <SiVite size={20} />, color: "#646CFF" },
  "Jest": { icon: <SiJest size={20} />, color: "#C21325" },
  "Cypress": { icon: <SiCypress size={20} />, color: "#17202C" },
  
  // Mobile & Design
  "Flutter": { icon: <SiFlutter size={20} />, color: "#02569B" },
  "React Native": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "Figma": { icon: <FaFigma size={20} />, color: "#F24E1E" },
  
  // Others
  "Stripe": { icon: <FaStripe size={20} />, color: "#008CDD" },
  "API": { icon: <SiPostman size={20} />, color: "#FF6C37" },
  "AI APIs": { icon: <IoLogoJavascript size={20} />, color: "#F7DF1E" },
  "Hugging Face API": { icon: <IoLogoJavascript size={20} />, color: "#F7DF1E" },
  "IoT": { icon: <FaNodeJs size={20} />, color: "#339933" },
};

// Skill categories mapping
const skillCategories: Record<string, string[]> = {
  "Frontend": [
    "HTML", "CSS", "ReactJS", "React", "NextJS", "NextJs", 
    "Angular", "Vue.js", "Svelte", "jQuery", "Tailwind CSS", "TailwindCSS", "Bootstrap", 
    "Sass", "Redux", "WebGL", "Framer Motion", "Shadcn"
  ],
  "Backend": [
    "NodeJS", "Node.js", "Express", "ExpressJS", "PHP", "Django", "NestJS", "Spring", 
    ".NET", "fastapi", "FastAPI"
  ],
  "Languages": [
    "C", "Java", "Python", "Rust", "Go", "Kotlin", "Swift", "Dart", "JavaScript", "TypeScript","JavaScript", "TypeScript",
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Prisma", "Supabase", 
    "Firebase", "GraphQL"
  ],
  "Tools": [
    "Git", "GitHub", "Postman", "Linux", "Webpack", "Vite", "Jest", "Cypress", "Figma"
  ],
  "Cloud & Deployment": [
    "AWS", "Vercel", "Docker", "Kubernetes", "Jenkins", "Terraform", "Cloudflare"
  ],
  "CMS & Others": [
    "WordPress", "Stripe", "API", "AI APIs", "Hugging Face API", "IoT"
  ],
  "Mobile": [
    "Flutter", "React Native", "Kotlin", "Swift", "Dart"
  ]
};

const Skills = () => {
  // State for fetched skills
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSkill, setNewSkill] = useState<string>("");
  
  // New states for public skill suggestion
  const [showSuggestForm, setShowSuggestForm] = useState<boolean>(false);
  const [suggestedSkill, setSuggestedSkill] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // New state for view toggle
  const [isGridView, setIsGridView] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is admin from session storage
    const loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsAdmin(true);
    }
    
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
    
    const fetchSkills = async () => {
      try {
        // Use environment variable for API URL with the correct endpoint
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
        const response = await fetch(`${API_URL}/skills`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        
        const data: SkillsData[] = await response.json();
        
        if (data && data.length > 0 && data[0].s) {
          setSkills(data[0].s);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  // Function to categorize skills
  const categorizeSkills = () => {
    const categorized: Record<string, string[]> = {};
    
    // Initialize categories
    Object.keys(skillCategories).forEach(category => {
      categorized[category] = [];
    });
    
    // Add uncategorized for skills not in any category
    categorized["Others"] = [];
    
    skills.forEach(skill => {
      let categoryFound = false;
      
      for (const [category, categorySkills] of Object.entries(skillCategories)) {
        if (categorySkills.includes(skill)) {
          categorized[category].push(skill);
          categoryFound = true;
          break;
        }
      }
      
      if (!categoryFound) {
        categorized["Others"].push(skill);
      }
    });
    
    // Remove empty categories
    Object.keys(categorized).forEach(category => {
      if (categorized[category].length === 0) {
        delete categorized[category];
      }
    });
    
    return categorized;
  };

  // Function to add a new skill (admin mode)
  const addNewSkill = async () => {
    if (!newSkill.trim() || !isAdmin) return;
    
    // Check if skill already exists
    if (skills.includes(newSkill)) {
      alert("This skill already exists!");
      return;
    }
    
    try {
      // Add the new skill to the local state first for immediate feedback
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      
      // Send the updated skills to the backend
      const response = await fetch('http://localhost:9000/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add new skill');
      }
      
      // Reset the input
      setNewSkill('');
    } catch (error) {
      console.error('Error adding new skill:', error);
      alert('Failed to add new skill. Please try again.');
    }
  };

  // Function to add skill from suggestion form
  const addSkill = async () => {
    if (!suggestedSkill.trim() || !isAdmin) return;
    
    try {
      setSubmitting(true);
      
      // Add the new skill to the local state for immediate feedback
      const updatedSkills = [...skills, suggestedSkill];
      
      // Send the updated skills to the backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
      const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add new skill');
      }
      
      setSkills(updatedSkills);
      setSuggestedSkill('');
      setShowSuggestForm(false);
      setSuccessMessage('Skill added successfully!');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding new skill:', error);
      alert('Failed to add skill. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const categorizedSkills = categorizeSkills();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20" data-aos="fade-up">
      <div className="flex flex-col items-center justify-center">
        {/* Black 3D flower/shape image */}
        <img
          src="/earth1.png" 
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

      {/* View Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIsGridView(true)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            isGridView 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white shadow-lg' 
              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            !isGridView 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white shadow-lg' 
              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500'
          }`}
        >
          Normal View
        </button>
      </div>
      
      {/* Success message */}
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {successMessage}
        </div>
      )}
      
      {/* Public suggestion form (only shown to admins) */}
      {isAdmin && showSuggestForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-4 mb-6 w-full max-w-md"
        >
          <h3 className="text-lg font-semibold mb-3 text-white">Add New Skill</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={suggestedSkill}
              onChange={(e) => setSuggestedSkill(e.target.value)}
              className="bg-gray-900/80 border border-blue-700/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter skill name (e.g., React, Python)"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSuggestForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={addSkill}
                disabled={submitting || !suggestedSkill.trim()}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center ${
                  submitting || !suggestedSkill.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <IconContext.Provider value={{ className: "icon" }}>
            <div className="w-full max-w-7xl px-4">
              {isGridView ? (
                // Grid View - Show categories
                Object.entries(categorizedSkills).map(([category, categorySkills], categoryIndex) => (
                  <div key={category} className="mb-12">
                    <div className="relative mb-8">
                      {/* Enhanced background with gradient and glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-lg blur-xl"></div>
                      <div className="relative bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-lg p-4">
                        <h3 className="text-white text-2xl font-bold text-left bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {category}
                        </h3>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
                      {categorySkills.map((skill, index) => {
                        const skillInfo = skillIconsMap[skill] || { 
                          icon: <span>•</span>, 
                          color: "#FFFFFF" 
                        };
                        
                        return (
                          <motion.div 
                            key={`${category}-${index}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            drag={isAdmin}
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            whileHover={isAdmin ? { scale: 1.05 } : { y: -5 }}
                            whileTap={isAdmin ? { scale: 0.95 } : {}}
                            style={{ '--skill-color': skillInfo.color || '#FFFFFF' } as React.CSSProperties}
                            className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
                          >
                            <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                              {skillInfo.icon}
                            </span>
                            <span className="group-hover:text-white">{skill}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                // Normal View - Show all skills without categories
                <div className="mb-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center">
                    {skills.map((skill, index) => {
                      const skillInfo = skillIconsMap[skill] || { 
                        icon: <span>•</span>, 
                        color: "#FFFFFF" 
                      };
                      
                      return (
                        <motion.div 
                          key={`all-skills-${index}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          drag={isAdmin}
                          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                          dragElastic={0.1}
                          whileHover={isAdmin ? { scale: 1.05 } : { y: -5 }}
                          whileTap={isAdmin ? { scale: 0.95 } : {}}
                          style={{ '--skill-color': skillInfo.color || '#FFFFFF' } as React.CSSProperties}
                          className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
                        >
                          <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                            {skillInfo.icon}
                          </span>
                          <span className="group-hover:text-white">{skill}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* "Add Skill" button only shown to admins */}
              {isAdmin && !showSuggestForm && (
                <div className="flex justify-center mt-8">
                  <motion.button
                    onClick={() => setShowSuggestForm(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transform transition-all duration-300 hover:scale-110"
                    whileHover={{ y: -5 }}
                    data-aos="zoom-in"
                  >
                    <span className="text-lg">+</span>
                    <span>Add Skill</span>
                  </motion.button>
                </div>
              )}
            </div>
          </IconContext.Provider>
          
          {/* Optional: Show available skills count */}
          <div className="text-gray-400 text-sm mt-4">
            {skills.length} skills and growing!
          </div>
        </>
      )}
    </div>
  );
};

export default Skills;