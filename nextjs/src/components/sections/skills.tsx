"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaGithub,
  FaJava, FaLinux, FaPython, FaDocker, FaAws, FaAngular, FaVuejs,
  FaPhp, FaSass, FaBootstrap, FaFigma, FaJenkins,
  FaDigitalOcean
} from "react-icons/fa";

import {
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql,
  SiVercel, SiPostman, SiPrisma, SiC, SiRust, SiGo, SiKotlin,
  SiSwift, SiDart, SiFlutter, SiFirebase, SiRedis, SiMysql,
  SiGraphql, SiElasticsearch, SiKubernetes, SiTerraform, SiDjango,
  SiCloudflare, SiNextdotjs, SiNestjs, SiSpring, SiDotnet, SiSvelte,
  SiJest, SiCypress, SiWebpack, SiVite, SiSupabase, SiRedux,
  SiWebgl, SiFastapi, SiGooglecloud, SiSocketdotio,
  SiNginx, SiJira, SiNotion, SiFramer, SiThreedotjs
} from "react-icons/si";

import { TbBrandAzure, TbBrandFramerMotion } from "react-icons/tb";
import { RxShadowNone } from "react-icons/rx";
import { DiJqueryLogo } from "react-icons/di";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: string;
}

// Static skills data
const staticSkillsData: Skill[] = [
  { "name": "HTML", "icon": "/icons/html.svg" },
  { "name": "CSS", "icon": "/icons/css.svg" },
  { "name": "JavaScript", "icon": "/icons/javascript.svg" },
  { "name": "TypeScript", "icon": "/icons/typescript.svg" },
  { "name": "ReactJS", "icon": "/icons/reactjs.svg" },
  { "name": "NextJS", "icon": "/icons/nextjs.svg" },
  { "name": "C", "icon": "/icons/c.svg" },
  { "name": "Java", "icon": "/icons/java.svg" },
  // { "name": "Python", "icon": "/icons/python.svg" },
  { "name": "Tailwind CSS", "icon": "/icons/tailwind-css.svg" },
  { "name": "Framer Motion", "icon": "/icons/framer-motion.svg" },
  { "name": "NodeJS", "icon": "/icons/nodejs.svg" },
  { "name": "ExpressJS", "icon": "/icons/expressjs.svg" },
  { "name": "MongoDB", "icon": "/icons/mongodb.svg" },
  { "name": "PostgreSQL", "icon": "/icons/postgresql.svg" },
  // { "name": "Prisma", "icon": "/icons/prisma.svg" },
  { "name": "Git", "icon": "/icons/git.svg" },
  { "name": "GitHub", "icon": "/icons/github.svg" },
  { "name": "Docker", "icon": "/icons/docker.svg" },
  { "name": "Kubernetes", "icon": "/icons/kubernetes.svg" },
  { "name": "AWS", "icon": "/icons/aws.svg" },
  { "name": "Azure", "icon": "/icons/azure.svg" },
  { "name": "Vercel", "icon": "/icons/vercel.svg" },
  { "name": "Jenkins", "icon": "/icons/jenkins.svg" },
  // { "name": "Terraform", "icon": "/icons/terraform.svg" },
  { "name": "Postman", "icon": "/icons/postman.svg" },
  { "name": "Linux", "icon": "/icons/linux.svg" },
  { "name": "Supabase", "icon": "/icons/supabase.svg" },
  { "name": "Firebase", "icon": "/icons/firebase.svg" },
  { "name": "fastapi", "icon": "/icons/fastapi.svg" },
  { "name": "Cloudflare", "icon": "/icons/cloudflare.svg" },
  { "name": "Figma", "icon": "/icons/figma.svg" },
  { "name": "Redux", "icon": "/icons/redux.svg" },
];

