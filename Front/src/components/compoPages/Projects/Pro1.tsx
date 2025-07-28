// import React from 'react';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navigate to projects section on home page
  const goBack = () => {
    navigate('/', { state: { scrollTo: 'projects' } });
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const features = [
    {
      icon: "💻",
      title: "User Authentication",
      description: "Secure login and registration system with file-based data persistence."
    },
    {
      icon: "🚗",
      title: "Rental Management",
      description: "Complete vehicle inventory tracking and rental management functionality."
    },
    {
      icon: "📊",
      title: "Data Structures",
      description: "Efficient data organization using linked lists and arrays for optimal performance."
    },
    {
      icon: "🛡️",
      title: "Error Handling",
      description: "Robust input validation and comprehensive error handling throughout the system."
    },
    {
      icon: "💾",
      title: "File I/O",
      description: "Data persistence using file handling for storing user and vehicle information."
    },
    {
      icon: "🧠",
      title: "Memory Management",
      description: "Efficient memory allocation and deallocation to prevent memory leaks."
    }
  ];

  const technologies = [
    { name: "C Programming", description: "Core language used for development" },
    { name: "Data Structures", description: "Arrays, linked lists, and structs for data organization" },
    { name: "File I/O", description: "Reading and writing data to files for persistence" },
    { name: "Memory Management", description: "Manual memory allocation and deallocation" }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background glow */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1s"
            }}
          />
          {/* Floating accent glows */}
          <div
            className="absolute top-1/2 left-1/6 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
              animationDuration: "2.5s",
              animationDelay: "0.5s"
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/6 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(30, 144, 255, 0.2)",
              animationDuration: "3s",
              animationDelay: "2s"
            }}
          />
        </div>

        {/* Back Button with glow */}
        <div className="fixed top-6 left-6 z-50">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#00BFFF]/40"
            style={{
              boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header with glow */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#00BFFF]/30">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)"
              }}
            >
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold">Vehicle Rental System</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 md:px-8 relative z-10">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span 
                className="bg-[#00BFFF]/20 border border-[#00BFFF]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
                }}
              >
                October 2023
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent">
              Vehicle Rental System
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A comprehensive vehicle rental management system developed in C that handles user authentication, 
              booking management, and vehicle inventory tracking with efficient data structures and memory management.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["C", "Data Structures", "File I/O", "Memory Management"].map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white/10 border border-[#00BFFF]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(0, 191, 255, 0.2)"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project image with glow */}
            <div className="mb-16">
              <img 
                src="/assets/grs.jpg"
                alt="Vehicle Rental System"
                className="w-full max-h-[600px] object-cover object-center rounded-xl shadow-xl border border-[#00BFFF]/40"
                style={{
                  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)"
                }}
              />
            </div>

            {/* GitHub link with glow */}
            <div className="mb-16">
              <a 
                href="https://github.com/Ramjirv32/Vehicle-Rental-System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 px-8 py-3 rounded-full max-w-xs mx-auto transition-all duration-300 border border-[#00BFFF]/30"
                style={{
                  boxShadow: "0 0 15px rgba(0, 191, 255, 0.4)"
                }}
              >
                <FaGithub className="text-xl" />
                <span>View Source Code</span>
              </a>
            </div>
          </section>

          {/* Features Grid with glow */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Technologies Used</h2>
            
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div 
                    className="w-2 h-2 bg-[#00BFFF] rounded-full"
                    style={{
                      boxShadow: "0 0 8px rgba(0, 191, 255, 0.6)"
                    }}
                  ></div>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-gray-400">–</span>
                  <span className="text-gray-300">{tech.description}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
