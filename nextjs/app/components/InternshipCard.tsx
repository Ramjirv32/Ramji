"use client"

import { motion } from "framer-motion"

interface Internship {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  image: string;
  skills: string[];
  route: string;
  bgColor: string;
  current: boolean;
  type: string;
}

interface InternshipCardProps {
  internship: Internship;
  index: number;
}

const cardVariants = {
  initial: { 
    y: 50, 
    opacity: 0,
    rotateX: 10,
  },
  animate: { 
    y: 0, 
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut" as const
    }
  },
  hover: {
    y: -8,
    rotateX: 5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const
    }
  }
}

const skillVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group relative w-full max-w-sm mx-auto"
      style={{ perspective: "1000px" }}
    >
      <div 
        className={`relative bg-gradient-to-br ${internship.bgColor} backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/20`}
        style={{
          background: `linear-gradient(135deg, 
            rgba(0, 191, 255, 0.1) 0%, 
            rgba(30, 144, 255, 0.05) 50%, 
            rgba(0, 0, 0, 0.3) 100%)`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }}
      >
        {/* Status indicator */}
        {internship.current && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-xs font-medium">Current</span>
            </div>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            internship.type === 'freelance' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
              : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
          }`}>
            {internship.type === 'freelance' ? 'Freelance' : 'Internship'}
          </span>
        </div>

        {/* Company image */}
        <div className="relative h-32 overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={internship.image}
            alt={internship.company}
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Duration */}
          <div className="mb-3">
            <span className="text-[#00BFFF] text-sm font-medium bg-[#00BFFF]/10 px-3 py-1 rounded-full border border-[#00BFFF]/20">
              {internship.duration}
            </span>
          </div>

          {/* Title and Company */}
          <div className="mb-4">
            <h3 className="text-white text-xl font-bold mb-1 group-hover:text-[#00BFFF] transition-colors duration-300">
              {internship.title}
            </h3>
            <p className="text-gray-300 text-sm font-medium">
              {internship.company}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {internship.description}
          </p>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  variants={skillVariants}
                  whileHover="hover"
                  className="px-2.5 py-1 bg-white/5 text-gray-300 text-xs rounded-md border border-white/10 hover:border-[#00BFFF]/30 hover:text-[#00BFFF] transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00BFFF]/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, #00BFFF, #1E90FF, #00BFFF)`,
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }}
        >
        </div>
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10 scale-105"></div>
    </motion.div>
  )
}