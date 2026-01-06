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
    current: false,
    type: "internship"
  },
  {
    id: 2,
    title: "Conference Website Developer",
    company: "ICBMNT 2025 - International Conference",
    duration: "Jan 2025 - Feb 2025",
    description: "Developed conference website for International Conference on Business Management and New Technologies 2025. Built responsive platform for conference information, schedule, and attendee registration with modern web technologies.",
    image: "/com/icbmnt.png",
    skills: ["React", "Node.js", "Conference Management", "Registration System", "MongoDB"],
    route: "#",
    current: false,
    type: "project"
  },
  {
    id: 3,
    title: "Full Stack Conference Platform Developer",
    company: "ICBMNT 2026 - Digital Conference Platform",
    duration: "Dec 2025 - Jan 2026",
    description: "Developed comprehensive digital conference management platform for ICBMNT 2026. Built fully automated system with paper submission, editor/reviewer assignment, automated plagiarism checking, registration management, payment verification, and admin dashboard. Implemented complete workflow automation for conference operations with role-based access control.",
    image: "/com/icbmnt.png",
    skills: ["React", "Node.js", "Payment Integration", "Admin Dashboard", "Automation", "Role Management", "Paper Submission", "MongoDB"],
    route: "#",
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
    <section id="works" className="relative w-full py-20 bg-transparent overflow-hidden">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-zinc-400">Experience & Work</span>
        </h2>
        <motion.p
          variants={textVariant(0.2)}
          className="mt-4 text-lg text-zinc-500 max-w-3xl mx-auto"
        >
          Professional experience, internships, and freelance projects showcasing real-world application development
        </motion.p>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 -translate-x-4 sm:-translate-x-6"
            aria-label="Previous work"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 translate-x-4 sm:translate-x-6"
            aria-label="Next work"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Content */}
          <div className="relative h-[500px] sm:h-[450px] flex items-center justify-center px-12 sm:px-16">
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
                <div className="relative group">
                  <div className="relative bg-zinc-950/50 backdrop-blur-lg border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
                    <div className="p-8 sm:p-10">
                      {/* Header with Image and Title */}
                      <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-800 flex-shrink-0 shadow-lg">
                          <Image
                            src={currentWork.image}
                            alt={currentWork.company}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                            {currentWork.title}
                          </h3>
                          <p className="text-zinc-400 font-semibold text-lg">{currentWork.company}</p>
                          <p className="text-zinc-500 text-sm mt-1">{currentWork.duration}</p>
                          {currentWork.current && (
                            <span className="inline-block mt-3 px-4 py-1.5 bg-white/10 border border-white/20 text-white text-xs rounded-full font-medium">
                              ⭐ Current Position
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-3xl">
                        {currentWork.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {currentWork.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-sm rounded-full hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 font-medium"
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