const skillIconsMap: Record<string, { icon: React.ReactElement; color: string }> = {
  "HTML": { icon: <FaHtml5 size={20} />, color: "#E44D26" },
  "CSS": { icon: <FaCss3Alt size={20} />, color: "#1572B6" },
  "JavaScript": { icon: <FaJs size={20} />, color: "#F7DF1E" },
  "TypeScript": { icon: <SiTypescript size={18} />, color: "#3178C6" },
  "Cloudflare": { icon: <SiCloudflare size={20} />, color: "#F38020" },
  "Azure": { icon: <TbBrandAzure size={20} />, color: "#0078D4" },
  "GCP": { icon: <SiGooglecloud size={20} />, color: "#4285F4" },
  "DigitalOcean": { icon: <FaDigitalOcean size={20} />, color: "#0080FF" },
  "ReactJS": { icon: <FaReact size={20} />, color: "#61DAFB" },
  "fastapi": { icon: <SiFastapi size={20} />, color: "#009688" },
  "Framer Motion": { icon: <TbBrandFramerMotion size={20} />, color: "#0055FF" },
  "Three.js": { icon: <SiThreedotjs size={20} />, color: "#000000" },
  "NextJS": { icon: <SiNextdotjs size={20} />, color: "#FFFFFF" },
  "Angular": { icon: <FaAngular size={20} />, color: "#DD0031" },
  "Vue.js": { icon: <FaVuejs size={20} />, color: "#4FC08D" },
  "Svelte": { icon: <SiSvelte size={20} />, color: "#FF3E00" },
  "jQuery": { icon: <DiJqueryLogo size={20} />, color: "#0769AD" },
  "Tailwind CSS": { icon: <SiTailwindcss size={20} />, color: "#38bdf8" },
  "Bootstrap": { icon: <FaBootstrap size={20} />, color: "#7952B3" },
  "Sass": { icon: <FaSass size={20} />, color: "#CC6699" },
  "Redux": { icon: <SiRedux size={20} />, color: "#764ABC" },
  "WebGL": { icon: <SiWebgl size={20} />, color: "#990000" },
  "Socket.io": { icon: <SiSocketdotio size={20} />, color: "#010101" },
  "Nginx": { icon: <SiNginx size={20} />, color: "#009639" },
  "NodeJS": { icon: <FaNodeJs size={20} />, color: "#339933" },
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

  // "Terraform": { icon: <SiTerraform size={20} />, color: "#7B42BC" },
  "Postman": { icon: <SiPostman size={20} />, color: "#FF6C37" },
  "Linux": { icon: <FaLinux size={20} />, color: "#FCC624" },
  "Webpack": { icon: <SiWebpack size={20} />, color: "#8DD6F9" },
  "Vite": { icon: <SiVite size={20} />, color: "#646CFF" },
  "Jest": { icon: <SiJest size={20} />, color: "#C21325" },
  "Cypress": { icon: <SiCypress size={20} />, color: "#17202C" },
  "Jira": { icon: <SiJira size={20} />, color: "#0052CC" },
  "Notion": { icon: <SiNotion size={20} />, color: "#000000" },
  "Flutter": { icon: <SiFlutter size={20} />, color: "#02569B" },
  "Figma": { icon: <FaFigma size={20} />, color: "#F24E1E" },
};

