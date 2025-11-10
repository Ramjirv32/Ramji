"use client"

import { motion } from "framer-motion"
import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const SocietyPage = () => {
  return (
    <div className="min-h-screen bg-[#030014] pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/#works"
          className="inline-flex items-center gap-2 text-[#00BFFF] hover:text-[#0096FF] transition-colors mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Works</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-full text-sm font-medium">
              Internship
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-sm font-medium">
              Current
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full Stack Developer Intern
          </h1>
          <h2 className="text-2xl text-[#00BFFF] mb-6">Society for Cyber Intelligent Systems</h2>
          
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#00BFFF]" />
              <span>April 25 - May 25 Deployment - [July]</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-[#00BFFF]" />
              <span>Full Stack Development</span>
            </div>
          </div>
        </motion.div>

        {/* Company Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-[#00BFFF]/30"
        >
          <Image
            src="/personal/Society.webp"
            alt="Society for Cyber Intelligent Systems"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">About the Project</h3>
          <div className="bg-[#00BFFF]/5 border border-[#00BFFF]/30 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed">
              During my internship at KPRIET CSE Department under Dr. Vishnukumar, I worked with Mathan M to develop the complete societycis.org platform for Melange Publications in Pondicherry. This freelance-style project involved using modern full-stack technologies to create a comprehensive academic publishing platform.
            </p>
          </div>
        </motion.section>

        {/* Key Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "🌐 Full-Stack Website Development for academic publishing",
              "🔒 Implemented robust cybersecurity features and user authentication",
              "☁️ Managed cloud infrastructure using Cloudflare, GoDaddy, and Vercel",
              "👥 Collaborated effectively with team members and stakeholders",
              "📚 Implemented content management systems (WordPress and OJS)",
              "🎨 Created intuitive, responsive UI/UX across all devices"
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded-lg p-4"
              >
                <p className="text-gray-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Cloudflare", "WordPress", "OJS"].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 hover:border-[#00BFFF]/50 hover:bg-[#00BFFF]/10 transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* External Link */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="https://societycis.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium shadow-lg hover:shadow-[#00BFFF]/50 hover:-translate-y-1"
          >
            <FaExternalLinkAlt />
            <span>Visit societycis.org</span>
          </a>
        </motion.section>
      </div>
    </div>
  )
}

export default SocietyPage
