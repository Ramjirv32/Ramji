"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaAward, FaMedal, FaFilePdf, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import AOS from 'aos'
import 'aos/dist/aos.css'


const projects = [
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
  }
]


const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
      })
    }, [])

    return (
      <section id={idName} className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8 py-20">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    )
  }

const CertificateCard = ({ cert, index, onImageClick }: { cert: typeof projects[0], index: number, onImageClick: (cert: typeof projects[0]) => void }) => {
  return (
    <div 
      className="relative group cursor-pointer h-auto"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${index * 100}`}
      onClick={() => onImageClick(cert)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-[#8B5CF6]/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#8B5CF6]/20 p-3 flex flex-col h-full">
        {/* Certificate Image Container - Display Image */}
        <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] mb-4 overflow-hidden rounded-lg bg-black/20">
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
              <FaAward className="text-2xl md:text-3xl mb-2 mx-auto" />
              <p className="font-semibold text-xs md:text-sm">Click to Expand</p>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="space-y-2 flex-grow">
          <div>
            <h3 className="text-white font-bold text-xs md:text-sm line-clamp-1 mb-1">
              {cert.name}
            </h3>
            <p className="text-[#8B5CF6] font-semibold text-xs">{cert.issuer}</p>
            <p className="text-gray-400 text-xs">{cert.date}</p>
          </div>

          {/* Tags - Reduced */}
          <div className="flex flex-wrap gap-1">
            {cert.tags?.slice(0, 2).map((tag: any) => (
              <span
                key={tag.name}
                className="px-2 py-0.5 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6] text-xs rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="mt-3 pt-2 border-t border-white/10">
          <button className="w-full py-2 px-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-lg text-xs md:text-sm font-semibold hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all duration-300 flex items-center justify-center gap-2">
            <FaAward className="text-xs" />
            View Full
          </button>
        </div>
      </div>
    </div>
  );
};

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState<typeof projects[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("cloud");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    })
  }, [])

  const categories = [
    { id: "cloud", label: "Cloud & Infrastructure", count: projects.filter(p => p.issuer.includes("AWS") || p.issuer.includes("Red Hat")).length },
    { id: "development", label: "Development", count: projects.filter(p => p.issuer.includes("Udemy") || p.issuer.includes("GitHub")).length },
    { id: "database", label: "Database & Tools", count: projects.filter(p => p.issuer.includes("MongoDB")).length },
    { id: "all", label: "All Certifications", count: projects.length }
  ];

  const filteredCerts = activeCategory === "all" 
    ? projects 
    : activeCategory === "cloud"
    ? projects.filter(p => p.issuer.includes("AWS") || p.issuer.includes("Red Hat"))
    : activeCategory === "development"
    ? projects.filter(p => p.issuer.includes("Udemy") || p.issuer.includes("GitHub"))
    : projects.filter(p => p.issuer.includes("MongoDB"));

  const openCertModal = (cert: typeof projects[0]) => {
    setSelectedCert(cert);
  };

  const closeCertModal = () => {
    setSelectedCert(null);
  };

  return (
    <>
      <div className="relative">
        {/* Header section */}
        <div className="relative z-10 mb-12" data-aos="fade-right" data-aos-duration="1000">
          <div className="flex items-center gap-3 mb-2">
            <FaMedal className="text-2xl md:text-3xl text-[#8B5CF6]" />
            <p className="text-[#8B5CF6] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
              My achievements
            </p>
          </div>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Certifications & <span className="text-[#8B5CF6]">Credentials</span>
          </h2>
        </div>

        <div className="relative z-10 w-full mb-12" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          <p className="text-gray-300 text-[17px] max-w-3xl leading-[30px]">
            The following certifications validate my skills and expertise in various technologies and methodologies.
            Each certificate represents my commitment to continuous learning and professional growth in the rapidly evolving
            tech industry.
          </p>
        </div>

        {/* Category Filter Tabs - Responsive */}
        <div className="mb-12 flex flex-wrap gap-2 md:gap-3 lg:gap-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 border-2 text-xs md:text-sm lg:text-base ${
                activeCategory === category.id
                  ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/50"
                  : "bg-white/5 text-gray-300 border-white/20 hover:border-[#8B5CF6]/50 hover:text-white"
              }`}
            >
              {category.label}
              <span className={`ml-2 text-xs ${activeCategory === category.id ? "bg-white/30" : "bg-white/10"} px-2 py-0.5 rounded-full`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Certificates Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
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

        {/* Stats Section - Responsive */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:border-[#8B5CF6]/30 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2">{projects.length}</div>
            <p className="text-gray-300 text-sm md:text-base">Total Certifications</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:border-[#8B5CF6]/30 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2">5+</div>
            <p className="text-gray-300 text-sm md:text-base">Technology Domains</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:border-[#8B5CF6]/30 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2">2024-25</div>
            <p className="text-gray-300 text-sm md:text-base">Year of Achievement</p>
          </div>
        </div>
      </div>

      {/* Certificate Modal Popup */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeCertModal}
        >
          <div 
            className="relative bg-[#030014] border border-[#8B5CF6]/30 rounded-2xl max-w-3xl w-full shadow-2xl scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 50px rgba(139, 92, 246, 0.3)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeCertModal}
              className="absolute top-3 right-3 z-10 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors border border-red-500/50"
            >
              <FaTimes className="text-red-400 text-lg" />
            </button>

            {/* Certificate Image */}
            <div className="p-4">
              <Image
                src={selectedCert.image}
                alt={selectedCert.name}
                width={1280}
                height={720}
                className="h-auto w-full rounded-lg object-contain"
                sizes="(max-width: 768px) 90vw, 60vw"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-bold mb-2">{selectedCert.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{selectedCert.issuer} • {selectedCert.date}</p>
                {selectedCert.source_code_link && (
                  <a
                    href={selectedCert.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-lg hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-300 font-medium"
                  >
                    <FaFilePdf />
                    Download Certificate PDF
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

export default SectionWrapper(Certificate, "certificates")