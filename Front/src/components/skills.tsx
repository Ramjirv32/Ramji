"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconContext } from "react-icons"
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
  FaWordpress,
} from "react-icons/fa"
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
  SiFastapi,
} from "react-icons/si"
import { TbBrandFramerMotion } from "react-icons/tb"
import { RxShadowNone } from "react-icons/rx"
import { DiJqueryLogo } from "react-icons/di"
import { IoLogoJavascript } from "react-icons/io5"
import { Trash2, Plus, Search, X } from "lucide-react"

interface SkillsData {
  id: number
  created_at: string
  s: string[]
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
  
const skillIconsMap: Record<string, { icon: React.ReactElement; color: string }> = {
  // Front-end
  HTML: { icon: <FaHtml5 size={16} />, color: "#E44D26" },
  CSS: { icon: <FaCss3Alt size={16} />, color: "#1572B6" },
  JavaScript: { icon: <FaJs size={16} />, color: "#F7DF1E" },
  TypeScript: { icon: <SiTypescript size={16} />, color: "#3178C6" },
  Cloudflare: { icon: <SiCloudflare size={16} />, color: "#F38020" },
  ReactJS: { icon: <FaReact size={16} />, color: "#61DAFB" },
  React: { icon: <FaReact size={16} />, color: "#61DAFB" },
  fastapi: { icon: <SiFastapi size={16} />, color: "#009688" },
  FastAPI: { icon: <SiFastapi size={16} />, color: "#009688" },
  "Framer Motion": { icon: <TbBrandFramerMotion size={16} />, color: "#0055FF" },
  Shadcn: { icon: <RxShadowNone size={16} />, color: "#FFFFFF" },
  "Next.js": { icon: <SiNextdotjs size={16} />, color: "#000000" },
  Angular: { icon: <FaAngular size={16} />, color: "#DD0031" },
  "Vue.js": { icon: <FaVuejs size={16} />, color: "#4FC08D" },
  Svelte: { icon: <SiSvelte size={16} />, color: "#FF3E00" },
  jQuery: { icon: <DiJqueryLogo size={16} />, color: "#0769AD" },
  "Tailwind CSS": { icon: <SiTailwindcss size={16} />, color: "#38bdf8" },
  TailwindCSS: { icon: <SiTailwindcss size={16} />, color: "#38bdf8" },
  Bootstrap: { icon: <FaBootstrap size={16} />, color: "#7952B3" },
  Sass: { icon: <FaSass size={16} />, color: "#CC6699" },
  NextJs: { icon: <SiNextdotjs size={16} />, color: "#000000" },
  Redux: { icon: <SiRedux size={16} />, color: "#764ABC" },
  WebGL: { icon: <SiWebgl size={16} />, color: "#990000" },
  WordPress: { icon: <FaWordpress size={16} />, color: "#21759B" },

  // Back-end
  NodeJS: { icon: <FaNodeJs size={16} />, color: "#339933" },
  "Node.js": { icon: <FaNodeJs size={16} />, color: "#339933" },
  Express: { icon: <SiExpress size={16} />, color: "#FFFFFF" },
  ExpressJS: { icon: <SiExpress size={16} />, color: "#FFFFFF" },
  PHP: { icon: <FaPhp size={16} />, color: "#777BB4" },
  Django: { icon: <SiDjango size={16} />, color: "#092E20" },
  NestJS: { icon: <SiNestjs size={16} />, color: "#E0234E" },
  Spring: { icon: <SiSpring size={16} />, color: "#6DB33F" },
  ".NET": { icon: <SiDotnet size={16} />, color: "#512BD4" },

  // Databases
  MongoDB: { icon: <SiMongodb size={16} />, color: "#47A248" },
  PostgreSQL: { icon: <SiPostgresql size={16} />, color: "#336791" },
  MySQL: { icon: <SiMysql size={16} />, color: "#4479A1" },
  Redis: { icon: <SiRedis size={16} />, color: "#DC382D" },
  GraphQL: { icon: <SiGraphql size={16} />, color: "#E10098" },
  Elasticsearch: { icon: <SiKubernetes size={16} />, color: "#005571" },
  Prisma: { icon: <SiPrisma size={16} />, color: "#5A67D8" },
  Supabase: { icon: <SiSupabase size={16} />, color: "#3ECF8E" },
  Firebase: { icon: <SiFirebase size={16} />, color: "#FFCA28" },

  // Programming Languages
  C: { icon: <SiC size={16} />, color: "#A8B9CC" },
  Java: { icon: <FaJava size={16} />, color: "#007396" },
  Python: { icon: <FaPython size={16} />, color: "#3776AB" },
  Rust: { icon: <SiRust size={16} />, color: "#000000" },
  Go: { icon: <SiGo size={16} />, color: "#00ADD8" },
  Kotlin: { icon: <SiKotlin size={16} />, color: "#7F52FF" },
  Swift: { icon: <SiSwift size={16} />, color: "#FA7343" },
  Dart: { icon: <SiDart size={16} />, color: "#0175C2" },

  // DevOps & Tools
  Git: { icon: <FaGit size={16} />, color: "#F05032" },
  GitHub: { icon: <FaGithub size={16} />, color: "#FFFFFF" },
  Docker: { icon: <FaDocker size={16} />, color: "#2496ED" },
  Kubernetes: { icon: <SiKubernetes size={16} />, color: "#326CE5" },
  AWS: { icon: <FaAws size={16} />, color: "#FF9900" },
  Vercel: { icon: <SiVercel size={16} />, color: "#FFFFFF" },
  Jenkins: { icon: <FaJenkins size={16} />, color: "#D24939" },
  Terraform: { icon: <SiTerraform size={16} />, color: "#7B42BC" },
  Postman: { icon: <SiPostman size={16} />, color: "#FF6C37" },
  Linux: { icon: <FaLinux size={16} />, color: "#FCC624" },
  Webpack: { icon: <SiWebpack size={16} />, color: "#8DD6F9" },
  Vite: { icon: <SiVite size={16} />, color: "#646CFF" },
  Jest: { icon: <SiJest size={16} />, color: "#C21325" },
  Cypress: { icon: <SiCypress size={16} />, color: "#17202C" },

  // Mobile & Design
  Flutter: { icon: <SiFlutter size={16} />, color: "#02569B" },
  "React Native": { icon: <FaReact size={16} />, color: "#61DAFB" },
  Figma: { icon: <FaFigma size={16} />, color: "#F24E1E" },

  // Others
  "Stripe": { icon: <FaStripe size={20} />, color: "#008CDD" },
  "API": { icon: <SiPostman size={20} />, color: "#FF6C37" },
  "AI APIs": { icon: <IoLogoJavascript size={20} />, color: "#F7DF1E" },
  "Hugging Face API": { icon: <IoLogoJavascript size={20} />, color: "#F7DF1E" },
  "IoT": { icon: <FaNodeJs size={20} />, color: "#339933" },
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
  Stripe: { icon: <FaStripe size={16} />, color: "#008CDD" },
  API: { icon: <SiPostman size={16} />, color: "#FF6C37" },
  "AI APIs": { icon: <IoLogoJavascript size={16} />, color: "#F7DF1E" },
  "Hugging Face API": { icon: <IoLogoJavascript size={16} />, color: "#F7DF1E" },
  IoT: { icon: <FaNodeJs size={16} />, color: "#339933" },
}

const EnhancedSkills = () => {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newSkill, setNewSkill] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Filter skills based on search
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  useEffect(() => {
    // Check admin status
    const loginStatus = sessionStorage.getItem("isLoggedIn")
    if (loginStatus === "true") {
      setIsAdmin(true)
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
        
   



    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
        const response = await fetch(`${API_URL}/skills`)

        if (!response.ok) {
          throw new Error("Failed to fetch skills")
        }

        const data: SkillsData[] = await response.json()
        if (data && data.length > 0 && data[0].s) {
          setSkills(data[0].s)
        }
      } catch (error) {
        console.error("Error fetching skills:", error)
        setError("Failed to load skills")
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const addSkill = async () => {
    if (!newSkill.trim() || !isAdmin) return

  // Function to add a new skill (admin mode)
  const addNewSkill = async () => {
    if (!newSkill.trim() || !isAdmin) return;
    
    // Check if skill already exists
    if (skills.includes(newSkill)) {
      alert("This skill already exists!")
      return
    }

    try {
      setSubmitting(true)
      const updatedSkills = [...skills, newSkill]

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
      const response = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills }),
      })

      if (!response.ok) {
        throw new Error("Failed to add skill")
      }

      setSkills(updatedSkills)
      setNewSkill("")
      setShowAddForm(false)
      setSuccessMessage("Skill added successfully!")

      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error adding skill:", error)
      alert("Failed to add skill. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const removeSkill = async (skillToRemove: string) => {
    if (!isAdmin) return

    try {
      const updatedSkills = skills.filter((skill) => skill !== skillToRemove)

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
      const response = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove skill")
      }

      setSkills(updatedSkills)
      setSuccessMessage("Skill removed successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error removing skill:", error)
      alert("Failed to remove skill. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">⚠️ {error}</p>
          <p className="text-sm text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <img src="/earth1.png" alt="Abstract 3D shape" width={300} height={200} className="mb-4" />
        <h4 className="text-gray-400 text-center text-sm tracking-widest uppercase mb-2">
          I CONSTANTLY TRY TO IMPROVE
        </h4>
        <h2 className="text-white text-center text-5xl md:text-6xl font-bold">My Tech Stack</h2>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Admin Add Form */}
        <AnimatePresence>
          {isAdmin && showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-3 text-white">Add New Skill</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name (e.g., React, Python)"
                  className="flex-1 bg-gray-900/80 border border-blue-700/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  disabled={submitting}
                >
                  <X size={16} />
                </button>
                <button
                  onClick={addSkill}
                  disabled={submitting || !newSkill.trim()}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    submitting || !newSkill.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skills Display */}
      <IconContext.Provider value={{ className: "icon" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl px-4">
          {/* Render skills from the API data */}
          {filteredSkills.map((skill, index) => {
            const skillInfo = skillIconsMap[skill] || {
              icon: <span>•</span>,
              color: "#FFFFFF",
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                drag={isAdmin}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileHover={isAdmin ? { scale: 1.05 } : { y: -5 }}
                whileTap={isAdmin ? { scale: 0.95 } : {}}
                style={{ "--skill-color": skillInfo.color || "#FFFFFF" } as React.CSSProperties}
                className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
              >
                <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                  {skillInfo.icon}
                </span>
                <span className="group-hover:text-white">{skill}</span>

                {/* Remove button for admin */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSkill(skill)
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 size={12} className="text-white" />
                  </button>
                )}
              </motion.div>
            )
          })}

          {/* "Add Skill" button only shown to admins */}
          {isAdmin && !showAddForm && (
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transform transition-all duration-300 hover:scale-110"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: filteredSkills.length * 0.1 }}
            >
              <span className="text-lg">+</span>
              <span>Add Skill</span>
            </motion.button>
          )}
        </div>
      </IconContext.Provider>

      {/* Optional: Show available skills count */}
      <div className="text-gray-400 text-sm mt-4">
        {filteredSkills.length} of {skills.length} skills
        {searchTerm && ` matching "${searchTerm}"`} and growing!
      </div>
    </div>
  )
}

export default EnhancedSkills
t-red-500 text-center">
          <p className="text-xl mb-2">⚠️ {error}</p>
          <p className="text-sm text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <img src="/earth1.png" alt="Abstract 3D shape" width={300} height={200} className="mb-4" />
        <h4 className="text-gray-400 text-center text-sm tracking-widest uppercase mb-2">
          I CONSTANTLY TRY TO IMPROVE
        </h4>
        <h2 className="text-white text-center text-5xl md:text-6xl font-bold">My Tech Stack</h2>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Admin Add Form */}
        <AnimatePresence>
          {isAdmin && showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-3 text-white">Add New Skill</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name (e.g., React, Python)"
                  className="flex-1 bg-gray-900/80 border border-blue-700/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  disabled={submitting}
                >
                  <X size={16} />
                </button>
                <button
                  onClick={addSkill}
                  disabled={submitting || !newSkill.trim()}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    submitting || !newSkill.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skills Display */}
      <IconContext.Provider value={{ className: "icon" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl px-4">
          {/* Render skills from the API data */}
          {filteredSkills.map((skill, index) => {
            const skillInfo = skillIconsMap[skill] || {
              icon: <span>•</span>,
              color: "#FFFFFF",
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                drag={isAdmin}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileHover={isAdmin ? { scale: 1.05 } : { y: -5 }}
                whileTap={isAdmin ? { scale: 0.95 } : {}}
                style={{ "--skill-color": skillInfo.color || "#FFFFFF" } as React.CSSProperties}
                className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
              >
                <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                  {skillInfo.icon}
                </span>
                <span className="group-hover:text-white">{skill}</span>

                {/* Remove button for admin */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSkill(skill)
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 size={12} className="text-white" />
                  </button>
                )}
              </motion.div>
            )
          })}

          {/* "Add Skill" button only shown to admins */}
          {isAdmin && !showAddForm && (
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transform transition-all duration-300 hover:scale-110"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: filteredSkills.length * 0.1 }}
            >
              <span className="text-lg">+</span>
              <span>Add Skill</span>
            </motion.button>
          )}
        </div>
      </IconContext.Provider>

      {/* Optional: Show available skills count */}
      <div className="text-gray-400 text-sm mt-4">
        {filteredSkills.length} of {skills.length} skills
        {searchTerm && ` matching "${searchTerm}"`} and growing!
      </div>
    </div>
  )
}

export default EnhancedSkills
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
  SiFastapi,
} from "react-icons/si"
import { TbBrandFramerMotion } from "react-icons/tb"
import { RxShadowNone } from "react-icons/rx"
import { DiJqueryLogo } from "react-icons/di"
import { IoLogoJavascript } from "react-icons/io5"
import { Trash2, Plus, Search, Filter, X } from "lucide-react"

