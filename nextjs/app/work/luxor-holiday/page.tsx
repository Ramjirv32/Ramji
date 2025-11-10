"use client"

import { motion } from "framer-motion"
import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const LuxorPage = () => {
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
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded-full text-sm font-medium">
              Freelance
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-sm font-medium">
              Current
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full Stack Developer
          </h1>
          <h2 className="text-2xl text-[#00BFFF] mb-6">Luxor Holiday Homes</h2>
          
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#00BFFF]" />
              <span>July 2025 - Aug 2025</span>
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
            src="/personal/Luxor.webp"
            alt="Luxor Holiday Homes"
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
              Luxor Holiday Homestay is a comprehensive booking platform that connects travelers with unique homestay experiences. As a co-founder and lead developer, I was responsible for architecting and implementing the entire technology stack, from the responsive frontend to the secure backend infrastructure.
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
              "🏡 Developed complete homestay booking platform with React.js and Node.js",
              "🔒 Integrated Cloudflare protection, SSL encryption, and security middleware",
              "💳 Successfully implemented Razorpay payment gateway for secure transactions",
              "🌐 Deployed frontend on Vercel with optimized performance and SEO",
              "📱 Ensured fully responsive design across all device sizes",
              "🔄 Implemented real-time booking updates and notifications"
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
            {["React.js", "Node.js & Express", "MongoDB", "Razorpay", "Cloudflare", "Vercel", "Tailwind CSS", "JWT"].map((tech, index) => (
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
            href="https://luxorholidayhomestays.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium shadow-lg hover:shadow-[#00BFFF]/50 hover:-translate-y-1"
          >
            <FaExternalLinkAlt />
            <span>Visit Luxor Holiday Homestays</span>
          </a>
        </motion.section>
      </div>
    </div>
  )
}

export default LuxorPage
