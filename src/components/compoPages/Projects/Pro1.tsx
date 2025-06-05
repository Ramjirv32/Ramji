// import React from 'react';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import Navbar from "../../Navbar";
import Footer from "../../Footer";

const Index = () => {
  // Use the global function to go back
  const goBack = () => {
    if (typeof window.closeProjectDetails === 'function') {
      window.closeProjectDetails();
    } else {
      // Fallback if global function isn't available
      window.location.reload();
    }
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
      <Navbar />
      <div className="min-h-screen bg-none text-white">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6 md:p-8 bg-black/50 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold">Vehicle Rental System</span>
          </div>
          
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300"
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium">
                October 2023
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vehicle Rental System
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A comprehensive vehicle rental management system developed in C that handles user authentication, 
              booking management, and vehicle inventory tracking with efficient data structures and memory management.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["C", "Data Structures", "File I/O", "Memory Management"].map((tech) => (
                <span key={tech} className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project image */}
            <div className="mb-16">
              <img 
                src="/assets/grs.jpg"
                alt="Vehicle Rental System"
                className="w-full max-h-[600px] object-cover object-center rounded-xl shadow-xl border border-purple-500/20"
              />
            </div>

            {/* GitHub link */}
            <div className="mb-16">
              <a 
                href="https://github.com/Ramjirv32/Vehicle-Rental-System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-full max-w-xs mx-auto transition-all duration-300"
              >
                <FaGithub className="text-xl" />
                <span>View Source Code</span>
              </a>
            </div>
          </section>

          {/* Features Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
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
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
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