interface SkillsData {
  id: number
  created_at: string
  s: string[]
}

interface SkillInfo {
  icon: React.ReactElement
  color: string
  category: string
}

const skillIconsMap: Record<string, SkillInfo> = {
  // Frontend
  HTML: { icon: <FaHtml5 size={16} />, color: "#E44D26", category: "Frontend" },
  CSS: { icon: <FaCss3Alt size={16} />, color: "#1572B6", category: "Frontend" },
  JavaScript: { icon: <FaJs size={16} />, color: "#F7DF1E", category: "Frontend" },
  TypeScript: { icon: <SiTypescript size={16} />, color: "#3178C6", category: "Frontend" },
  React: { icon: <FaReact size={16} />, color: "#61DAFB", category: "Frontend" },
  ReactJS: { icon: <FaReact size={16} />, color: "#61DAFB", category: "Frontend" },
  "Next.js": { icon: <SiNextdotjs size={16} />, color: "#000000", category: "Frontend" },
  NextJs: { icon: <SiNextdotjs size={16} />, color: "#000000", category: "Frontend" },
  Angular: { icon: <FaAngular size={16} />, color: "#DD0031", category: "Frontend" },
  "Vue.js": { icon: <FaVuejs size={16} />, color: "#4FC08D", category: "Frontend" },
  Svelte: { icon: <SiSvelte size={16} />, color: "#FF3E00", category: "Frontend" },
  jQuery: { icon: <DiJqueryLogo size={16} />, color: "#0769AD", category: "Frontend" },
  "Tailwind CSS": { icon: <SiTailwindcss size={16} />, color: "#38bdf8", category: "Frontend" },
  TailwindCSS: { icon: <SiTailwindcss size={16} />, color: "#38bdf8", category: "Frontend" },
  Bootstrap: { icon: <FaBootstrap size={16} />, color: "#7952B3", category: "Frontend" },
  Sass: { icon: <FaSass size={16} />, color: "#CC6699", category: "Frontend" },
  Redux: { icon: <SiRedux size={16} />, color: "#764ABC", category: "Frontend" },
  "Framer Motion": { icon: <TbBrandFramerMotion size={16} />, color: "#0055FF", category: "Frontend" },
  Shadcn: { icon: <RxShadowNone size={16} />, color: "#FFFFFF", category: "Frontend" },

  // Backend
  NodeJS: { icon: <FaNodeJs size={16} />, color: "#339933", category: "Backend" },
  "Node.js": { icon: <FaNodeJs size={16} />, color: "#339933", category: "Backend" },
  Express: { icon: <SiExpress size={16} />, color: "#FFFFFF", category: "Backend" },
  ExpressJS: { icon: <SiExpress size={16} />, color: "#FFFFFF", category: "Backend" },
  PHP: { icon: <FaPhp size={16} />, color: "#777BB4", category: "Backend" },
  Django: { icon: <SiDjango size={16} />, color: "#092E20", category: "Backend" },
  NestJS: { icon: <SiNestjs size={16} />, color: "#E0234E", category: "Backend" },
  Spring: { icon: <SiSpring size={16} />, color: "#6DB33F", category: "Backend" },
  FastAPI: { icon: <SiFastapi size={16} />, color: "#009688", category: "Backend" },
  fastapi: { icon: <SiFastapi size={16} />, color: "#009688", category: "Backend" },
  ".NET": { icon: <SiDotnet size={16} />, color: "#512BD4", category: "Backend" },

  // Database
  MongoDB: { icon: <SiMongodb size={16} />, color: "#47A248", category: "Database" },
  PostgreSQL: { icon: <SiPostgresql size={16} />, color: "#336791", category: "Database" },
  MySQL: { icon: <SiMysql size={16} />, color: "#4479A1", category: "Database" },
  Redis: { icon: <SiRedis size={16} />, color: "#DC382D", category: "Database" },
  Prisma: { icon: <SiPrisma size={16} />, color: "#5A67D8", category: "Database" },
  Supabase: { icon: <SiSupabase size={16} />, color: "#3ECF8E", category: "Database" },
  Firebase: { icon: <SiFirebase size={16} />, color: "#FFCA28", category: "Database" },

  // Languages
  C: { icon: <SiC size={16} />, color: "#A8B9CC", category: "Languages" },
  Java: { icon: <FaJava size={16} />, color: "#007396", category: "Languages" },
  Python: { icon: <FaPython size={16} />, color: "#3776AB", category: "Languages" },
  Rust: { icon: <SiRust size={16} />, color: "#000000", category: "Languages" },
  Go: { icon: <SiGo size={16} />, color: "#00ADD8", category: "Languages" },
  Kotlin: { icon: <SiKotlin size={16} />, color: "#7F52FF", category: "Languages" },
  Swift: { icon: <SiSwift size={16} />, color: "#FA7343", category: "Languages" },
  Dart: { icon: <SiDart size={16} />, color: "#0175C2", category: "Languages" },

  // DevOps
  Git: { icon: <FaGit size={16} />, color: "#F05032", category: "DevOps" },
  GitHub: { icon: <FaGithub size={16} />, color: "#FFFFFF", category: "DevOps" },
  Docker: { icon: <FaDocker size={16} />, color: "#2496ED", category: "DevOps" },
  Kubernetes: { icon: <SiKubernetes size={16} />, color: "#326CE5", category: "DevOps" },
  AWS: { icon: <FaAws size={16} />, color: "#FF9900", category: "DevOps" },
  Vercel: { icon: <SiVercel size={16} />, color: "#FFFFFF", category: "DevOps" },
  Jenkins: { icon: <FaJenkins size={16} />, color: "#D24939", category: "DevOps" },
  Terraform: { icon: <SiTerraform size={16} />, color: "#7B42BC", category: "DevOps" },
  Linux: { icon: <FaLinux size={16} />, color: "#FCC624", category: "DevOps" },
  Cloudflare: { icon: <SiCloudflare size={16} />, color: "#F38020", category: "DevOps" },

  // Tools
  Postman: { icon: <SiPostman size={16} />, color: "#FF6C37", category: "Tools" },
  Webpack: { icon: <SiWebpack size={16} />, color: "#8DD6F9", category: "Tools" },
  Vite: { icon: <SiVite size={16} />, color: "#646CFF", category: "Tools" },
  Jest: { icon: <SiJest size={16} />, color: "#C21325", category: "Tools" },
  Cypress: { icon: <SiCypress size={16} />, color: "#17202C", category: "Tools" },
  Figma: { icon: <FaFigma size={16} />, color: "#F24E1E", category: "Tools" },

  // Mobile & Others
  Flutter: { icon: <SiFlutter size={16} />, color: "#02569B", category: "Mobile" },
  "React Native": { icon: <FaReact size={16} />, color: "#61DAFB", category: "Mobile" },
  WordPress: { icon: <FaWordpress size={16} />, color: "#21759B", category: "CMS" },
  Stripe: { icon: <FaStripe size={16} />, color: "#008CDD", category: "Payment" },
  GraphQL: { icon: <SiGraphql size={16} />, color: "#E10098", category: "API" },
  WebGL: { icon: <SiWebgl size={16} />, color: "#990000", category: "Graphics" },
  "AI APIs": { icon: <IoLogoJavascript size={16} />, color: "#F7DF1E", category: "API" },
  "Hugging Face API": { icon: <IoLogoJavascript size={16} />, color: "#F7DF1E", category: "API" },
  IoT: { icon: <FaNodeJs size={16} />, color: "#339933", category: "IoT" },
  API: { icon: <SiPostman size={16} />, color: "#FF6C37", category: "API" },
}

