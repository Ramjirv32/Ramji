"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { IconContext } from "react-icons"

// Import only necessary icons - split by library to enable better tree shaking
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaGithub, 
  FaJava, FaLinux, FaPython, FaDocker, FaAws, FaAngular, FaVuejs, 
  FaPhp, FaSass, FaBootstrap, FaFigma, FaJenkins, FaStripe, 
  FaWordpress, FaSlack, FaTrello, FaDiscord, FaDigitalOcean
} from "react-icons/fa"

import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, 
  SiVercel, SiPostman, SiPrisma, SiC, SiRust, SiGo, SiKotlin, 
  SiSwift, SiDart, SiFlutter, SiFirebase, SiRedis, SiMysql, 
  SiGraphql, SiElasticsearch, SiKubernetes, SiTerraform, SiDjango, 
  SiCloudflare, SiNextdotjs, SiNestjs, SiSpring, SiDotnet, SiSvelte, 
  SiJest, SiCypress, SiWebpack, SiVite, SiSupabase, SiRedux, 
  SiWebgl, SiFastapi, SiGooglecloud, SiRazorpay, SiSocketdotio, 
  SiNginx, SiJira, SiNotion, SiFramer, SiThreedotjs
} from "react-icons/si"

import { TbBrandAzure, TbBrandFramerMotion } from "react-icons/tb"
import { RxShadowNone } from "react-icons/rx"
import { IoLogoJavascript } from "react-icons/io5"
import { DiJqueryLogo } from "react-icons/di"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Backend server URL
const BACKEND_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:9000' 
  : 'https://your-backend-domain.com' // Replace with your actual backend domain

interface Skill {
  name: string
  icon: string
}

interface SkillsData {
  id: number
  created_at: string
  s: Skill[]
}

