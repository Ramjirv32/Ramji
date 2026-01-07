"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaAward, FaMedal, FaFilePdf, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const certifications = [
  {
    name: "Red Hat Certified System Administrator",
    description:
      "Industry-recognized certification that validates the skills needed to manage and configure Red Hat Enterprise Linux systems. Covers system administration, storage configuration, and security management.",
    tags: [
      { name: "Linux", color: "text-red-500" },
      { name: "System Administration", color: "text-yellow-400" },
      { name: "Red Hat", color: "text-[#EE0000]" },
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
      { name: "HTML/CSS", color: "text-orange-400" },
      { name: "JavaScript", color: "text-yellow-400" },
      { name: "React", color: "text-[#00BFFF]" },
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
      { name: "AWS", color: "text-yellow-400" },
      { name: "Cloud", color: "text-[#00BFFF]" },
      { name: "Infrastructure", color: "text-[#1E90FF]" },
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
      { name: "MongoDB", color: "text-green-500" },
      { name: "Database", color: "text-[#00BFFF]" },
      { name: "NoSQL", color: "text-[#1E90FF]" },
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
      { name: "Git", color: "text-orange-400" },
      { name: "GitHub", color: "text-purple-400" },
      { name: "Version Control", color: "text-pink-400" },
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
      { name: "Google Cloud", color: "text-blue-400" },
      { name: "AI Agents", color: "text-green-400" },
      { name: "Machine Learning", color: "text-yellow-400" },
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

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [[page, direction], setPage] = useState([0, 0]);

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

  const currentIndex = ((page % filteredCerts.length) + filteredCerts.length) % filteredCerts.length;
  const currentCert = filteredCerts[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const closeCertModal = () => {
    setSelectedCert(null);
  };

  // Reset page when category changes
  useEffect(() => {
    setPage([0, 0]);
  }, [activeCategory]);

  return (
    <>
      <section id="certifications" className="relative w-full py-20 bg-transparent overflow-hidden px-4 sm:px-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-12">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10 mb-12 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <FaMedal className="text-2xl md:text-3xl text-zinc-400" />
              <p className="text-zinc-400 font-thin lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
                My achievements
              </p>
            </div>
            <h2 className="text-white font-thin md:text-7xl lg:text-8xl sm:text-[50px] xs:text-[40px] text-[30px]">
              Certifications & <span className="text-zinc-400">Credentials</span>
            </h2>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 lg:gap-4"
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

          {/* Slider Container */}
          <div className="relative w-full max-w-6xl mx-auto">
            {filteredCerts.length > 0 && (
              <div className="relative">
                {/* Navigation Buttons */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 -translate-x-2 sm:-translate-x-4 md:-translate-x-6"
                  aria-label="Previous certification"
                >
                  <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => paginate(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 translate-x-2 sm:translate-x-4 md:translate-x-6"
                  aria-label="Next certification"
                >
                  <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Slider Content */}
                <div className="relative h-[550px] sm:h-[450px] md:h-[500px] flex items-center justify-center px-6 sm:px-10 md:px-16 overflow-visible">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={page}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute w-full px-4"
                    >
                      <div className="relative group max-w-[320px] mx-auto sm:max-w-4xl md:max-w-none">
                        <div className="relative bg-zinc-950/50 backdrop-blur-lg border border-zinc-800 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 shadow-2xl">
                          <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
                            {/* Certificate Image Container */}
                            <div
                              className="relative w-full h-[200px] sm:h-[220px] md:w-[350px] md:h-[240px] lg:w-[450px] lg:h-[300px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-zinc-800 flex-shrink-0 shadow-lg group/img cursor-pointer"
                              onClick={() => setSelectedCert(currentCert)}
                            >
                              <Image
                                src={currentCert.image}
                                alt={currentCert.name}
                                fill
                                className="object-cover w-full h-full group-hover/img:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, 450px"
                                quality={90}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                                <div className="text-white text-center">
                                  <FaAward className="text-2xl md:text-3xl mb-2 mx-auto" />
                                  <p className="font-semibold text-xs md:text-sm">Click to Expand</p>
                                </div>
                              </div>
                            </div>

                            {/* Certificate Info */}
                            <div className="flex-1 flex flex-col justify-center py-2">
                              <div className="mb-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-white mb-2 group-hover:text-zinc-300 transition-colors leading-tight">
                                  {currentCert.name}
                                </h3>
                                <div className="flex items-center gap-3">
                                  <p className="text-zinc-400 font-semibold text-sm sm:text-base">{currentCert.issuer}</p>
                                  <span className="w-1 h-1 bg-zinc-700 rounded-full hidden sm:block"></span>
                                  <p className="text-zinc-500 text-sm sm:text-base font-medium">{currentCert.date}</p>
                                </div>
                              </div>

                              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">
                                {currentCert.description}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-8">
                                {currentCert.tags.map((tag: any) => (
                                  <span
                                    key={tag.name}
                                    className={`px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold ${tag.color}`}
                                  >
                                    #{tag.name}
                                  </span>
                                ))}
                              </div>

                              <div className="flex flex-wrap items-center gap-4">
                                <button
                                  onClick={() => setSelectedCert(currentCert)}
                                  className="w-full sm:w-auto py-3 px-6 bg-white text-black rounded-lg text-sm md:text-base font-bold hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                >
                                  <FaAward />
                                  View Certificate
                                </button>
                                {currentCert.source_code_link && (
                                  <a
                                    href={currentCert.source_code_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto py-3 px-6 bg-zinc-800 text-white rounded-lg text-sm md:text-base font-bold hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700 shadow-lg"
                                  >
                                    <FaFilePdf />
                                    Download PDF
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-10">
                  {filteredCerts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                      className={`transition-all duration-300 rounded-full ${index === currentIndex
                        ? "w-10 h-2.5 bg-white"
                        : "w-2.5 h-2.5 bg-zinc-800 hover:bg-zinc-700"
                        }`}
                      aria-label={`Go to certification ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredCerts.length === 0 && (
              <div className="text-center py-20 flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center border border-zinc-800">
                  <FaAward className="text-zinc-600 text-3xl" />
                </div>
                <p className="text-zinc-500 text-xl font-medium">No certifications found in this category.</p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-3xl p-8 text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">{certifications.length}</div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Total Credentials</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-3xl p-8 text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">5+</div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Technology Domains</p>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-3xl p-8 text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">2024-26</div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Achievement Span</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeCertModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-5xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeCertModal}
                className="absolute top-4 right-4 z-[110] p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all duration-300 border border-red-500/20"
              >
                <FaTimes />
              </button>

              <div className="flex-1 bg-black/50 p-4 md:p-8 flex items-center justify-center">
                <div className="relative w-full h-full aspect-[1.414/1] max-h-[70vh]">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    fill
                    className="object-contain"
                    priority
                    sizes="60vw"
                  />
                </div>
              </div>

              <div className="w-full md:w-[350px] p-8 border-l border-zinc-800 flex flex-col overflow-y-auto">
                <h3 className="text-white text-2xl font-bold mb-4">{selectedCert.name}</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Issuer</p>
                    <p className="text-white font-semibold">{selectedCert.issuer}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Date Assigned</p>
                    <p className="text-white font-semibold">{selectedCert.date}</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {selectedCert.description}
                </p>

                <div className="flex flex-col gap-3">
                  {selectedCert.source_code_link && (
                    <a
                      href={selectedCert.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all duration-300 w-full"
                    >
                      <FaFilePdf />
                      Download Certificate
                    </a>
                  )}
                  <button
                    onClick={closeCertModal}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all duration-300 w-full border border-zinc-800"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Certifications;
