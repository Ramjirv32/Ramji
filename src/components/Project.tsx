import React, { useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion"; // Adding framer motion for animations

interface Project {
  title: string;
  date: string;
  description: string[];
  image: string; // Changed from 'any' to 'string' for image paths
  liveLink: string;
  githubLink: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    title: "Vehicle Rental System",
    date: "October 2023",
    description: [
      "Developed a comprehensive vehicle rental management system in C",
      "Implemented user authentication and booking functionality using file handling",
      "Created efficient data structures and memory management",
      "Built robust error handling and input validation with C standard library"
    ],
    image: "/assets/grs.jpg", // Corrected to .jpg extension
    liveLink: "#",
    githubLink: "https://github.com/Ramjirv32/Vehicle-Rental-System",
    technologies: ["C", "Data Structures", "File I/O", "Memory Management"]
  },
  {
    title: "Weather API Integration",
    date: "July 2023",
    description: [
      "Built a weather application using Node.js and Open Weather API",
      "Implemented real-time weather data fetching and display",
      "Created responsive UI for multiple device compatibility",
      "Integrated error handling and loading states"
    ],
    image: "/assets/api.png", // Corrected path
    liveLink: "https://weather-api-in-react-js.vercel.app/",
    githubLink: "https://github.com/Ramjirv32/Weather-API-in-REACT-JS",
    technologies: ["React", "Node.js", "API", "Tailwind CSS"]
  },
  {
    title: "Smart Parking System",
    date: "April 2023 - July 2023",
    description: [
      "Led development of a full-stack parking system website",
      "Implemented real-time parking space tracking with IoT",
      "Designed booking and reservation management system",
      "Coordinated with team for seamless integration"
    ],
    image: "/assets/aadhya.png", // Corrected path
    liveLink: "https://parking-orcin-tau.vercel.app/",
    githubLink: "https://github.com/Ramjirv32/Smart-Parking-System",
    technologies: ["React", "Node.js", "IoT", "PostgreSQL"]
  },
  {
    title: "AI Image Generator",
    date: "September 2023",
    description: [
      "Developed AI-powered text-to-image generation system",
      "Integrated Hugging Face API for image processing",
      "Optimized response times and error handling",
      "Implemented secure API authentication"
    ],
    image: "/assets/Hug.png", // Corrected path
    liveLink: "https://ai-image-generator-hugging-face.vercel.app/",
    githubLink: "https://github.com/Ramjirv32/AI-image-Generator-HUGGING-FACE",
    technologies: ["Node.js", "Hugging Face API", "React", "Express"]
  },
  {
    title: "AI-Integrated Application",
    date: "October 2023 - Present",
    description: [
      "Building advanced AI features and integrations",
      "Implementing modern UI/UX design principles",
      "Developing scalable backend architecture",
      "Optimizing performance and user experience"
    ],
    image: "/assets/ai.png", // Corrected path
    liveLink: "https://ai-intergrated-application-qwuv.vercel.app/",
    githubLink: "https://github.com/Ramjirv32/AI-Intergrated-Application",
    technologies: ["React", "AI APIs", "Node.js", "PostgreSQL"]
  }
];

// Get a unique icon for each project based on technologies
const getProjectIcon = (technologies: string[]): string => {
  if (technologies.includes("C")) return "💻";
  if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) return "🤖";
  if (technologies.includes("IoT")) return "🚗";
  if (technologies.includes("API")) return "🌤️";
  return "📱";
};

// Fix project card layout - adjust the relevant sections
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className="relative flex flex-col md:flex-row items-center mb-20 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line - only show on medium screens and up */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent hidden md:block"></div>
      
      {/* Timeline circle - make it smaller on mobile */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gray-800 border-4 border-purple-600 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.2 }}
      >
        <span className="text-xl md:text-2xl">{getProjectIcon(project.technologies)}</span>
      </motion.div>
      
      {/* Project card - make it full width on small screens */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} mt-8 md:mt-0`}>
        <motion.div 
          className="bg-[#151030]/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-purple-500/20 shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
          whileHover={{ y: -5 }}
        >
          {/* Project image */}
          <div className="mb-4 overflow-hidden rounded-lg">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-36 md:h-48 object-cover object-center rounded-lg transition-transform duration-500 hover:scale-110" 
            />
          </div>

          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          
          <ul className="text-gray-400 text-sm space-y-2 mb-4">
            {project.description.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project links */}
          <div className="flex gap-3 mt-4">
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-colors duration-300"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            
            {project.liveLink && project.liveLink !== "#" && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-full text-sm transition-colors duration-300"
              >
                <FaExternalLinkAlt className="mr-2" /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Period indicator - show above card on mobile */}
      <motion.div 
        className={`w-full md:w-5/12 md:absolute md:top-0 ${isEven ? 'md:right-0 md:pr-4' : 'md:left-0 md:pl-4'} mb-4 md:mb-0`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        <div className={`text-center md:${isEven ? 'text-right' : 'text-left'}`}>
          <span className="text-gray-200 text-sm font-medium bg-purple-900/50 px-4 py-1.5 rounded-full border border-purple-500/30 shadow-lg">
            {project.date}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#030014] to-[#080324] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-purple-400 text-sm uppercase tracking-wider mb-4">
            WHAT I HAVE BUILT SO FAR
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Projects<span className="text-purple-500">.</span>
          </h1>
        </motion.div>
        
        {/* Projects Timeline - ensure that the container doesn't hide any content */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
          
          {/* Timeline end */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gradient-to-b from-purple-500 to-transparent bottom-0 hidden md:block"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.5 }}
          ></motion.div>
        </div>
        
        {/* Footer text */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            These projects showcase my skills and experience through real-world examples of my work. 
            Each project represents a unique challenge that I've tackled successfully, 
            demonstrating my ability to solve complex problems and deliver robust solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;