const skillCategories: Record<string, string[]> = {
  "Frontend": [
    "HTML", "CSS", "ReactJS", "NextJS", "Angular", "Vue.js", "Svelte",
    "Tailwind CSS", "Bootstrap", "Sass", "Redux", "Framer Motion"
  ],
  "Backend": [
    "NodeJS", "ExpressJS", "PHP", "Django", "NestJS", "Spring", ".NET",
    "fastapi", "Socket.io", "Nginx"
  ],
  "Languages": [
    "C", "Java", "Python", "Rust", "Go", "Kotlin", "Swift", "Dart",
    "JavaScript", "TypeScript"
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Prisma",
    "Supabase", "Firebase", "GraphQL"
  ],
  "Tools": [
    "Git", "GitHub", "Postman", "Linux", "Webpack", "Vite", "Jest",
    "Cypress", "Figma", "Jira", "Notion"
  ],
  "Cloud & DevOps": [
    "AWS", "Azure", "GCP", "DigitalOcean", "Vercel", "Docker",
    "Kubernetes", "Jenkins", "Terraform", "Cloudflare"
  ],
};

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGridView, setIsGridView] = useState<boolean>(true);

  useEffect(() => {
    setSkills(staticSkillsData);
    setLoading(false);
  }, []);

  const categorizeSkills = () => {
    const categorized: Record<string, Skill[]> = {};

    Object.keys(skillCategories).forEach((category) => {
      categorized[category] = [];
    });

    categorized["Others"] = [];

    skills.forEach((skill) => {
      let categoryFound = false;

      for (const [category, categorySkills] of Object.entries(skillCategories)) {
        if (categorySkills.includes(skill.name)) {
          categorized[category].push(skill);
          categoryFound = true;
          break;
        }
      }

      if (!categoryFound) {
        categorized["Others"].push(skill);
      }
    });

    Object.keys(categorized).forEach((category) => {
      if (categorized[category].length === 0) {
        delete categorized[category];
      }
    });

    return categorized;
  };

  const categorizedSkills = categorizeSkills();

  if (loading) {
    return (
      <section id="skills" className="w-full py-20 relative">
        <div className="w-full flex flex-col items-center justify-center gap-6 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
          <p className="text-zinc-400">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="w-full py-0 md:py-20 relative px-4 sm:px-6">
      <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 py-0 md:py-20">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-zinc-500 text-center text-xs sm:text-sm md:text-base font-thin tracking-widest uppercase mb-2 md:mb-4">
            I CONSTANTLY TRY TO IMPROVE
          </h4>

          <h2
            className={cn(
              "text-center text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-thin mb-3 md:mb-4",
              "bg-clip-text text-transparent",
              "bg-gradient-to-b from-zinc-900 to-zinc-600"
            )}
          >
            My Tech Stack
          </h2>

          <p className="text-zinc-600 text-center text-xs sm:text-sm md:text-base font-thin max-w-2xl px-2">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsGridView(true)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all duration-300",
              isGridView
                ? "bg-purple-500/10 border-purple-500 text-purple-700 shadow-lg shadow-purple-500/10"
                : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:border-zinc-300"
            )}
          >
            Grid View
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all duration-300",
              !isGridView
                ? "bg-purple-500/10 border-purple-500 text-purple-700 shadow-lg shadow-purple-500/10"
                : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:border-zinc-300"
            )}
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
                    };

                    return (
                      <motion.div
                        key={`grid-skill-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        style={{ "--skill-color": skillInfo.color } as React.CSSProperties}
                        className="relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-900 transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)] shadow-sm"
                      >
                        <span
                          className="group-hover:scale-110 transition-transform"
                          style={{ color: skillInfo.color }}
                        >
                          {skillInfo.icon}
                        </span>
                        <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4">
                  {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="flex flex-col">
                      <div className="relative mb-4">
                        <div className="relative bg-zinc-50/80 backdrop-blur-sm border border-zinc-200 rounded-lg p-3 shadow-sm">
                          <h3 className="text-zinc-900 text-lg font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {category}
                          </h3>
                          <div className="h-0.5 w-8 bg-gradient-to-r from-purple-600/50 to-pink-600/50 mt-2 rounded-full mx-auto"></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {categorySkills.map((skill, index) => {
                          const skillInfo = skillIconsMap[skill.name] ?? {
                            icon: <span>•</span>,
                            color: "#FFFFFF",
                          };

                          return (
                            <motion.div
                              key={`${category}-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              viewport={{ once: true }}
                              whileHover={{ y: -5, scale: 1.05 }}
                              style={{ "--skill-color": skillInfo.color } as React.CSSProperties}
                              className="relative group flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-900 transition-all duration-300 hover:border-[var(--skill-color)] hover:shadow-[0_0_15px_var(--skill-color)] shadow-sm"
                            >
                              <span
                                className="group-hover:scale-110 transition-transform"
                                style={{ color: skillInfo.color }}
                              >
                                {skillInfo.icon}
                              </span>
                              <span className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">
                                {skill.name}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>
    </section>
  );
};

export default SkillsSection;
