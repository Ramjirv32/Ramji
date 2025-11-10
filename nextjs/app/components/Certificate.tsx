"use client"

import type React from "react"
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
      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div 
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-300"
        style={{
          background: '#151030',
          border: `2px solid rgba(255, 255, 255, 0.1)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = cert.gradient;
          e.currentTarget.style.border = `2px solid ${cert.borderColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#151030';
          e.currentTarget.style.border = `2px solid rgba(255, 255, 255, 0.1)`;
        }}
      >
        {/* Certificate Image */}
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onImageClick(cert)}>
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold">Click to view full certificate</span>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white text-lg font-bold leading-tight flex-1">
              {cert.name}
            </h3>
            <FaMedal className="text-xl flex-shrink-0" style={{ color: cert.borderColor }} />
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-xs">
            <FaAward className="text-[#00BFFF]" />
            <span>{cert.issuer}</span>
            <span className="mx-1">•</span>
            <span>{cert.date}</span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
            {cert.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {cert.tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {cert.source_code_link && (
              <a
                href={cert.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-xs"
              >
                <FaFilePdf />
                View Certificate
              </a>
            )}
            {cert.live_demo_link && (
              <a
                href={cert.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-xs"
              >
                <FaExternalLinkAlt />
                Learn More
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Certificate = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [selectedCert, setSelectedCert] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

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
        <div className="relative z-10" data-aos="fade-right" data-aos-duration="1000">
          <div className="flex items-center gap-3 mb-2">
            <FaMedal className="text-2xl md:text-3xl text-[#00BFFF]" />
            <p className="text-[#00BFFF] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
              My achievements
            </p>
          </div>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Certifications & <span className="text-[#00BFFF]">Credentials</span>
          </h2>
        </div>

        <div className="relative z-10 w-full flex" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          <p className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]">
            The following certifications validate my skills and expertise in various technologies and methodologies.
            Each certificate represents my commitment to continuous learning and professional growth in the rapidly evolving
            tech industry.
          </p>
        </div>

        {/* Slider Container */}
        <div className="mt-20 relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-[#00BFFF] hover:bg-[#0099CC] text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Previous certificates"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-[#00BFFF] hover:bg-[#0099CC] text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Next certificates"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Certificates Slider */}
          <div className="overflow-hidden px-2">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {projects.map((cert, index) => (
                <CertificateCard key={cert.name} cert={cert} index={index} onImageClick={openCertModal} />
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#00BFFF]'
                    : 'w-2 bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Instruction tip */}
        <div className="mt-10 flex justify-center">
          {/* <div className="bg-[#151030]/80 p-4 rounded-lg backdrop-blur-sm border border-[#00BFFF]/30 inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00BFFF] rounded-full animate-pulse"></div>
            <p className="text-gray-300 text-sm">
              Use navigation arrows or dots to explore certificates
            </p>
          </div> */}
        </div>
      </div>

      {/* Certificate Modal Popup */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeCertModal}
        >
          <div 
            className="relative bg-[#030014] border border-[#00BFFF]/30 rounded-2xl max-w-3xl w-full shadow-2xl scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 50px rgba(0, 191, 255, 0.3)"
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
              <img
                src={selectedCert.image}
                alt={selectedCert.name}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-bold mb-2">{selectedCert.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{selectedCert.issuer} • {selectedCert.date}</p>
                {selectedCert.source_code_link && (
                  <a
                    href={selectedCert.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#0096FF] text-white rounded-lg hover:from-[#0096FF] hover:to-[#00BFFF] transition-all duration-300 font-medium"
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