"use client"

import type React from "react"
import { HiExternalLink } from "react-icons/hi"

// Certificates data
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
  }
]

// Simple ProjectCard component without animations
const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  issuer,
  date,
  isPlaceholder,
}: any) => {
  return (
    <div className="bg-[#151030]/80 p-4 rounded-2xl sm:w-[260px] w-full h-full backdrop-blur-sm border border-[#00BFFF]/30 shadow-[0_0_10px_#00BFFF] hover:shadow-[0_0_20px_#00BFFF] hover:border-[#00BFFF]/60 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative w-full h-[120px]">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name} certificate thumbnail`}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2 z-30">
          {!isPlaceholder && (
            <>
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/70 backdrop-blur-md hover:bg-[#00BFFF] transition-all relative z-40 pointer-events-auto"
                title="View Certificate PDF"
              >
                <svg className="w-1/2 h-1/2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </a>
              {live_demo_link && (
                <a
                  href={live_demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/70 backdrop-blur-md hover:bg-[#1E90FF] transition-all relative z-40 pointer-events-auto"
                  title="Visit Issuer Website"
                >
                  <HiExternalLink className="w-1/2 h-1/2 text-white" />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[20px]">{name}</h3>
        <div className="flex items-center mt-1 mb-2">
          <p className="text-[#00BFFF] text-[16px] mr-2">{issuer}</p>
          <span className="text-gray-400 text-sm">•</span>
          <p className="text-gray-400 text-sm ml-2">{date}</p>
        </div>
        <p className="mt-2 text-gray-300 text-[13px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag:any) => (
          <p key={`${name}-${tag.name}`} className={`text-[12px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  )
}

// SectionWrapper HOC (simplified version)
const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <section id={idName} className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8 py-20">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    )
  }

// Main Component - Simple certificate display
const Certificate = () => {
  return (
    <>
      <div>
        <p className="text-[#00BFFF] font-medium lg:text-[18px] sm:text-[16px] xs:text-[14px] text-[12px] uppercase tracking-wider">
          My achievements
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Certificates</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]">
          The following certifications validate my skills and expertise in various technologies and methodologies. 
          Each certificate represents my commitment to continuous learning and professional growth in the rapidly evolving 
          tech industry.
        </p>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={`certificate-${index}`}
              {...project}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default SectionWrapper(Certificate, "certificates")
