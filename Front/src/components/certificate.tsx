"use client"
import type React from "react"
import { useEffect } from "react"
import { FaAward, FaMedal, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa"
import AOS from 'aos'
import 'aos/dist/aos.css'
import ChromaGrid from './ChromaGrid'
import type { ChromaItem } from './ChromaGrid'

// Enhanced certificates data with gradients and colors
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
    image: "/com/redhat.png",
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
    image: "/assets/UdemyWeb.png",
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
    image: "/assets/aws.png",
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
    image: "/assets/MONGO.png",
    source_code_link: "/assets/MONGO.pdf",
    live_demo_link: "/assets/github.pdf",
    issuer: "MongoDB",
    date: "Jan 2025",
    borderColor: "#13AA52",
    gradient: "linear-gradient(210deg, #13AA52, #151030)"
  },
  {
    name: "GitHub Foundations",
    description:
      "Planned certification aimed at strengthening my skills in version control, collaborative development, and open-source contribution using GitHub. Part of my ongoing commitment to continuous learning and technical growth.",
    tags: [
      {
        name: "version-control",
        color: "text-pink-400",
      },
      {
        name: "Github",
        color: "text-[#00BFFF]",
      },
    ],
    image: "/assets/github.png",
    source_code_link: "#",
    issuer: "GitHub (Future Certification)",
    date: "2025",
    isPlaceholder: true,
    borderColor: "#6E5494",
    gradient: "linear-gradient(225deg, #6E5494, #151030)"
  }
]

// Optimized converter for certificate data to ChromaGrid format
const convertCertificatesToChromaItems = (): ChromaItem[] => {
  return projects.map(cert => ({
    image: cert.image,
    title: cert.name,
    subtitle: cert.issuer,
    handle: cert.date,
    location: cert.tags.map(tag => tag.name).join(', '),
    borderColor: cert.borderColor || 
      (cert.tags[0]?.color?.includes('#') 
        ? cert.tags[0].color.replace('text-[', '').replace(']', '') 
        : '#00BFFF'),
    gradient: cert.gradient || 
      `linear-gradient(145deg, ${
        cert.tags[0]?.color?.includes('#') 
          ? cert.tags[0].color.replace('text-[', '').replace(']', '') 
          : '#00BFFF'
      }, #151030)`,
    url: cert.source_code_link
  }));
};

// SectionWrapper HOC with AOS initialization
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

// Main Component with AOS animations
const Certificate = () => {
  const chromaItems = convertCertificatesToChromaItems();

  return (
    <>
      <div className="relative bg-transparent">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
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

        {/* ChromaGrid certificates display */}
        <div className="mt-20 h-[700px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <ChromaGrid 
            items={chromaItems} 
            radius={350} 
            damping={0.45} 
            fadeOut={0.6}
            className="certificates-grid"
          />
        </div>
        
        {/* Instruction tip */}
        <div className="mt-10 flex justify-center">
          <div className="bg-[#151030]/80 p-4 rounded-lg backdrop-blur-sm border border-[#00BFFF]/30 inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00BFFF] rounded-full animate-pulse"></div>
            <p className="text-gray-300 text-sm">
              {/* Hover over certificates and move your cursor to explore the spotlight effect */}
            </p>
          </div>
        </div>
      </div>

      {/* Add custom CSS for the background pattern */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 191, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 191, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        /* Make sure certificate cards stand out against the background */
        :global(.certificates-grid article) {
          margin: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: linear-gradient(145deg, rgba(21, 16, 48, 0.95), rgba(3, 0, 20, 0.95)); /* Replace the black with a dark gradient */
        }
        
        :global(.certificates-grid article:hover) {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 
                      0 0 20px rgba(0, 191, 255, 0.2);
        }
        
        /* Remove or adjust backdrop effects */
        :global(.certificates-grid > div[style*="backdrop-filter"]) {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        
        /* Improve image contrast */
        :global(.certificates-grid img) {
          transition: transform 0.5s ease;
          filter: contrast(1.05) brightness(1.05);
        }
        
        :global(.certificates-grid article:hover img) {
          transform: scale(1.05);
        }
        
        /* Add a subtle pulsing effect to card borders on hover */
        @keyframes pulseBorder {
          0% { border-color: rgba(0, 191, 255, 0.4); }
          50% { border-color: rgba(0, 191, 255, 0.8); }
          100% { border-color: rgba(0, 191, 255, 0.4); }
        }
        
        :global(.certificates-grid article:hover) {
          animation: pulseBorder 2s infinite;
        }
      `}</style>
    </>
  )
}

export default SectionWrapper(Certificate, "certificates")