"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InternshipCard } from "./InternshipCard"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaTimes, FaExternalLinkAlt, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'

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

const internships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "Oodser Technologies",
    duration: "Jan 2023 - April 2023",
    description: "Worked on LinkedIn-like platform and WTHBTWX app with enterprise architecture. Implemented full stack features using React, Node.js and MongoDB.",
    image: "/personal/OOdser.webp",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "REST APIs"],
    route: "/internship/oodser",
    bgColor: "from-blue-600/20 to-indigo-600/20",
    current: false,
    type: "internship",
    detailedDescription: `An incredible journey as a Full-Stack Developer Intern at Oodser, working on an innovative AI-integrated platform similar to LinkedIn that automates job-related tasks. This ambitious project taught me enterprise-level development and real-world problem-solving.`,
    achievements: [
      "🚀 Worked on innovative AI platform with LinkedIn-like features",
      "💻 Mastered React (JSX) and successfully transitioned to TypeScript (TSX)",
      "🏗️ Learned enterprise backend architecture with modular Node.js structure",
      "🗄️ Gained experience with MongoDB and database management",
      "🔐 Implemented security best practices and authentication systems",
      "⚡ Mastered REST APIs and complete API development lifecycle"
    ],
    technologies: ["React (JSX & TSX)", "TypeScript", "Node.js", "MongoDB", "REST APIs", "Git & GitHub", "Security Practices"],
    links: [{ name: "Visit Oodser", url: "https://oodser.com" }]
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "Society for Cyber Intelligent Systems",
    duration: "April 25- May 25 Deployment - [July]",
    description: "Developed societycis.org website with Mathan M for cyber intelligence systems. Built responsive web platform with modern security features and intelligent system integration.",
    image: "/personal/Society.webp",
    skills: ["React", "Node.js", "Security", "AI Integration", "MongoDB"],
    route: "/internship/society",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    current: true,
    type: "internship",
    detailedDescription: `During my internship at KPRIET CSE Department under Dr. Vishnukumar, I worked with Mathan M to develop the complete societycis.org platform for Melange Publications in Pondicherry. This freelance-style project involved using modern full-stack technologies to create a comprehensive academic publishing platform.`,
    achievements: [
      "🌐 Full-Stack Website Development for academic publishing",
      "🔒 Implemented robust cybersecurity features and user authentication",
      "☁️ Managed cloud infrastructure using Cloudflare, GoDaddy, and Vercel",
      "👥 Collaborated effectively with team members and stakeholders",
      "📚 Implemented content management systems (WordPress and OJS)",
      "🎨 Created intuitive, responsive UI/UX across all devices"
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Cloudflare", "WordPress", "OJS"],
    links: [{ name: "Visit societycis.org", url: "https://societycis.org" }]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Luxor Holiday Homes",
    duration: "July 2025 - Aug 2025",
    description: "Freelanced complete homestay booking platform as freelancer. Built with WordPress, React frontend, Node.js backend, Razorpay integration, MongoDB, Cloudflare security and SSL.",
    image: "/personal/Luxor.webp",
    skills: ["WordPress", "React", "Node.js", "MongoDB", "Razorpay", "Cloudflare"],
    route: "/internship/luxor-holiday",
    bgColor: "from-yellow-500/20 to-amber-500/20",
    current: true,
    type: "freelance",
    detailedDescription: `Luxor Holiday Homestay is a comprehensive booking platform that connects travelers with unique homestay experiences. As a co-founder and lead developer, I was responsible for architecting and implementing the entire technology stack, from the responsive frontend to the secure backend infrastructure.`,
    achievements: [
      "🏡 Developed complete homestay booking platform with React.js and Node.js",
      "🔒 Integrated Cloudflare protection, SSL encryption, and security middleware",
      "💳 Successfully implemented Razorpay payment gateway for secure transactions",
      "🌐 Deployed frontend on Vercel with optimized performance and SEO",
      "📱 Ensured fully responsive design across all device sizes",
      "🔄 Implemented real-time booking updates and notifications"
    ],
    technologies: ["React.js", "Node.js & Express", "MongoDB", "Razorpay", "Cloudflare", "Vercel", "Tailwind CSS", "JWT"],
    links: [{ name: "Visit Luxor Holiday Homestays", url: "https://luxorholidayhomestays.com/" }]
  }
];

const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof internships[0] | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const openModal = (work: typeof internships[0]) => {
    setSelectedWork(work);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedWork(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="works" className="relative w-full py-20 bg-transparent">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="text-center"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-[#00BFFF]">Experience & Freelance</span>
        </h2>
        <motion.p
          variants={textVariant(0.2)}
          className="mt-2 text-sm text-gray-400 sm:text-base"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Here are some of my recent works and experiences
        </motion.p>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 mt-12">
        {/* First Row - Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-4 mb-16">
          {internships.slice(0, 2).map((internship, index) => (
            <div 
              key={internship.id} 
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="w-full">
                <InternshipCard internship={internship} index={index} />
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => openModal(internship)}
                    className="px-6 py-2 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium shadow-lg hover:shadow-[#00BFFF]/50 hover:-translate-y-1"
                  >
                    View More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - One Card Centered */}
        <div className="flex justify-center px-4">
          <div 
            className="w-full max-w-lg lg:max-w-xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <InternshipCard internship={internships[2]} index={2} />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => openModal(internships[2])}
                className="px-6 py-2 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium shadow-lg hover:shadow-[#00BFFF]/50 hover:-translate-y-1"
              >
                View More Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div 
            className="relative bg-[#030014] border border-[#00BFFF]/30 rounded-2xl max-w-2xl w-full my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 50px rgba(0, 191, 255, 0.3)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors border border-red-500/50"
            >
              <FaTimes className="text-red-400 text-xl" />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedWork.type === 'freelance' 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  }`}>
                    {selectedWork.type === 'freelance' ? 'Freelance' : 'Internship'}
                  </span>
                  {selectedWork.current && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-sm font-medium">
                      Current
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selectedWork.title}
                </h2>
                <h3 className="text-xl text-[#00BFFF] mb-4">{selectedWork.company}</h3>
                
                <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#00BFFF]" />
                    <span>{selectedWork.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-[#00BFFF]" />
                    <span>Full Stack Development</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">About the Project</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedWork.detailedDescription}
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Key Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedWork.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded-lg p-3"
                    >
                      <p className="text-gray-300 text-sm">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWork.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {selectedWork.links && selectedWork.links.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-white mb-3">Links</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedWork.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium shadow-lg hover:shadow-[#00BFFF]/50"
                      >
                        <FaExternalLinkAlt />
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Details Link */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href={selectedWork.route}
                  className="inline-flex items-center gap-2 text-[#00BFFF] hover:text-[#0096FF] transition-colors font-medium"
                >
                  <span>View Complete Details Page</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;