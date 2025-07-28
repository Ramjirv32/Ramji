import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaExternalLinkAlt, FaGithub, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  
  // New state variables for the add project feature
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [adminMode, setAdminMode] = useState<boolean>(false);
  
  // New project form state
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
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
    
    // Toggle admin mode with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setAdminMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Existing fetch projects function...
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:9000/demo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Map the data to include image paths based on title
        const projectsWithImages = data.map((project: Project) => {
          // Add default image paths based on project title or ID
          let imagePath = '/assets/default-project.png';
          
          // Map project titles to image paths
          if (project.title === "Vehicle Rental System") {
            imagePath = "/assets/grs.jpg";
          } else if (project.title === "Weather API Integration") {
            imagePath = "/assets/api.png";
          } else if (project.title === "Smart Parking System") {
            imagePath = "/assets/aadhya.png";
          } else if (project.title === "AI Image Generator") {
            imagePath = "/assets/Hug.png";
          } else if (project.title === "NebulX") {
            imagePath = "/assets/nebulx.png";
          }
          
          return {
            ...project,
            image: imagePath,
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle tech stack input changes (array of strings)
  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTech = [...newProject.Tech];
    newTech[index] = e.target.value;
    setNewProject(prev => ({
      ...prev,
      Tech: newTech
    }));
  };
  
  // Add new tech input field
  const addTechField = () => {
    setNewProject(prev => ({
      ...prev,
      Tech: [...prev.Tech, ""]
    }));
  };
  
  // Remove tech input field
  const removeTechField = (index: number) => {
    const newTech = [...newProject.Tech];
    newTech.splice(index, 1);
    setNewProject(prev => ({
      ...prev,
      Tech: newTech
    }));
  };

  // Submit the new project
  const submitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Filter out empty tech values
      const techStack = newProject.Tech.filter(tech => tech.trim() !== "");
      
      // Create the project object with image
      const projectData = {
        id: projects.length + 1,  // Generate a new ID
        created_at: new Date().toISOString(),
        title: newProject.title,
        p1: newProject.p1,
        p2: newProject.p2,
        p3: newProject.p3,
        p4: newProject.p4,
        Tech: techStack,
        github: newProject.github,
        livedemo: newProject.livedemo,
        image: newProject.image || '/assets/default-project.png' // Use provided image or default
      };
      
      // Send the project to the API
      const response = await fetch('http://localhost:9000/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add new project');
      }
      
      // Add the new project to the local state with image
      setProjects(prev => [...prev, projectData]);
      
      // Reset the form
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
      
      // Hide success message after 3 seconds
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
  
  // Existing getProjectIcon function...
  const getProjectIcon = (technologies: string[]): string => {
    if (technologies.includes("C")) return "💻";
    if (technologies.includes("AI APIs") || technologies.includes("Hugging Face API")) return "🤖";
    if (technologies.includes("IoT")) return "🚗";
    if (technologies.includes("API")) return "🌤️";
    return "🚀"; // Default icon
  };

  // Add image preview section if an image URL is provided
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Check if image URL is valid
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

  // Validate image URL on input change
  useEffect(() => {
    if (newProject.image) {
      validateImageUrl(newProject.image);
    }
  }, [newProject.image]);

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#030014] to-[#080324] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#00BFFF] text-sm uppercase tracking-wider mb-4">
            WHAT I HAVE BUILT SO FAR
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Projects<span className="text-[#00BFFF]">.</span>
          </h1>
          
          {/* Add Project Button (visible when adminMode is true or showAddForm is false) */}
          {(adminMode || !showAddForm) && (
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full text-white border border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                <FaPlus />
                {adminMode ? "Add New Project (Admin)" : "Suggest a Project"}
              </span>
            </motion.button>
          )}
        </motion.div>
        
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-20 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {successMessage}
          </div>
        )}
        
        {/* Add Project Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-blue-700/50 rounded-lg p-6 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {adminMode ? "Add New Project" : "Suggest a Project"}
            </h3>
            
            <form onSubmit={submitProject}>
              <div className="space-y-4">
                {/* Project Title */}
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
                
                {/* Project Image URL - NEW FIELD */}
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
                      imageError ? 'border-red-500' : 'border-blue-700/30'
                    } text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="https://example.com/your-image.jpg"
                  />
                  {imageError && (
                    <p className="text-red-500 text-xs mt-1">
                      Unable to load this image. Please check the URL.
                    </p>
                  )}
                  {imagePreview && newProject.image && (
                    <div className="mt-2 relative w-full h-40 overflow-hidden rounded-lg border border-blue-700/30">
                      <img 
                        src={newProject.image} 
                        alt="Preview" 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">Image Preview</p>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Leave blank to use a default image. For best results, use a 16:9 aspect ratio.
                  </p>
                </div>
                
                {/* Project Description Points */}
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
                
                {/* Technologies Used */}
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
                          placeholder={`e.g., ${index === 0 ? 'React' : index === 1 ? 'TypeScript' : 'API'}`}
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
                </div>
                
                {/* GitHub & Live Demo Links */}
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
                    placeholder="https://yourproject.vercel.app"
                  />
                </div>
                
                {/* Form Actions */}
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
                      submitting || !newProject.title || !newProject.p1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
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
          </motion.div>
        )}

        {/* Loading, Error States, and Projects Timeline */}
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
          // Projects Timeline - The existing projects timeline code remains unchanged
          <div className="relative">
            {/* Existing projects timeline code... */}
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="relative group mb-20 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                // transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* The rest of your existing project rendering code... */}
                {/* Timeline line, glowing orbs, project cards, etc. */}
                {/* Keep all the existing markup for the timeline */}
                
                {/* Enhanced Timeline line with glow effects */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden md:block">
                  {/* Main timeline line with glow */}
                  <div 
                    className="w-full h-full bg-gradient-to-b from-[#00BFFF] to-transparent"
                    style={{
                      boxShadow: "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(0, 191, 255, 0.4), 0 0 30px rgba(0, 191, 255, 0.2)"
                    }}
                  />
                  {/* Additional glow layers */}
                  <div 
                    className="absolute inset-0 w-1 -translate-x-1/4 h-full bg-gradient-to-b from-[#00BFFF]/50 to-transparent blur-sm"
                  />
                  <div 
                    className="absolute inset-0 w-2 -translate-x-1/2 h-full bg-gradient-to-b from-[#00BFFF]/30 to-transparent blur-md"
                  />
                </div>

                {/* Side Glowing Orbs - Alternating Left/Right */}
                {/* Left side glow (for even index projects - when content is on right) */}
                {index % 2 === 0 && (
                  <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                    <div
                      className="w-full h-full rounded-full blur-3xl animate-pulse"
                      style={{
                        background: "radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, rgba(0, 191, 255, 0.3) 30%, rgba(0, 191, 255, 0.1) 70%, transparent 100%)",
                        boxShadow: "0 0 80px rgba(0, 191, 255, 0.6), 0 0 160px rgba(0, 191, 255, 0.3)",
                        animationDuration: "3s",
                        animationDelay: `${index * 0.5}s`
                      }}
                    />
                    <div
                      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full blur-2xl animate-pulse"
                      style={{
                        background: "rgba(30, 144, 255, 0.4)",
                        animationDelay: `${index * 0.5 + 1}s`,
                        animationDuration: "2.5s"
                      }}
                    />
                    <div
                      className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full blur-xl animate-pulse"
                      style={{
                        background: "rgba(0, 191, 255, 0.3)",
                        animationDelay: `${index * 0.5 + 0.5}s`,
                        animationDuration: "2s"
                      }}
                    />
                  </div>
                )}

                {/* Right side glow (for odd index projects - when content is on left) */}
                {index % 2 !== 0 && (
                  <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 hidden md:block">
                    <div
                      className="w-full h-full rounded-full blur-3xl animate-pulse"
                      style={{
                        background: "radial-gradient(circle, rgba(30, 144, 255, 0.6) 0%, rgba(30, 144, 255, 0.3) 30%, rgba(30, 144, 255, 0.1) 70%, transparent 100%)",
                        boxShadow: "0 0 80px rgba(30, 144, 255, 0.6), 0 0 160px rgba(30, 144, 255, 0.3)",
                        animationDuration: "2.5s",
                        animationDelay: `${index * 0.5 + 1}s`
                      }}
                    />
                    <div
                      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full blur-2xl animate-pulse"
                      style={{
                        background: "rgba(0, 191, 255, 0.4)",
                        animationDelay: `${index * 0.5 + 0.5}s`,
                        animationDuration: "3s"
                      }}
                    />
                    <div
                      className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full blur-xl animate-pulse"
                      style={{
                        background: "rgba(30, 144, 255, 0.3)",
                        animationDelay: `${index * 0.5 + 1.5}s`,
                        animationDuration: "2.5s"
                      }}
                    />
                  </div>
                )}

                {/* Additional floating ambient glows on empty sides */}
                {index % 2 === 0 && (
                <>
                  {/* Small floating glows on left side */}
                  <div 
                    className="absolute left-[8%] top-[30%] w-12 h-12 md:w-20 md:h-20 rounded-full animate-pulse hidden md:block"
                    style={{
                      background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)",
                      filter: "blur(15px)",
                      animationDuration: "4s",
                      animationDelay: `${index * 0.3}s`
                    }}
                  />
                  <div 
                    className="absolute left-[12%] top-[70%] w-8 h-8 md:w-16 md:h-16 rounded-full animate-pulse hidden md:block"
                    style={{
                      background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 70%)",
                      filter: "blur(12px)",
                      animationDuration: "3.5s",
                      animationDelay: `${index * 0.3 + 1}s`
                    }}
                  />
                </>
                )}

                {index % 2 !== 0 && (
                <>
                  {/* Small floating glows on right side */}
                  <div 
                    className="absolute right-[8%] top-[30%] w-12 h-12 md:w-20 md:h-20 rounded-full animate-pulse hidden md:block"
                    style={{
                      background: "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 70%)",
                      filter: "blur(15px)",
                      animationDuration: "4s",
                      animationDelay: `${index * 0.3 + 0.5}s`
                    }}
                  />
                  <div 
                    className="absolute right-[12%] top-[70%] w-8 h-8 md:w-16 md:h-16 rounded-full animate-pulse hidden md:block"
                    style={{
                      background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)",
                      filter: "blur(12px)",
                      animationDuration: "3.5s",
                      animationDelay: `${index * 0.3 + 1.5}s`
                    }}
                  />
                </>
                )}
                
                {/* Enhanced Timeline circle with glow */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gray-800 border-4 border-[#00BFFF] rounded-full flex items-center justify-center z-10"
                  style={{
                    boxShadow: `
                      0 0 20px rgba(0, 191, 255, 0.8),
                      0 0 40px rgba(0, 191, 255, 0.4),
                      inset 0 0 15px rgba(0, 191, 255, 0.2)
                    `
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.2 }}
                >
                  <span className="text-xl md:text-2xl">{getProjectIcon(project.Tech)}</span>
                  {/* Additional glow ring around circle */}
                  <div 
                    className="absolute inset-[-4px] rounded-full border border-[#00BFFF]/30 blur-sm"
                    style={{
                      boxShadow: "0 0 15px rgba(0, 191, 255, 0.5)"
                    }}
                  />
                </motion.div>
                
                {/* Project card - make it clickable with improved z-index */}
                <div 
                  className={`w-full md:w-4/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} mt-8 md:mt-0 relative z-20`}
                >
                  <motion.div 
                    onClick={() => navigate(`/project/${index + 1}`)}
                    className="bg-[#151030]/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-[#00BFFF]/20 shadow-xl hover:border-[#00BFFF]/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                    // Removed whileHover animation
                  >
                    {/* Project image */}
                    <div className="mb-4 overflow-hidden rounded-lg relative z-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-32 md:h-40 object-cover object-center rounded-lg transition-transform duration-500 hover:scale-110" 
                      />
                    </div>

                    <h3 className="text-white font-bold text-xl mb-2 relative z-0">{project.title}</h3>
                    
                    <ul className="text-gray-400 text-sm space-y-2 mb-4 relative z-0">
                      {[project.p1, project.p2, project.p3, project.p4].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#00BFFF] mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mb-4 relative z-0">
                      {project.Tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#00BFFF]/20 text-[#00BFFF] text-xs rounded-full border border-[#00BFFF]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-4 relative z-30">
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
                      
                      {project.livedemo && project.livedemo !== "#" && (
                        <a 
                          href={project.livedemo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center px-4 py-2 bg-[#00BFFF] hover:bg-[#1E90FF] text-white rounded-full text-sm transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()} 
                        >
                          <FaExternalLinkAlt className="mr-2" /> Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                {/* Period indicator */}
                <motion.div 
                  className={`w-full md:w-5/12 md:absolute md:top-0 ${index % 2 === 0 ? 'md:right-0 md:pr-4' : 'md:left-0 md:pl-4'} mb-4 md:mb-0`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <div className={`text-center md:${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-gray-200 text-sm font-medium bg-[#00BFFF]/20 px-4 py-1.5 rounded-full border border-[#00BFFF]/30 shadow-lg">
                      {project.created_at.split('T')[0]}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            {/* Timeline end with glow */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-10 bottom-0 hidden md:block"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {/* Main end line with glow */}
              <div 
                className="w-full h-full bg-gradient-to-b from-[#00BFFF] to-transparent"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(0, 191, 255, 0.4)"
                }}
              />
              {/* Additional glow layers for end */}
              <div 
                className="absolute inset-0 w-2 -translate-x-1/4 h-full bg-gradient-to-b from-[#00BFFF]/50 to-transparent blur-sm"
              />
              <div 
                className="absolute inset-0 w-3 -translate-x-1/3 h-full bg-gradient-to-b from-[#00BFFF]/30 to-transparent blur-md"
              />
            </motion.div>
          </div>
        )}
        
        {/* Footer text - Existing code remains unchanged */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            These projects showcase my skills and experience through real-world examples of my work. 
            Each project represents a unique challenge that I've tackled successfully, 
            demonstrating my ability to solve complex problems and deliver robust solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;