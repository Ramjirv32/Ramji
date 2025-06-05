// import React from 'react';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
      icon: "🤖",
      title: "AI Image Generation",
      description: "Text-to-image generation using advanced AI models from Hugging Face."
    },
    {
      icon: "⚙️",
      title: "API Integration",
      description: "Seamless integration with Hugging Face's powerful AI models."
    },
    {
      icon: "🎨",
      title: "Style Customization",
      description: "Options to adjust image style, size, and other generation parameters."
    },
    {
      icon: "⚡",
      title: "Optimized Performance",
      description: "Efficient response handling with loading states and caching."
    },
    {
      icon: "🛡️",
      title: "Secure Authentication",
      description: "Protected API endpoints with token-based authentication."
    },
    {
      icon: "💾",
      title: "Image Storage",
      description: "Option to save and download generated images."
    }
  ];

  const technologies = [
    { name: "Node.js", description: "Backend server environment" },
    { name: "Hugging Face API", description: "AI model integration" },
    { name: "React", description: "Frontend user interface" },
    { name: "Express", description: "Web application framework" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6 md:p-8 bg-black/50 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold">AI Image Generator</span>
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
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium">
                September 2023
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              AI Image Generator
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              An AI-powered application that transforms text descriptions into stunning images using 
              Hugging Face's state-of-the-art AI models with an intuitive and user-friendly interface.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["Node.js", "Hugging Face API", "React", "Express"].map((tech) => (
                <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card */}
            <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🎨</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Creative AI Power</h3>
                  <p className="text-gray-300">
                    This application harnesses the power of advanced AI models to generate custom images 
                    from text prompts. Users can describe anything they imagine and watch as AI brings 
                    their ideas to life with stunning visual representations.
                  </p>
                </div>
              </div>
            </div>

            {/* Project links */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a 
                href="https://github.com/Ramjirv32/AI-image-Generator-HUGGING-FACE" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300"
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="https://ai-image-generator-hugging-face.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image */}
            <div className="mb-16">
              <img 
                src="/assets/Hug.png"
                alt="AI Image Generator"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-purple-500/20"
              />
            </div>
          </section>

          {/* Features Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            </div>
            
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-gray-400">–</span>
                  <span className="text-gray-300">{tech.description}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-16 text-gray-400">
            <p className="mb-4">September 2023</p>
            <p>&copy; 2023 Ramji. Built with Node.js and Hugging Face API.</p>
          </footer>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
