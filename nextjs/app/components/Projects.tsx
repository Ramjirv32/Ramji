"use client"

import React from "react"
import { useState, useEffect } from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

interface Project {
  id: number;
  title: string;
  created_at: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  Tech: string[];
  github: string;
  livedemo: string;
  image?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/demo`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const projectsWithImages = data.map((project: Project) => {
          let imagePath = '/personal/focus.webp'; // Default
          let livedemoUrl = project.livedemo; // Keep original livedemo URL

          if (project.title === "Vehicle Rental System") {
            imagePath = "/assets/grs.webp";
          } else if (project.title === "Smart Parking System") {
            imagePath = "/assets/aadhya.webp";
          } else if (project.title === "NebulX") {
            imagePath = "/assets/nebulx.webp";
          } else if (project.title === "AI Image Generator") {
            imagePath = "/assets/wistravel.webp";
            livedemoUrl = "#";
            project.title = "Wistravel";
          } else if (project.title === "FocusAI – Productive Assistant") {
            imagePath = "/assets/focusai-dashboard.webp";
            livedemoUrl = "https://focusai-dashboard.vercel.app";
          } else if (project.title === "Weather API Integration") {
            imagePath = "/assets/api.webp";
          }

          return {
            ...project,
            title: project.title,
            image: imagePath,
            livedemo: livedemoUrl,
            description: [project.p1, project.p2, project.p3, project.p4]
          };
        });
        setProjects(projectsWithImages);
      } catch (error) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectIcon = (technologies: string[], title: string): string => {
    if (title === "wistravel") return "🧳";
    if (title === "FocusAI Productive Assistant") return "🎯";
    if (title === "Vehicle Rental System") return "🚗";
    if (title === "Smart Parking System") return "🅿️";
    if (title === "NebulX") return "⚡";
    if (title === "Weather API Integration") return "🌤️";
    
    if (technologies.includes("C")) return "💻";
    if (technologies.includes(".NET") || technologies.includes("ASP.NET")) return "🔷";
    if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) return "🤖";
    if (technologies.includes("IoT")) return "📱";
    if (technologies.includes("API")) return "🔌";
    return "💼";
  };

  const getProjectColor = (technologies: string[], title: string): string => {
    if (title === "Wistravel") return "#FF6B6B";
    if (title === "FocusAI – Productive Assistant") return "#4ECDC4";
    if (title === "Vehicle Rental System") return "#FFA500";
    if (title === "Smart Parking System") return "#00BFFF";
    if (title === "NebulX") return "#8A2BE2";
    if (title === "Weather API Integration") return "#9FE2BF";
    
    if (technologies.includes(".NET") || technologies.includes("ASP.NET") || technologies.includes("C#")) 
      return "#512BD4";
    if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) 
      return "#FF69B4";
    if (technologies.includes("IoT")) 
      return "#6495ED";
    if (technologies.includes("React")) 
      return "#61DBFB";
    if (technologies.includes("Node.js")) 
      return "#3C873A";
    if (technologies.includes("MongoDB")) 
      return "#4DB33D";
    if (technologies.includes("TypeScript")) 
      return "#007ACC";
    if (technologies.includes("C")) 
      return "#A8B9CC";
  
    return "#00BFFF";
  }

  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#00BFFF] text-sm uppercase tracking-wider mb-4">
            WHAT I HAVE BUILT SO FAR
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Projects<span className="text-[#00BFFF]">.</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00BFFF]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">
            {error}
            <p className="mt-2">Please check your API connection</p>
          </div>
        ) : (
          <div className="relative">
            {projects.map((project, index) => (
              <div key={project.id} className="relative group mb-20 px-4">
                {/* Glowing lines and circles */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden md:block">
                  <div className="w-full h-full bg-gradient-to-b from-[#00BFFF] to-transparent" style={{
                      boxShadow: "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(0, 191, 255, 0.4), 0 0 30px rgba(0, 191, 255, 0.2)"
                    }}/>
                </div>

                {/* Side decorative elements */}
                {index % 2 === 0 ? (
                  <>
                    <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                      <div className="w-full h-full rounded-full" style={{
                          background: "radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, rgba(0, 191, 255, 0.3) 30%, rgba(0, 191, 255, 0.1) 70%, transparent 100%)",
                          boxShadow: "0 0 80px rgba(0, 191, 255, 0.6), 0 0 160px rgba(0, 191, 255, 0.3)",
                        }}/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                      <div className="w-full h-full rounded-full" style={{
                          background: "radial-gradient(circle, rgba(30, 144, 255, 0.6) 0%, rgba(30, 144, 255, 0.3) 30%, rgba(30, 144, 255, 0.1) 70%, transparent 100%)",
                          boxShadow: "0 0 80px rgba(30, 144, 255, 0.6), 0 0 160px rgba(30, 144, 255, 0.3)",
                        }}/>
                    </div>
                  </>
                )}

                {/* Central icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gray-800 border-4 border-[#00BFFF] rounded-full flex items-center justify-center z-10" style={{
                    boxShadow: "0 0 20px rgba(0, 191, 255, 0.8), 0 0 40px rgba(0, 191, 255, 0.4), inset 0 0 15px rgba(0, 191, 255, 0.2)"
                  }}>
                  <span className="text-xl md:text-2xl">{getProjectIcon(project.Tech, project.title)}</span>
                </div>

                {/* Project card */}
                <div className={`w-full md:w-4/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} mt-8 md:mt-0 relative z-20`}>
                  <div 
                    className="bg-[#151030]/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-[#00BFFF]/20 shadow-xl transition-all duration-300 book-card project-card"
                    style={{
                      '--card-color': getProjectColor(project.Tech, project.title),
                      '--glow-x': '50%',
                      '--glow-y': '50%',
                      '--glow-opacity': '0',
                      '--glow-blur': '15px',
                    } as React.CSSProperties}
                    onMouseMove={(e) => {
                      if (window.innerWidth <= 768) return;
                      
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      
                      e.currentTarget.style.setProperty('--glow-x', `${x}%`);
                      e.currentTarget.style.setProperty('--glow-y', `${y}%`);
                      e.currentTarget.style.setProperty('--glow-opacity', '0.3');
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty('--glow-opacity', '0');
                    }}
                  >
                    <div className="book-content relative z-10">
                      <div className="mb-4 overflow-hidden rounded-lg relative z-0">
                        <img 
                          src={project.image || "/placeholder.svg"} 
                          alt={project.title} 
                          className="w-full h-32 md:h-40 object-cover object-center rounded-lg transition-transform duration-500 hover:scale-110" 
                        />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2 relative z-0">{project.title}</h3>
                      <ul className="text-gray-400 text-sm space-y-2 mb-4 relative z-0">
                        {[project.p1, project.p2, project.p3].map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[var(--card-color)] mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-4 relative z-0">
                        {project.Tech.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[var(--card-color)]/20 text-[var(--card-color)] text-xs rounded-full border border-[var(--card-color)]/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-4 relative z-30">
                        {project.title === "Wistravel" || project.title === "FocusAI – Productive Assistant" ? (
                          <>
                            <div className="flex items-center px-4 py-2 bg-gray-800 text-white/80 rounded-full text-sm cursor-not-allowed opacity-90">
                              <FaGithub className="mr-2" /> Coming Soon
                            </div>
                            <div className="flex items-center px-4 py-2 bg-[var(--card-color)]/80 text-white/80 rounded-full text-sm cursor-not-allowed opacity-90">
                              <FaExternalLinkAlt className="mr-2" /> Coming Soon
                            </div>
                          </>
                        ) : (
                          <>
                            {project.github && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-colors duration-300" 
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaGithub className="mr-2" /> GitHub
                              </a>
                            )}
                            {project.livedemo && (
                              <a 
                                href={project.livedemo} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center px-4 py-2 bg-[var(--card-color)] hover:brightness-110 text-white rounded-full text-sm transition-colors duration-300" 
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaExternalLinkAlt className="mr-2" /> Live Demo
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 pointer-events-none rounded-lg z-0"
                      style={{
                        background: `radial-gradient(circle at var(--glow-x) var(--glow-y), var(--card-color, #00BFFF) 0%, transparent 85%)`,
                        opacity: 'var(--glow-opacity)',
                        transition: 'opacity 0.3s ease',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Date stamp */}
                <div className={`w-full md:w-5/12 md:absolute md:top-0 ${index % 2 === 0 ? 'md:right-0 md:pr-4' : 'md:left-0 md:pl-4'} mb-4 md:mb-0`}>
                  <div className={`text-center md:${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-gray-200 text-sm font-medium bg-[#00BFFF]/20 px-4 py-1.5 rounded-full border border-[#00BFFF]/30 shadow-lg">
                      {project.created_at.split('T')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            These projects showcase my skills and experience through real-world examples of my work.
            Each project represents a unique challenge that I've tackled successfully,
            demonstrating my ability to solve complex problems and deliver robust solutions.
          </p>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 10px 20px -8px rgba(0, 0, 0, 0.3),
            0 0 8px rgba(var(--card-color-rgb, 0, 191, 255), 0.15),
            0 0 15px rgba(var(--card-color-rgb, 0, 191, 255), 0.1);
          border-color: rgba(var(--card-color-rgb, 0, 191, 255), 0.5);
        }
        
        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 8px;
          background: linear-gradient(
            to bottom right,
            var(--card-color, #00BFFF) 0%,
            transparent 50%,
            var(--card-color, #00BFFF) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        
        .project-card:hover::after {
          opacity: 0.4;
        }
      `}</style>
    </section>
  );
};

export default Projects;