const skillIconsMap: Record<string, { icon: React.ReactElement; color: string }> = {
  "HTML": { icon: <FaHtml5 size={20} />, color: "#E44D26" },
  "CSS": { icon: <FaCss3Alt size={20} />, color: "#1572B6" },
  "JavaScript": { icon: <FaJs size={20} />, color: "#F7DF1E" },
  "TypeScript": { icon: <SiTypescript size={18} />, color: "#3178C6" },
  "Cloudflare": { icon: <SiCloudflare size={20} />, color: "#F38020" },
  "Azure": { icon: <TbBrandAzure size={20} />, color: "#0078D4" },
  "Microsoft Azure": { icon: <TbBrandAzure size={20} />, color: "#0078D4" },
  "GCP": { icon: <SiGooglecloud size={20} />, color: "#4285F4" },
  "Google Cloud": { icon: <SiGooglecloud size={20} />, color: "#4285F4" },
  "DigitalOcean": { icon: <FaDigitalOcean size={20} />, color: "#0080FF" },
  "ReactJS": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "React": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "fastapi": { icon: <SiFastapi size={20} />, color: "#009688" },
  "FastAPI": { icon: <SiFastapi size={20} />, color: "#009688" },
  "Framer Motion": { icon: <TbBrandFramerMotion size={20} />, color: "#0055FF" },
  "Framer": { icon: <SiFramer size={20} />, color: "#0055FF" },
  "Three.js": { icon: <SiThreedotjs size={20} />, color: "#000000" },
  "Shadcn": { icon: <RxShadowNone size={20} />, color: "#FFFFFF" },
  "Next.js": { icon: <SiNextdotjs size={20} />, color: "#000000" },
  "NextJS": { icon: <SiNextdotjs size={20} />, color: "#000000" },
  "Angular": { icon: <FaAngular size={20} />, color: "#DD0031" },
  "Vue.js": { icon: <FaVuejs size={20} />, color: "#4FC08D" },
  "Svelte": { icon: <SiSvelte size={20} />, color: "#FF3E00" },
  "jQuery": { icon: <DiJqueryLogo size={20} />, color: "#0769AD" },
  "Tailwind CSS": { icon: <SiTailwindcss size={20} />, color: "#38bdf8" },
  "TailwindCSS": { icon: <SiTailwindcss size={20} />, color: "#38bdf8" },
  "Bootstrap": { icon: <FaBootstrap size={20} />, color: "#7952B3" },
  "Sass": { icon: <FaSass size={20} />, color: "#CC6699" },
  "Redux": { icon: <SiRedux size={20} />, color: "#764ABC" },
  "WebGL": { icon: <SiWebgl size={20} />, color: "#990000" },
  "WordPress": { icon: <FaWordpress size={20} />, color: "#21759B" },
  "Socket.io": { icon: <SiSocketdotio size={20} />, color: "#010101" },
  "Nginx": { icon: <SiNginx size={20} />, color: "#009639" },
  "NodeJS": { icon: <FaNodeJs size={20} />, color: "#339933" },
  "Node.js": { icon: <FaNodeJs size={20} />, color: "#339933" },
  "Express": { icon: <SiExpress size={20} />, color: "#FFFFFF" },
  "ExpressJS": { icon: <SiExpress size={20} />, color: "#FFFFFF" },
  "PHP": { icon: <FaPhp size={20} />, color: "#777BB4" },
  "Django": { icon: <SiDjango size={20} />, color: "#092E20" },
  "NestJS": { icon: <SiNestjs size={20} />, color: "#E0234E" },
  "Spring": { icon: <SiSpring size={20} />, color: "#6DB33F" },
  ".NET": { icon: <SiDotnet size={20} />, color: "#512BD4" },
  "MongoDB": { icon: <SiMongodb size={20} />, color: "#47A248" },
  "PostgreSQL": { icon: <SiPostgresql size={20} />, color: "#336791" },
  "MySQL": { icon: <SiMysql size={20} />, color: "#4479A1" },
  "Redis": { icon: <SiRedis size={20} />, color: "#DC382D" },
  "GraphQL": { icon: <SiGraphql size={20} />, color: "#E10098" },
  "Elasticsearch": { icon: <SiElasticsearch size={20} />, color: "#005571" },
  "Prisma": { icon: <SiPrisma size={20} />, color: "#5A67D8" },
  "Supabase": { icon: <SiSupabase size={20} />, color: "#3ECF8E" },
  "Firebase": { icon: <SiFirebase size={20} />, color: "#FFCA28" },
  "C": { icon: <SiC size={20} />, color: "#A8B9CC" },
  "Java": { icon: <FaJava size={20} />, color: "#007396" },
  "Python": { icon: <FaPython size={20} />, color: "#3776AB" },
  "Rust": { icon: <SiRust size={20} />, color: "#000000" },
  "Go": { icon: <SiGo size={20} />, color: "#00ADD8" },
  "Kotlin": { icon: <SiKotlin size={20} />, color: "#7F52FF" },
  "Swift": { icon: <SiSwift size={20} />, color: "#FA7343" },
  "Dart": { icon: <SiDart size={20} />, color: "#0175C2" },
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
  "Jira": { icon: <SiJira size={20} />, color: "#0052CC" },
  "Notion": { icon: <SiNotion size={20} />, color: "#000000" },
  "Slack": { icon: <FaSlack size={20} />, color: "#4A154B" },
  "Discord": { icon: <FaDiscord size={20} />, color: "#5865F2" },
  "Trello": { icon: <FaTrello size={20} />, color: "#0052CC" },
  "Flutter": { icon: <SiFlutter size={20} />, color: "#02569B" },
  "React Native": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "Figma": { icon: <FaFigma size={20} />, color: "#F24E1E" },
  "Stripe": { icon: <FaStripe size={20} />, color: "#008CDD" },
  "Razorpay": { icon: <SiRazorpay size={20} />, color: "#0C2451" },
}

const skillCategories: Record<string, string[]> = {
  "Frontend": [
    "HTML", "CSS", "ReactJS", "React", "NextJS", "NextJs", 
    "Angular", "Vue.js", "Svelte", "jQuery", "Tailwind CSS", "TailwindCSS", "Bootstrap", 
    "Sass", "Redux", "WebGL", "Framer Motion", "Framer", "Three.js", "Shadcn"
  ],
  "Backend": [
    "NodeJS", "Node.js", "Express", "ExpressJS", "PHP", "Django", "NestJS", "Spring", 
    ".NET", "fastapi", "FastAPI", "Socket.io", "Nginx"
  ],
  "Languages": [
    "C", "Java", "Python", "Rust", "Go", "Kotlin", "Swift", "Dart", "JavaScript", "TypeScript"
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Prisma", "Supabase", 
    "Firebase", "GraphQL"
  ],
  "Tools": [
    "Git", "GitHub", "Postman", "Linux", "Webpack", "Vite", "Jest", "Cypress", "Figma",
    "Jira", "Notion", "Slack", "Discord", "Trello"
  ],
  "Cloud & Deployment": [
    "AWS", "Azure", "Microsoft Azure", "GCP", "Google Cloud", "DigitalOcean", "Vercel", 
    "Docker", "Kubernetes", "Jenkins", "Terraform", "Cloudflare"
  ],
  "CMS & Others": [
    "WordPress", "Stripe", "Razorpay", "API", "AI APIs", "Hugging Face API", "IoT"
  ],
  "Mobile": [
    "Flutter", "React Native", "Kotlin", "Swift", "Dart"
  ]
}

