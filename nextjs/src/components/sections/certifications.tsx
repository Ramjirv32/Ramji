"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaAward, FaMedal, FaFilePdf, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"

const certifications = [
  {
    name: "Red Hat Certified System Administrator",
    description:
      "Industry-recognized certification that validates the skills needed to manage and configure Red Hat Enterprise Linux systems. Covers system administration, storage configuration, and security management.",
    tags: [
      {
        name: "Linux",
        color: "text-red-500",
      },
      {
        name: "System Administration",
        color: "text-yellow-400",
      },
      {
        name: "Red Hat",
        color: "text-[#EE0000]",
      },
    ],
    image: "/com/redhat.webp",
    source_code_link: "/com/redhat.pdf",
    live_demo_link: "https://www.redhat.com/en/services/certification/rhcsa",
    issuer: "Red Hat",
    date: "2024",
    borderColor: "#EE0000",
    gradient: "linear-gradient(145deg, #EE0000, #151030)"
  },
  {
    name: "Web Development Bootcamp",
    description:
      "Comprehensive certification that validates proficiency in modern web development technologies, frameworks, and best practices. Covers front-end and back-end development.",
    tags: [
      {
        name: "HTML/CSS",
        color: "text-orange-400",
      },
      {
        name: "JavaScript",
        color: "text-yellow-400",
      },
      {
        name: "React",
        color: "text-[#00BFFF]",
      },
    ],
    image: "/assets/UdemyWeb.webp",
    source_code_link: "/assets/UdemyWeb.pdf",
    live_demo_link: "https://udemy.com",
    issuer: "Udemy",
    date: "July 2024",
    borderColor: "#FF6600",
    gradient: "linear-gradient(165deg, #FF6600, #151030)"
  },
  {
    name: "AWS Cloud Practitioner",
    description:
      "Foundational certification that validates understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Demonstrates knowledge of core AWS services and use cases.",
    tags: [
      {
        name: "AWS",
        color: "text-yellow-400",
      },
      {
        name: "Cloud",
        color: "text-[#00BFFF]",
      },
      {
        name: "Infrastructure",
        color: "text-[#1E90FF]",
      },
    ],
    image: "/assets/aws.webp",
    source_code_link: "/assets/aws.pdf",
    live_demo_link: "https://aws.amazon.com/certification/",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    borderColor: "#FF9900",
    gradient: "linear-gradient(195deg, #FF9900, #151030)"
  },
  {
    name: "MongoDB Certification",
    description:
      "Professional certification that validates expertise in MongoDB database administration, data modeling, querying, indexing, and application development with MongoDB.",
    tags: [
      {
        name: "MongoDB",
        color: "text-green-500",
      },
      {
        name: "Database",
        color: "text-[#00BFFF]",
      },
      {
        name: "NoSQL",
        color: "text-[#1E90FF]",
      },
    ],
    image: "/assets/MONGO.webp",
    source_code_link: "/assets/MONGO.pdf",
    live_demo_link: "https://www.mongodb.com/certification",
    issuer: "MongoDB",
    date: "Jan 2025",
    borderColor: "#13AA52",
    gradient: "linear-gradient(210deg, #13AA52, #151030)"
  },
  {
    name: "GitHub Foundations",
    description:
      "Certification that validates fundamental knowledge of GitHub products, version control concepts, collaboration features, and best practices for managing projects and contributing to open-source.",
    tags: [
      {
        name: "Git",
        color: "text-orange-400",
      },
      {
        name: "GitHub",
        color: "text-purple-400",
      },
      {
        name: "Version Control",
        color: "text-pink-400",
      },
    ],
    image: "/assets/github.webp",
    source_code_link: "/assets/github.pdf",
    live_demo_link: "https://github.com/certifications",
    issuer: "GitHub",
    date: "2025",
    borderColor: "#6E5494",
    gradient: "linear-gradient(225deg, #6E5494, #151030)"
  },
  {
    name: "Google Agent Course",
    description:
      "Certification that validates knowledge of building and deploying AI agents using Google Cloud technologies, including agent frameworks, prompt engineering, and integration with Google services.",
    tags: [
      {
        name: "Google Cloud",
        color: "text-blue-400",
      },
      {
        name: "AI Agents",
        color: "text-green-400",
      },
      {
        name: "Machine Learning",
        color: "text-yellow-400",
      },
    ],
    image: "/com/agent.webp",
    source_code_link: "/com/agent.pdf",
    live_demo_link: "https://cloud.google.com/",
    issuer: "Google Cloud",
    date: "2026",
    borderColor: "#4285F4",
    gradient: "linear-gradient(240deg, #4285F4, #151030)"
  }
]

