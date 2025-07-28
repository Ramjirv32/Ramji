"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InternshipCard } from "./InternshipCard"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Animation variants
const textVariant = (delay?: number) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay,
    },
  },
});

const internships = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Society for Cyber Intelligent Systems",
    duration: "Jan 2024 - Feb 2024",
    description: "Developed societycis.org website with Mathan M for cyber intelligence systems. Built responsive web platform with modern security features and intelligent system integration.",
    image: "/personal/Society.png",
    skills: ["React", "Node.js", "Security", "AI Integration", "MongoDB"],
    route: "/internship/society",
    bgColor: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "Oodser Technologies",
    duration: "June 2023 - Dec 2023",
    description: "Worked on LinkedIn-like platform and WTHBTWX app with enterprise architecture. Implemented full stack features using React, Node.js and MongoDB.",
    image: "/personal/OOdser.png",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "REST APIs"],
    route: "/internship/oodser",
    bgColor: "from-blue-600/20 to-indigo-600/20"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Luxor Holiday Homes",
    duration: "Jan 2023 - Present",
    description: "Developed complete homestay booking platform as freelancer. Built with WordPress, React frontend, Node.js backend, Razorpay integration, MongoDB, Cloudflare security and SSL.",
    image: "/personal/Luxor.png",
    skills: ["WordPress", "React", "Node.js", "MongoDB", "Razorpay", "Cloudflare"],
    route: "/internship/luxor-holiday",
    bgColor: "from-yellow-500/20 to-amber-500/20"
  }
];

const Works = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="works" className="relative w-full py-20">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="text-center"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-[#00BFFF]">Work</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 mb-12">
          {internships.slice(0, 2).map((internship, index) => (
            <div 
              key={internship.id} 
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <InternshipCard internship={internship} index={index} />
            </div>
          ))}
        </div>

        {/* Second Row - One Card Centered */}
        <div className="flex justify-center px-8">
          <div 
            className="w-full max-w-md lg:max-w-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <InternshipCard internship={internships[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;