"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaExternalLinkAlt, FaCode, FaBuilding, FaPatreon } from "react-icons/fa"

// Animation variants - reuse from certificates
const fadeIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  }
}

const textVariant = (delay?: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  }
}

// Work experiences and achievement data
const works = [
  {
    title: "Full Stack Developer Internship",
    company: "Oodser Ltd",
    date: "Jan - Apr 2025",
    description: 
      "Successfully completed a 3-month internship working on full-stack applications. Started with JavaScript skills and developed TypeScript proficiency. Gained valuable experience with company architecture, GitHub workflow, and CI/CD actions in a supportive environment.",
    longDescription: [
      "Worked on production-grade full-stack applications using TypeScript, React, and Node.js",
      "Received excellent mentorship from Harsha Magapu and Shashank Aluru, enhancing my TypeScript skills",
      "Experienced a free and open work environment without pressure, with support available anytime",
      "Gained insights into company architecture, file structure, GitHub flow, and CI/CD actions",
      "Consistently received motivation and guidance when facing technical challenges"
    ],
    skills: ["TypeScript", "React", "Node.js", "GitHub Actions", "CI/CD"],
    image: "/assets/oodser-internship.jpg",
    icon: <FaBuilding className="text-xl" />,
    links: [
      { 
        name: "Company Site", 
        url: "https://oodser.com",
        icon: <FaExternalLinkAlt />
      }
    ],
    type: "internship"
  },
  {
    title: "Smart Parking System Patent",
    company: "Patent Application",
    date: "2025",
    description: 
      "Developed and filed a patent for an innovative Smart Parking System that integrates IoT technology for real-time parking space monitoring, advanced booking capabilities, and secure payment processing.",
    longDescription: [
      "Designed a comprehensive solution for urban parking challenges using IoT sensors",
      "Implemented real-time parking availability tracking via web and mobile applications",
      "Created a reservation system allowing users to book spaces in advance",
      "Integrated secure payment processing for a seamless user experience",
      "Developed analytics to help parking lot owners optimize space utilization"
    ],
    skills: ["IoT", "Web Development", "Mobile Development", "Payment Integration", "Real-time Systems"],
    image: "/assets/patent.jpg",
    icon: <FaPatreon className="text-xl" />,
    links: [
      { 
        name: "Demo Site", 
        url: "https://parking-orcin-tau.vercel.app/", 
        icon: <FaExternalLinkAlt /> 
      },
      { 
        name: "Source Code", 
        url: "https://github.com/username/parking-system", 
        icon: <FaCode /> 
      }
    ],
    type: "patent"
  }
]

// Work Card component
const WorkCard = ({ work, index }: { work: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="w-full md:w-[48%] lg:w-[48%] p-5"
    >
      <div className="bg-[#151030]/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-[200px]">
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151030] to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-purple-600 text-white p-2 rounded-full">
            {work.icon}
          </div>
          {/* Links */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {work.links.map((link: any, i: number) => (
              <a
                key={`link-${i}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-600 transition-all"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-xl md:text-2xl">{work.title}</h3>
            <span className="text-purple-400 text-sm px-2 py-1 bg-purple-900/30 rounded-full">
              {work.type === "internship" ? "Internship" : "Patent"}
            </span>
          </div>
          
          <div className="flex items-center mb-4">
            <p className="text-purple-300 text-sm">{work.company}</p>
            <span className="mx-2 text-gray-500">•</span>
            <p className="text-gray-400 text-sm">{work.date}</p>
          </div>
          
          <p className="text-gray-300 mb-4">{work.description}</p>
          
          {/* Expandable details */}
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
            <ul className="space-y-2 mb-4">
              {work.longDescription.map((item: string, i: number) => (
                <li key={`desc-${i}`} className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Skills */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {work.skills.map((skill: string, i: number) => (
                <span 
                  key={`skill-${i}`}
                  className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center"
            >
              {isExpanded ? "Show Less" : "Show More"}
              <svg
                className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// SectionWrapper HOC
const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <section id={idName} className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8 py-20">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    )
  }

// Main Works component
const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()} initial="hidden" animate={isLoaded ? "show" : "hidden"}>
        <p className="text-[#dfd9ff] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
          My professional journey
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Work & Innovation</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]"
        >
          Showcasing my professional experiences and innovative projects that demonstrate my problem-solving approach
          and technical capabilities in real-world applications.
        </motion.p>
      </div>

      <div className="mt-16 relative">
        <div className="flex flex-wrap justify-between gap-y-10">
          {works.map((work, index) => (
            <WorkCard key={`work-${index}`} work={work} index={index} />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-600/5 blur-3xl"></div>
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(Works, "works");