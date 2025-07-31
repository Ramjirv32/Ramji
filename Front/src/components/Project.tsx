"use client"

import React from "react"

import { useState, useEffect } from "react"
import { FaExternalLinkAlt, FaGithub, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

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

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const [newProject, setNewProject] = useState({
    title: "",
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    Tech: [""],
    github: "",
    livedemo: "",
    image: ""
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use environment variable for API URL, with fallback to localhost
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
        const response = await fetch(`${API_URL}/demo`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const projectsWithImages = data.map((project: Project) => {
          let imagePath = '/personal/focus.png'; // Default
          let livedemoUrl = project.livedemo; // Keep original livedemo URL

          if (project.title === "Vehicle Rental System") {
            imagePath = "/assets/grs.jpg";
          } else if (project.title === "Smart Parking System") {
            imagePath = "/assets/aadhya.png";
          } else if (project.title === "NebulX") {
            imagePath = "/assets/nebulx.png";
          } else if (project.title === "AI Image Generator") {
            imagePath = "/assets/wistravel.png";
            livedemoUrl = "#";
            project.title = "Wistravel";
          } else if (project.title === "FocusAI – Productive Assistant") {
            imagePath = "/assets/focusai-dashboard.png";
            livedemoUrl = "https://focusai-dashboard.vercel.app";
          } else if (project.title === "Weather API Integration") {
            imagePath = "/assets/api.png";
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

  // Fix the event handling by properly typing the event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTech = [...newProject.Tech];
    newTech[index] = e.target.value;
    setNewProject(prev => ({
      ...prev,
      Tech: newTech
    }));
  };

  const addTechField = () => {
    setNewProject(prev => ({
      ...prev,
      Tech: [...prev.Tech, ""]
    }));
  };

  const removeTechField = (index: number) => {
    const newTech = [...newProject.Tech];
    newTech.splice(index, 1);
    setNewProject(prev => ({
      ...prev,
      Tech: newTech
    }));
  };

  const submitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const techStack = newProject.Tech.filter(tech => tech.trim() !== "");
      const projectData = {
        id: projects.length + 1,
        created_at: new Date().toISOString(),
        title: newProject.title,
        p1: newProject.p1,
        p2: newProject.p2,
        p3: newProject.p3,
        p4: newProject.p4,
        Tech: techStack,
        github: newProject.github,
        livedemo: newProject.livedemo,
        image: newProject.image || '/assets/default-project.png'
      };

      // Use environment variable for API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
      const response = await fetch(`${API_URL}/demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to add new project');
      }

      setProjects(prev => [...prev, projectData]);
      setNewProject({
        title: "",
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        Tech: [""],
        github: "",
        livedemo: "",
        image: ""
      });
      setShowAddForm(false);
      setSuccessMessage('Project added successfully! It will be visible after approval.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getProjectIcon = (technologies: string[], title: string): string => {
    // Alternative approach using more basic Unicode characters
    if (title === "wistravel") return "🧳"; // Luggage/suitcase icon
    if (title === "FocusAI Productive Assistant") return "🎯"; // Target icon
    

    if (title === "Vehicle Rental System") return "🚗"; // Car icon
    if (title === "Smart Parking System") return "🅿️"; // Parking icon
    if (title === "NebulX") return "⚡"; // Lightning icon
    if (title === "Weather API Integration") return "🌤️"; // Weather icon
    
    // Original logic with fallback that isn't a rocket
    if (technologies.includes("C")) return "💻";
    if (technologies.includes(".NET") || technologies.includes("ASP.NET")) return "🔷"; // .NET icon
    if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) return "🤖";
    if (technologies.includes("IoT")) return "📱";
    if (technologies.includes("API")) return "🔌";
    return "💼";  // Changed from rocket to briefcase
  };

  const getProjectColor = (technologies: string[], title: string): string => {
    // Unique colors for specific projects
    if (title === "Wistravel") return "#FF6B6B"; // Coral
    if (title === "FocusAI – Productive Assistant") return "#4ECDC4"; // Turquoise
    if (title === "Vehicle Rental System") return "#FFA500"; // Orange
    if (title === "Smart Parking System") return "#00BFFF"; // Default blue
    if (title === "NebulX") return "#8A2BE2"; // Purple
    if (title === "Weather API Integration") return "#9FE2BF"; // Mint
    
    // Colors based on technologies
    if (technologies.includes(".NET") || technologies.includes("ASP.NET") || technologies.includes("C#")) 
      return "#512BD4"; // .NET Purple
    if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) 
      return "#FF69B4"; // Hot Pink
    if (technologies.includes("IoT")) 
      return "#6495ED"; // Cornflower Blue
    if (technologies.includes("React")) 
      return "#61DBFB"; // React Blue
    if (technologies.includes("Node.js")) 
      return "#3C873A"; // Node Green
    if (technologies.includes("MongoDB")) 
      return "#4DB33D"; // MongoDB Green
    if (technologies.includes("TypeScript")) 
      return "#007ACC"; // TypeScript Blue
    if (technologies.includes("C")) 
      return "#A8B9CC"; // C Language Gray-Blue
  
    // Default color
    return "#00BFFF"; // Default Bright Blue
  }

  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const validateImageUrl = (url: string) => {
    if (!url) {
      setImagePreview(false);
      setImageError(false);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImagePreview(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImagePreview(false);
      setImageError(true);
    };
    img.src = url;
  };

  useEffect(() => {
    validateImageUrl(newProject.image);
  }, [newProject.image]);

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#030014] to-[#080324] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#00BFFF] text-sm uppercase tracking-wider mb-4">
            WHAT I HAVE BUILT SO FAR
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Projects<span className="text-[#00BFFF]">.</span>
          </h1>
          {/* Only show Add New Project button to admins */}
          {isAdmin && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full text-white border border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <FaPlus />
                Add New Project
              </span>
            </button>
          )}
        </div>

        {successMessage && (
          <div className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {successMessage}
          </div>
        )}

        {showAddForm && (
          <div className="mb-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">{isAdmin ? "Add New Project" : "Suggest a Project"}</h3>
            <form onSubmit={submitProject}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-gray-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Weather Dashboard App"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-gray-300 mb-1">
                    Project Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={newProject.image}
                    onChange={(e) => {
                      handleInputChange(e);
                      validateImageUrl(e.target.value);
                    }}
                    className={`w-full bg-gray-900/80 border ${
                      imageError ? 'border-red-500' : 'border-blue-700/30'} text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="https://example.com/your-image.jpg"
                  />
                  {imageError && (
                    <p className="text-red-500 text-xs mt-1">
                      Unable to load this image. Please check the URL.
                    </p>
                  )}
                  {imagePreview && newProject.image && (
                    <div className="mt-2 relative w-full h-40 overflow-hidden rounded-lg border border-blue-700/30">
                      <img src={newProject.image || "/placeholder.svg"} alt="Preview" className="object-cover w-full h-full"/>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">Image Preview</p>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Leave blank to use a default image. For best results, use a 16:9 aspect ratio.
                  </p>
                </div>
                <div>
                  <label htmlFor="p1" className="block text-gray-300 mb-1">
                    Key Point 1 *
                  </label>
                  <input
                    type="text"
                    id="p1"
                    name="p1"
                    value={newProject.p1}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Built a responsive weather application using React"
                  />
                </div>
                <div>
                  <label htmlFor="p2" className="block text-gray-300 mb-1">
                    Key Point 2 *
                  </label>
                  <input
                    type="text"
                    id="p2"
                    name="p2"
                    value={newProject.p2}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Implemented OpenWeatherMap API integration"
                  />
                </div>
                <div>
                  <label htmlFor="p3" className="block text-gray-300 mb-1">
                    Key Point 3 *
                  </label>
                  <input
                    type="text"
                    id="p3"
                    name="p3"
                    value={newProject.p3}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Created custom UI components and animations"
                  />
                </div>
                <div>
                  <label htmlFor="p4" className="block text-gray-300 mb-1">
                    Key Point 4 *
                  </label>
                  <input
                    type="text"
                    id="p4"
                    name="p4"
                    value={newProject.p4}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Added location search and favorites functionality"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">
                    Technologies Used *
                  </label>
                  <div className="space-y-2">
                    {newProject.Tech.map((tech, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => handleTechChange(e, index)}
                          className="flex-grow bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`e.g., ${index === 0 ? 'React' : index === 1 ? 'TypeScript' : index === 2 ? '.NET' : 'API'}`}
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTechField(index)}
                            className="px-3 py-2 bg-red-800/50 hover:bg-red-700/70 text-white rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    {newProject.Tech.length < 5 && (
                      <button
                        type="button"
                        onClick={addTechField}
                        className="px-4 py-2 bg-blue-800/50 hover:bg-blue-700/70 text-white rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>+</span> Add Technology
                      </button>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Common technologies: React, Node.js, .NET, ASP.NET, C#, Python, TypeScript, MongoDB, PostgreSQL
                  </p>
                </div>
                <div>
                  <label htmlFor="github" className="block text-gray-300 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={newProject.github}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
                <div>
                  <label htmlFor="livedemo" className="block text-gray-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="livedemo"
                    name="livedemo"
                    value={newProject.livedemo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/80 border border-blue-700/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourproject.vercel.app or https://yourapp.azurewebsites.net"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !newProject.title || !newProject.p1}
                    className={`px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 ${
                      submitting || !newProject.title || !newProject.p1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

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
                  <div className="absolute inset-0 w-1 -translate-x-1/4 h-full bg-gradient-to-b from-[#00BFFF]/50 to-transparent blur-sm"/>
                  <div className="absolute inset-0 w-2 -translate-x-1/2 h-full bg-gradient-to-b from-[#00BFFF]/30 to-transparent blur-md"/>
                </div>
                {index % 2 === 0 && (
                  <>
                    <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                      <div className="w-full h-full rounded-full" style={{
                          background: "radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, rgba(0, 191, 255, 0.3) 30%, rgba(0, 191, 255, 0.1) 70%, transparent 100%)",
                          boxShadow: "0 0 80px rgba(0, 191, 255, 0.6), 0 0 160px rgba(0, 191, 255, 0.3)",
                        }}/>
                      <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full" style={{
                          background: "rgba(30, 144, 255, 0.4)",
                        }}/>
                      <div className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full" style={{
                          background: "rgba(0, 191, 255, 0.3)",
                        }}/>
                    </div>
                    <div className="absolute left-[8%] top-[30%] w-12 h-12 md:w-20 md:h-20 rounded-full hidden md:block" style={{
                        background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)",
                        filter: "blur(15px)",
                      }}/>
                    <div className="absolute left-[12%] top-[70%] w-8 h-8 md:w-16 md:h-16 rounded-full hidden md:block" style={{
                        background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 70%)",
                        filter: "blur(12px)",
                      }}/>
                  </>
                )}
                {index % 2 !== 0 && (
                  <>
                    <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                      <div className="w-full h-full rounded-full" style={{
                          background: "radial-gradient(circle, rgba(30, 144, 255, 0.6) 0%, rgba(30, 144, 255, 0.3) 30%, rgba(30, 144, 255, 0.1) 70%, transparent 100%)",
                          boxShadow: "0 0 80px rgba(30, 144, 255, 0.6), 0 0 160px rgba(30, 144, 255, 0.3)",
                        }}/>
                      <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full" style={{
                          background: "rgba(0, 191, 255, 0.4)",
                        }}/>
                      <div className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full" style={{
                          background: "rgba(30, 144, 255, 0.3)",
                        }}/>
                    </div>
                    <div className="absolute right-[8%] top-[30%] w-12 h-12 md:w-20 md:h-20 rounded-full hidden md:block" style={{
                        background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 70%)",
                        filter: "blur(15px)",
                      }}/>
                    <div className="absolute right-[12%] top-[70%] w-8 h-8 md:w-16 md:h-16 rounded-full hidden md:block" style={{
                        background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)",
                        filter: "blur(12px)",
                      }}/>
                  </>
                )}

                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gray-800 border-4 border-[#00BFFF] rounded-full flex items-center justify-center z-10" style={{
                    boxShadow: `
                      0 0 20px rgba(0, 191, 255, 0.8),
                      0 0 40px rgba(0, 191, 255, 0.4),
                      inset 0 0 15px rgba(0, 191, 255, 0.2)
                    `
                  }}>
                  <span className="text-xl md:text-2xl">{getProjectIcon(project.Tech, project.title)}</span>
                  <div className="absolute inset-[-4px] rounded-full border border-[#00BFFF]/30 blur-sm" style={{
                      boxShadow: "0 0 15px rgba(0, 191, 255, 0.5)"
                    }}/>
                </div>

                <div className={`w-full md:w-4/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} mt-8 md:mt-0 relative z-20`}>
                  <div 
                    onClick={() => {
                      // Check for specific projects that need special routing
                      if (project.title === "Wistravel") {
                        navigate("/project/5");
                      } else if (project.title === "FocusAI – Productive Assistant") {
                        navigate("/project/4");
                      } else {
                        // Default navigation based on index
                        navigate(`/project/${index + 1}`);
                      }
                    }} 
                    className="bg-[#151030]/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-[#00BFFF]/20 shadow-xl transition-all duration-300 book-card project-card"
                    style={{
                      '--card-color': getProjectColor(project.Tech, project.title),
                      '--glow-x': '50%',
                      '--glow-y': '50%',
                      '--glow-opacity': '0',
                      '--glow-blur': '15px',
                    } as React.CSSProperties}
                    onMouseMove={(e) => {
                      if (window.innerWidth <= 768) return; // Skip on mobile
                      
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      
                      e.currentTarget.style.setProperty('--glow-x', `${x}%`);
                      e.currentTarget.style.setProperty('--glow-y', `${y}%`);
                      e.currentTarget.style.setProperty('--glow-opacity', '0.3'); // Reduced from 1.0 to 0.3
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
                            <span className="text-[var(--card-color)] mr-2 mt-1">•</span><span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-4 relative z-0">
                        {project.Tech.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[var(--card-color)]/20 text-[var(--card-color)] text-xs rounded-full border border-[var(--card-color)]/30">{tech}</span>
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
                    
                    {/* Glow effect - position absolute to cover the card */}
                    <div className="absolute inset-0 pointer-events-none rounded-lg z-0"
                      style={{
                        background: `radial-gradient(circle at var(--glow-x) var(--glow-y), var(--card-color, #00BFFF) 0%, transparent 85%)`, // Increased transparency (85% instead of 70%)
                        opacity: 'var(--glow-opacity)',
                        transition: 'opacity 0.3s ease',
                      }}
                    ></div>
                  </div>
                </div>

                <div className={`w-full md:w-5/12 md:absolute md:top-0 ${index % 2 === 0 ? 'md:right-0 md:pr-4' : 'md:left-0 md:pl-4'} mb-4 md:mb-0`}>
                  <div className={`text-center md:${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-gray-200 text-sm font-medium bg-[#00BFFF]/20 px-4 py-1.5 rounded-full border border-[#00BFFF]/30 shadow-lg">{project.created_at.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-10 bottom-0 hidden md:block">
              <div className="w-full h-full bg-gradient-to-b from-[#00BFFF] to-transparent" style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(0, 191, 255, 0.4)"
                }}/>
              <div className="absolute inset-0 w-2 -translate-x-1/4 h-full bg-gradient-to-b from-[#00BFFF]/50 to-transparent blur-sm"/>
              <div className="absolute inset-0 w-3 -translate-x-1/3 h-full bg-gradient-to-b from-[#00BFFF]/30 to-transparent blur-md"/>
            </div>
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

      <style>{`
        .project-card {
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-3px); /* Reduced from -5px to -3px */
          box-shadow: 
            0 10px 20px -8px rgba(0, 0, 0, 0.3), /* Reduced shadow intensity */
            0 0 8px rgba(var(--card-color-rgb, 0, 191, 255), 0.15), /* Reduced from 15px to 8px and 0.4 to 0.15 */
            0 0 15px rgba(var(--card-color-rgb, 0, 191, 255), 0.1); /* Reduced from 30px to 15px and 0.2 to 0.1 */
          border-color: rgba(var(--card-color-rgb, 0, 191, 255), 0.5); /* Added transparency */
        }
        
        /* Glow border effect on hover */
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
          opacity: 0.4; /* Reduced from 0.8 to 0.4 */
          transition: opacity 0.3s ease;
        }
        
        .project-card:hover::after {
          opacity: 0.4; /* Reduced from 0.8 to 0.4 */
        }
      `}</style>
    </div>
  );
};

export default Projects
