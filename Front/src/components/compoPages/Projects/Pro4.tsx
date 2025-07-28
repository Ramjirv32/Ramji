import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
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
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background glow */}
          <div
            className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
          {/* Floating accent glows */}
          <div
            className="absolute top-1/5 left-1/5 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
              animationDuration: "2.8s",
              animationDelay: "0.8s"
            }}
          />
          <div
            className="absolute bottom-1/6 right-1/6 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(30, 144, 255, 0.2)",
              animationDuration: "3.2s",
              animationDelay: "2.2s"
            }}
          />
        </div>

        {/* Back Button with glow */}
        <div className="fixed top-6 left-6 z-50" data-aos="fade-down">
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
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#00BFFF]/30" data-aos="fade-down" data-aos-delay="200">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)"
              }}
            >
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold">AI Image Generator</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8" data-aos="fade-up">
              <span 
                className="bg-[#00BFFF]/20 border border-[#00BFFF]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
                }}
              >
                September 2023
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent" data-aos="fade-up" data-aos-delay="200">
              AI Image Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              An AI-powered application that transforms text descriptions into stunning images using
              Hugging Face's state-of-the-art AI models with an intuitive and user-friendly interface.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-12" data-aos="fade-up" data-aos-delay="600">
              {["Node.js", "Hugging Face API", "React", "Express"].map((tech, index) => (
                <span 
                  key={tech} 
                  className="bg-white/10 backdrop-blur-sm border border-[#00BFFF]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(0, 191, 255, 0.2)"
                  }}
                  data-aos="zoom-in"
                  data-aos-delay={600 + index * 100}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project highlight card with glow */}
            <div 
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
              data-aos="fade-up"
              data-aos-delay="800"
            >
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

            {/* Project links with glow */}
            <div className="flex flex-wrap gap-4 justify-center mb-12" data-aos="fade-up" data-aos-delay="1000">
              <a 
                href="https://github.com/Ramjirv32/AI-image-Generator-HUGGING-FACE" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 px-6 py-3 rounded-full transition-all duration-300 border border-[#00BFFF]/30"
                style={{
                  boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
                }}
              >
                <FaGithub className="text-xl" />
                <span>View on GitHub</span>
              </a>
              <a 
                href="https://ai-image-generator-hugging-face.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] px-6 py-3 rounded-full hover:from-[#1E90FF] hover:to-[#00BFFF] transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>View Live Demo</span>
              </a>
            </div>

            {/* Project image with glow */}
            <div className="mb-16" data-aos="zoom-in" data-aos-delay="1200">
              <img 
                src="/assets/Hug.png"
                alt="AI Image Generator"
                className="w-full max-h-[600px] object-contain object-center rounded-xl shadow-xl border border-[#00BFFF]/40"
                style={{
                  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)"
                }}
              />
            </div>
          </section>

          {/* Features Grid with glow */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
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
            <div className="flex items-center space-x-3 mb-8" data-aos="fade-up">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            </div>
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
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