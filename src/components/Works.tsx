"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaExternalLinkAlt, FaCode, FaBuilding, FaPatreon, FaTimes } from "react-icons/fa"

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

// Modal Component
const Modal = ({ isOpen, onClose, work }: { isOpen: boolean; onClose: () => void; work: any }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-[#1d1836] rounded-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto z-50 relative border border-purple-500/30"
        ref={modalRef}
      >
        {/* Header with close button */}
        <div className="relative">
          <div className="h-[200px] w-full overflow-hidden">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1836] to-transparent"></div>
          </div>              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-600 transition-all z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-white font-bold text-2xl md:text-3xl">{work.title}</h2>
              <span className="text-purple-400 text-sm px-2 py-1 bg-purple-900/30 rounded-full">
                {work.type === "internship" ? "Internship" : "Patent"}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-purple-300">{work.company}</p>
              <span className="mx-2 text-gray-500">•</span>
              <p className="text-gray-400">{work.date}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Detailed description */}
            {work.type === "internship" ? (
              <div className="space-y-4">
                <p className="text-gray-300">
                  During my 3-month internship at Oodser Ltd, I had the opportunity to work on production-grade full-stack applications. I joined with JavaScript skills and significantly developed my TypeScript expertise through hands-on projects and excellent mentorship.
                </p>
                
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">Key Responsibilities & Achievements</h3>
                  <ul className="space-y-3">
                    {work.longDescription.map((item: string, i: number) => (
                      <li key={`modal-desc-${i}`} className="flex items-start">
                        <span className="text-purple-500 mr-2 mt-1">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">Work Environment & Growth</h3>
                  <p className="text-gray-300">
                    What made this internship particularly valuable was the supportive environment. The team encouraged questions and provided guidance whenever needed. The flexibility to explore different technologies and approaches enhanced my problem-solving abilities.
                  </p>
                  <p className="text-gray-300 mt-3">
                    By the end of the internship, I had not only improved my technical skills but also gained invaluable insights into professional software development practices, team collaboration, and industry standards. This experience has significantly shaped my approach to software development and prepared me for future professional challenges.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300">
                  My Smart Parking System patent represents an innovative solution designed to address the growing challenges of urban parking through the integration of IoT technology, mobile applications, and secure payment systems.
                </p>
                
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">Innovation & Technology</h3>
                  <ul className="space-y-3">
                    {work.longDescription.map((item: string, i: number) => (
                      <li key={`modal-desc-${i}`} className="flex items-start">
                        <span className="text-purple-500 mr-2 mt-1">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">Market Impact & Applications</h3>
                  <p className="text-gray-300">
                    This system has significant potential to transform urban parking management by reducing congestion, optimizing space utilization, and improving the overall user experience. The patent-pending technology combines hardware sensors with sophisticated software algorithms to provide real-time data and predictive analytics.
                  </p>
                  <p className="text-gray-300 mt-3">
                    The solution is scalable for various applications, from small private lots to large municipal parking structures, and has been designed with an emphasis on energy efficiency and cost-effectiveness. The patent application represents a culmination of extensive research, prototyping, and real-world testing.
                  </p>
                </div>
              </div>
            )}

            {/* Skills section */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-3">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {work.skills.map((skill: string, i: number) => (
                  <span 
                    key={`modal-skill-${i}`}
                    className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links section */}
            {work.links.length > 0 && (
              <div>
                <h3 className="text-white text-xl font-semibold mb-3">Related Links</h3>
                <div className="flex flex-wrap gap-3">
                  {work.links.map((link: any, i: number) => (
                    <a
                      key={`modal-link-${i}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 hover:bg-purple-800/50 text-white rounded-lg transition-all"
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
    image: "/in.gif",
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
    image: "/tech.png", // Using an existing image from the public folder
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
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
            
            {/* Skills */}
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {work.skills.slice(0, 3).map((skill: string, i: number) => (
                  <span 
                    key={`skill-${i}`}
                    className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
                {work.skills.length > 3 && (
                  <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30">
                    +{work.skills.length - 3}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center z-10 relative cursor-pointer"
              >
                Show More
                <svg
                  className="ml-1 w-4 h-4"
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
      
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} work={work} />
    </>
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