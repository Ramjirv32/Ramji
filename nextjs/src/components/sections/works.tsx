"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Animation variants
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
        type: "spring" as const,
        duration: 1.25,
        delay: delay || 0,
      },
    },
  };
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

const internships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "Oodser Technologies",
    duration: "Jan 2023 - April 2023",
    description: "Worked on LinkedIn-like platform and WTHBTWX app with enterprise architecture. Learned and implemented backend architecture, API design patterns, and full stack features using React, Node.js and MongoDB. Gained hands-on experience with scalable backend systems.",
    image: "/personal/OOdser.webp",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "REST APIs", "Backend Architecture"],
    route: "/work/oodser",
    live: "Coming Soon",
    current: false,
    type: "internship"
  },
  {
    id: 2,
    title: "Conference Website Developer",
    company: "ICBMNT 2025 - International Conference",
    duration: "Jan 2025 - Feb 2025",
    description: "Developed conference website for International Conference on Business Management and New Technologies 2025. Built responsive platform for conference information, schedule, and attendee registration with modern web technologies.",
    image: "/personal/Society.webp",
    skills: ["React", "Node.js", "Conference Management", "Registration System", "MongoDB"],
    route: "#",
    live: "https://societycisicmbnt2025.vercel.app/",
    current: false,
    type: "project"
  },
  {
    id: 3,
    title: "Full Stack Conference Platform Developer",
    company: "ICBMNT 2026 - Digital Conference Platform",
    duration: "Dec 2025 - Jan 2026",
    description: "Developed comprehensive digital conference management platform for ICBMNT 2026. Built fully automated system with paper submission, editor/reviewer assignment, automated plagiarism checking, registration management, payment verification, and admin dashboard. Implemented complete workflow automation for conference operations with role-based access control.",
    image: "/personal/Society.webp",
    skills: ["React", "Node.js", "Payment Integration", "Admin Dashboard", "Automation", "Role Management", "Paper Submission", "MongoDB"],
    route: "#",
    live: "https://icmbnt2026.societycis.org/",
    current: false,
    type: "project"
  },
  {
    id: 4,
    title: "Freelance Full Stack Developer",
    company: "Luxor Holiday Homes",
    duration: "July 2025 - August 2025",
    description: "Freelance consultation and development for homestay booking platform. Built with WordPress, React frontend, Node.js backend, Razorpay integration, MongoDB, Cloudflare security and SSL. Received ₹30,000 for development.",
    image: "/personal/Luxor.webp",
    skills: ["WordPress", "React", "Node.js", "MongoDB", "Razorpay", "Cloudflare"],
    route: "/work/luxor-holiday",
    live: "https://luxorholidayhomestays.com/",
    current: false,
    type: "freelance"
  },
  {
    id: 5,
    title: "Fullstack and DevOps",
    company: "End-to-End Full Stack DevOps Project",
    duration: "Dec 2025 - Current",
    description: "Currently developing a comprehensive full-stack DevOps project with microservices architecture on our own cloud infrastructure. Implementing CI/CD pipelines, containerization with Docker, Kubernetes orchestration, monitoring with Prometheus, and cloud deployment. Building scalable microservices with automated testing and deployment workflows while managing our own cloud environment.",
    image: "/assets/cloud.webp",
    skills: ["Docker", "Kubernetes", "Jenkins", "Cloud Infrastructure", "Microservices", "Terraform", "Prometheus", "DevOps"],
    route: "#",
    live: "Coming Soon",
    current: true,
    type: "project"
  }
];

const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const currentIndex = ((page % internships.length) + internships.length) % internships.length;
  const currentWork = internships[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section id="works" className="relative w-full py-10 md:py-20 bg-transparent overflow-hidden px-4 sm:px-6">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="text-center mb-8 md:mb-16 px-2"
      >
        <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-thin text-white">
          My <span className="text-zinc-400">Experience & Work</span>
        </h2>
        <motion.p
          variants={textVariant(0.2)}
          className="mt-2 md:mt-4 text-xs sm:text-sm md:text-base font-thin text-zinc-500 max-w-3xl mx-auto px-2"
        >
          Professional experience, internships, and freelance projects showcasing real-world application development
        </motion.p>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 -translate-x-2 sm:-translate-x-4"
            aria-label="Previous work"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 translate-x-2 sm:translate-x-4"
            aria-label="Next work"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Slider Content */}
          <div className="relative h-[500px] sm:h-[450px] md:h-[500px] flex items-center justify-center px-12 sm:px-10 md:px-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
              >
                <div className="relative group max-w-[300px] mx-auto sm:max-w-none">
                  <div className="relative bg-zinc-950/50 backdrop-blur-lg border border-zinc-800 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Header with Image and Title */}
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 border-zinc-800 flex-shrink-0 shadow-lg">
                          <Image
                            src={currentWork.image}
                            alt={currentWork.company}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-thin text-white mb-1 md:mb-2 group-hover:text-zinc-300 transition-colors">
                            {currentWork.title}
                          </h3>
                          <p className="text-zinc-400 font-semibold text-xs sm:text-sm md:text-base">{currentWork.company}</p>
                          <p className="text-zinc-500 text-xs sm:text-sm mt-0.5 md:mt-1">{currentWork.duration}</p>
                          {currentWork.current && (
                            <span className="inline-block mt-2 px-2 sm:px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full font-medium">
                              ⭐ Current Position
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-3xl">
                        {currentWork.description}
                      </p>

                      {/* Live Link Button */}
                      <div className="mb-6 flex items-center gap-4">
                        {currentWork.live && currentWork.live !== "Coming Soon" ? (
                          <a
                            href={currentWork.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors rounded-lg text-xs sm:text-sm font-bold shadow-lg"
                          >
                            View Live
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-500 rounded-lg text-xs sm:text-sm font-bold cursor-not-allowed">
                            Coming Soon
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {currentWork.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2 sm:px-3 py-1 md:py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs sm:text-sm md:text-base rounded-full hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {internships.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-zinc-700 hover:bg-zinc-600"
                  }`}
                aria-label={`Go to work ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