const CertificateCard = ({ cert, index, onImageClick }: { cert: typeof certifications[0], index: number, onImageClick: (cert: typeof certifications[0]) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group cursor-pointer h-auto"
      onClick={() => onImageClick(cert)}
    >
      <div className="relative bg-zinc-950/50 backdrop-blur-lg border border-zinc-800 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 p-2 sm:p-3 md:p-4 flex flex-col h-full">
        {/* Certificate Image Container */}
        <div className="relative w-full h-[160px] sm:h-[200px] md:h-[260px] mb-2 sm:mb-3 md:mb-4 overflow-hidden rounded-md sm:rounded-lg bg-black/20">
          <Image
            src={cert.image}
            alt={cert.name}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index === 0}
            quality={85}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
            <div className="text-white text-center">
              <FaAward className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 mx-auto" />
              <p className="font-semibold text-[10px] sm:text-xs md:text-sm">Click to Expand</p>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="space-y-1 sm:space-y-2 flex-grow">
          <div>
            <h3 className="text-white font-bold text-xs md:text-sm line-clamp-1 mb-1">
              {cert.name}
            </h3>
            <p className="text-zinc-400 font-semibold text-xs">{cert.issuer}</p>
            <p className="text-zinc-500 text-xs">{cert.date}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {cert.tags?.slice(0, 2).map((tag: any) => (
              <span
                key={tag.name}
                className="px-2 py-0.5 bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-xs rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="mt-3 pt-2 border-t border-zinc-800">
          <button className="w-full py-2 px-3 bg-white text-black rounded-lg text-xs md:text-sm font-medium hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2">
            <FaAward className="text-xs" />
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "cloud", label: "Cloud & Infrastructure", count: certifications.filter(p => p.issuer.includes("Amazon Web Services") || p.issuer.includes("Red Hat") || p.issuer.includes("Google Cloud")).length },
    { id: "development", label: "Development", count: certifications.filter(p => p.issuer.includes("Udemy") || p.issuer.includes("GitHub")).length },
    { id: "database", label: "Database & Tools", count: certifications.filter(p => p.issuer.includes("MongoDB")).length },
    { id: "all", label: "All Certifications", count: certifications.length }
  ];

  const filteredCerts = activeCategory === "all"
    ? certifications
    : activeCategory === "cloud"
      ? certifications.filter(p => p.issuer.includes("Amazon Web Services") || p.issuer.includes("Red Hat") || p.issuer.includes("Google Cloud"))
      : activeCategory === "development"
        ? certifications.filter(p => p.issuer.includes("Udemy") || p.issuer.includes("GitHub"))
        : certifications.filter(p => p.issuer.includes("MongoDB"));

  const openCertModal = (cert: typeof certifications[0]) => {
    setSelectedCert(cert);
  };

  const closeCertModal = () => {
    setSelectedCert(null);
  };

  return (
    <>
      <section id="certifications" className="relative w-full py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10 mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaMedal className="text-2xl md:text-3xl text-zinc-400" />
              <p className="text-zinc-400 font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
                My achievements
              </p>
            </div>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              Certifications & <span className="text-zinc-400">Credentials</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10 w-full mb-12"
          >
            <p className="text-gray-300 text-[17px] max-w-3xl leading-[30px]">
              The following certifications validate my skills and expertise in various technologies and methodologies.
              Each certificate represents my commitment to continuous learning and professional growth in the rapidly evolving
              tech industry.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap gap-2 md:gap-3 lg:gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 border-2 text-xs md:text-sm lg:text-base ${activeCategory === category.id
                  ? "bg-white text-black border-white shadow-lg shadow-white/20"
                  : "bg-zinc-950/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
              >
                {category.label}
                <span className={`ml-2 text-xs ${activeCategory === category.id ? "bg-black/30" : "bg-zinc-800"} px-2 py-0.5 rounded-full`}>
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredCerts.map((cert, index) => (
              <CertificateCard key={cert.name} cert={cert} index={index} onImageClick={openCertModal} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCerts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No certifications in this category yet.</p>
            </div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 md:p-6 text-center hover:border-zinc-700 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{certifications.length}</div>
              <p className="text-zinc-400 text-sm md:text-base">Total Certifications</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 md:p-6 text-center hover:border-zinc-700 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
              <p className="text-zinc-400 text-sm md:text-base">Technology Domains</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 md:p-6 text-center hover:border-zinc-700 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2024-25</div>
              <p className="text-zinc-400 text-sm md:text-base">Year of Achievement</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal Popup */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
          onClick={closeCertModal}
        >
          <div
            className="relative bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl max-w-[92vw] sm:max-w-md md:max-w-lg w-full max-h-[80vh] shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 50px rgba(255, 255, 255, 0.1)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeCertModal}
              className="sticky top-2 right-2 z-10 p-1.5 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors border border-red-500/50 float-right mr-2 mt-2"
            >
              <FaTimes className="text-red-400 text-sm" />
            </button>

            {/* Certificate Image */}
            <div className="p-3 sm:p-4 md:p-5">
              <Image
                src={selectedCert.image}
                alt={selectedCert.name}
                width={1280}
                height={720}
                className="h-auto w-full rounded-lg object-contain"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 60vw"
              />
              <div className="mt-3 text-center">
                <h3 className="text-white text-base sm:text-lg font-bold mb-1">{selectedCert.name}</h3>
                <p className="text-gray-400 text-[11px] sm:text-xs mb-3">{selectedCert.issuer} • {selectedCert.date}</p>
                {selectedCert.source_code_link && (
                  <a
                    href={selectedCert.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all duration-300 font-medium text-[11px] sm:text-xs"
                  >
                    <FaFilePdf size={12} />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Certifications;