const SkillsContent = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isGridView, setIsGridView] = useState<boolean>(true)

  useEffect(() => {
    // Dynamically import AOS to reduce initial bundle size
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
      })
    })
    
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/public/skills`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Skills data fetched:', data)
      
      if (data && Array.isArray(data) && data.length > 0) {
        if (data[0].s && Array.isArray(data[0].s) && data[0].s.length > 0) {
          setSkills(data[0].s)
        }
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  const categorizeSkills = () => {
    const categorized: Record<string, Skill[]> = {}
    
    Object.keys(skillCategories).forEach(category => {
      categorized[category] = []
    })
    
    categorized["Others"] = []
    
    skills.forEach(skill => {
      let categoryFound = false
      
      for (const [category, categorySkills] of Object.entries(skillCategories)) {
        if (categorySkills.includes(skill.name)) {
          categorized[category].push(skill)
          categoryFound = true
          break
        }
      }
      
      if (!categoryFound) {
        categorized["Others"].push(skill)
      }
    })
    
    Object.keys(categorized).forEach(category => {
      if (categorized[category].length === 0) {
        delete categorized[category]
      }
    })
    
    return categorized
  }

  const categorizedSkills = categorizeSkills()

  if (loading) {
    return (
      <section id="skills" className="w-full py-20 relative bg-transparent">
        <div className="w-full flex flex-col items-center justify-center gap-6 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="skills" className="w-full py-20 relative bg-transparent">
        <div className="w-full flex flex-col items-center justify-center gap-6 py-16">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  if (skills.length === 0) {
    return (
      <section id="skills" className="w-full py-20 relative bg-transparent">
        <div className="w-full flex flex-col items-center justify-center gap-6 py-16">
          <p className="text-gray-400">No skills data available</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="w-full py-20 relative bg-transparent">
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/h/earth1.webp"
            alt="3D Earth visualization"
            width={300}
            height={200}
            quality={85}
            loading="lazy"
            className="mb-4"
          />

          <h4 className="text-gray-400 text-center text-sm tracking-widest uppercase mb-2">
            I CONSTANTLY TRY TO IMPROVE
          </h4>

          <h2 className="text-white text-center text-5xl md:text-6xl font-bold">
            My Tech Stack
          </h2>
        </div>

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
            Category View
          </button>
        </div>

        <IconContext.Provider value={{ className: "icon" }}>
          <div className="w-full max-w-7xl px-4">
            {isGridView ? (
              <div className="mb-12">
                <div className="flex flex-wrap gap-3 justify-center">
                  {skills.map((skill, index) => {
                    const skillInfo = skillIconsMap[skill.name] ?? {
                      icon: <span>•</span>,
                      color: "#FFFFFF",
                    }

                    return (
                      <motion.div
                        key={`grid-skill-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        style={{ '--skill-color': skillInfo.color } as React.CSSProperties}
                        className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
                      >
                        <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                          {skillInfo.icon}
                        </span>
                        <span className="group-hover:text-white text-sm">{skill.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ) : (
              Object.entries(categorizedSkills).map(([category, categorySkills]) => (
                <div key={category} className="mb-12">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-lg blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-lg p-4">
                      <h3 className="text-white text-2xl font-bold text-left bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {category}
                      </h3>
                      <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {categorySkills.map((skill, index) => {
                      const skillInfo = skillIconsMap[skill.name] ?? {
                        icon: <span>•</span>,
                        color: "#FFFFFF",
                      }

                      return (
                        <motion.div
                          key={`${category}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, scale: 1.05 }}
                          style={{ '--skill-color': skillInfo.color } as React.CSSProperties}
                          className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)]"
                        >
                          <span className="group-hover:animate-bounce" style={{ color: skillInfo.color }}>
                            {skillInfo.icon}
                          </span>
                          <span className="group-hover:text-white text-sm">{skill.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </IconContext.Provider>
      </div>
    </section>
  )
}

export default SkillsContent