const categoryColors = {
  Frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  Backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  Database: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  Languages: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  DevOps: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
  Tools: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  Mobile: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
  CMS: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
  Payment: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
  API: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
  Graphics: "from-red-500/20 to-pink-500/20 border-red-500/30",
  IoT: "from-green-500/20 to-emerald-500/20 border-green-500/30",
}

const EnhancedSkills = () => {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newSkill, setNewSkill] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "category">("grid")

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(Object.values(skillIconsMap).map((skill) => skill.category)))]

  // Filter skills based on search and category
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.toLowerCase().includes(searchTerm.toLowerCase())
    const skillInfo = skillIconsMap[skill]
    const matchesCategory = selectedCategory === "All" || (skillInfo && skillInfo.category === selectedCategory)
    return matchesSearch && matchesCategory
  })

  // Group skills by category
  const skillsByCategory = categories.reduce(
    (acc, category) => {
      if (category === "All") return acc
      acc[category] = filteredSkills.filter((skill) => {
        const skillInfo = skillIconsMap[skill]
        return skillInfo && skillInfo.category === category
      })
      return acc
    },
    {} as Record<string, string[]>,
  )

  useEffect(() => {
    // Check admin status
    const loginStatus = sessionStorage.getItem("isLoggedIn")
    if (loginStatus === "true") {
      setIsAdmin(true)
    }

    // Fetch skills
    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
        const response = await fetch(`${API_URL}/skills`)

        if (!response.ok) {
          throw new Error("Failed to fetch skills")
        }

        const data: SkillsData[] = await response.json()
        if (data && data.length > 0 && data[0].s) {
          setSkills(data[0].s)
        }
      } catch (error) {
        console.error("Error fetching skills:", error)
        setError("Failed to load skills")
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Function to add skill from suggestion form
  const addSkill = async () => {
    if (!suggestedSkill.trim() || !isAdmin) return;
    
  const addSkill = async () => {
    if (!newSkill.trim() || !isAdmin) return

    if (skills.includes(newSkill)) {
      alert("This skill already exists!")
      return
    }

    try {
      setSubmitting(true)
      const updatedSkills = [...skills, newSkill]

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
      const response = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills }),
      })

      if (!response.ok) {
        throw new Error("Failed to add skill")
      }

      setSkills(updatedSkills)
      setNewSkill("")
      setShowAddForm(false)
      setSuccessMessage("Skill added successfully!")

      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error adding skill:", error)
      alert("Failed to add skill. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const removeSkill = async (skillToRemove: string) => {
    if (!isAdmin) return

    try {
      const updatedSkills = skills.filter((skill) => skill !== skillToRemove)

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000"
      const response = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove skill")
      }

      setSkills(updatedSkills)
      setSuccessMessage("Skill removed successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error removing skill:", error)
      alert("Failed to remove skill. Please try again.")
    }
  }

  const SkillCard = ({ skill, index }: { skill: string; index: number }) => {
    const skillInfo = skillIconsMap[skill] || {
      icon: <span>•</span>,
      color: "#FFFFFF",
      category: "Other",
    }

    return (
      <motion.div
        key={skill}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className={`relative group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${
          categoryColors[skillInfo.category as keyof typeof categoryColors] ||
          "from-gray-500/20 to-slate-500/20 border-gray-500/30"
        } border backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
        style={
          {
            "--skill-color": skillInfo.color,
            boxShadow: `0 0 0 rgba(${skillInfo.color}, 0.3)`,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 20px ${skillInfo.color}40`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)"
        }}
      >
        <span
          className="group-hover:animate-bounce transition-transform duration-200"
          style={{ color: skillInfo.color }}
        >
          {skillInfo.icon}
        </span>
        <span className="text-white font-medium text-sm">{skill}</span>

        {/* Remove button for admin */}
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeSkill(skill)
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Trash2 size={12} className="text-white" />
          </button>
        )}
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">⚠️ {error}</p>
          <p className="text-sm text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center">
        <motion.img
          src="/earth1.png"
          alt="Abstract 3D shape"
          width={300}
          height={200}
          className="mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h4
          className="text-gray-400 text-center text-sm tracking-widest uppercase mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I CONSTANTLY TRY TO IMPROVE
        </motion.h4>
        <motion.h2
          className="text-white text-center text-5xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          My Tech Stack
        </motion.h2>
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

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 backdrop-blur-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="flex bg-gray-900/50 border border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("category")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === "category" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Category
              </button>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <IconContext.Provider value={{ className: "icon" }}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl px-4">
              {skills.map((skill, index) => {
                const skillInfo = skillIconsMap[skill] || { 
                  icon: <span>•</span>, 
                  color: "#FFFFFF" 
                };
                
                return (
                  <motion.div 
                    key={index}
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
              
              {/* "Add Skill" button only shown to admins */}
              {isAdmin && !showSuggestForm && (

        {/* Admin Add Form */}
        <AnimatePresence>
          {isAdmin && showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-3 text-white">Add New Skill</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name (e.g., React, Python)"
                  className="flex-1 bg-gray-900/80 border border-blue-700/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  disabled={submitting}
                >
                  <X size={16} />
                </button>
                <button
                  onClick={addSkill}
                  disabled={submitting || !newSkill.trim()}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    submitting || !newSkill.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skills Display */}
      <IconContext.Provider value={{ className: "icon" }}>
        <div className="w-full max-w-6xl px-4">
          {viewMode === "grid" ? (
            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4" layout>
              <AnimatePresence>
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={skill} skill={skill} index={index} />
                ))}
              </AnimatePresence>

              {/* Add Skill Button */}
              {isAdmin && !showAddForm && (
                <motion.button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: filteredSkills.length * 0.05 }}
                >
                  <Plus size={20} />
                  <span className="font-medium text-sm">Add Skill</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) =>
                  categorySkills.length > 0 && (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                            categoryColors[category as keyof typeof categoryColors]?.split(" ")[0] || "from-gray-500"
                          }`}
                        ></span>
                        {category}
                        <span className="text-sm text-gray-400 font-normal">({categorySkills.length})</span>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        <AnimatePresence>
                          {categorySkills.map((skill, index) => (
                            <SkillCard key={skill} skill={skill} index={index} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ),
              )}
            </div>
          )}
        </div>
      </IconContext.Provider>

      {/* Stats */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-gray-400 text-sm">
          {filteredSkills.length} of {skills.length} skills
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </div>
        <div className="text-gray-500 text-xs">
          {categories.length - 1} categories • Always learning and growing! 🚀
        </div>
      </motion.div>
    </div>
  )
}

export default EnhancedSkills
