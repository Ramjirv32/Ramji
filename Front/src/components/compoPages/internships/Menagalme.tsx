import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer";

const Index = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/', { state: { scrollTo: 'works' } });
    
    setTimeout(() => {
      const worksSection = document.getElementById('works');
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const achievements = [
    {
      icon: "📚",
      title: "Publication Technology",
      description: "Worked on digital publishing platforms and content management systems for academic publications."
    },
    {
      icon: "💻",
      title: "Web Development",
      description: "Contributed to web-based solutions for publication workflows and content distribution."
    },
    {
      icon: "🗄️",
      title: "Database Management",
      description: "Gained experience with database design and management for publication data."
    },
    {
      icon: "🔧",
      title: "System Integration",
      description: "Worked on integrating various systems for seamless publication processes."
    },
    {
      icon: "📈",
      title: "Process Optimization",
      description: "Helped optimize publication workflows and improve system efficiency."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Collaborated with editorial and technical teams on various publication projects."
    }
  ];

  const technologies = [
    { name: "JavaScript", description: "Core programming language for development" },
    { name: "Web Development", description: "Frontend and backend web technologies" },
    { name: "Content Management", description: "CMS platforms and editorial tools" },
    { name: "Database Systems", description: "Data storage and management solutions" },
    { name: "API Integration", description: "Third-party service integrations" }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
          <div
            className="absolute top-1/5 left-1/5 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
              animationDuration: "2.8s",
              animationDelay: "0.8s"
            }}
          />
          <div
            className="absolute bottom-1/5 right-1/5 w-24 h-24 rounded-full blur-xl animate-pulse"
            style={{
              background: "rgba(30, 144, 255, 0.2)",
              animationDuration: "3.2s",
              animationDelay: "2.2s"
            }}
          />
        </div>

        {/* Back Button */}
        <div className="fixed top-6 left-6 z-50">
          <button 
            onClick={goBack} 
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 border border-[#00BFFF]/40"
            style={{
              boxShadow: "0 0 15px rgba(0, 191, 255, 0.3)"
            }}
          >
            <FaArrowLeft />
            <span>Back to Journey</span>
          </button>
        </div>

        {/* Header */}
        <header className="relative z-10 flex justify-center items-center p-6 md:p-8 pt-20 bg-black/50 backdrop-blur-md border-b border-[#00BFFF]/30">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)"
              }}
            >
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold">Menagalme Publication Internship</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 md:px-8">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
            <div className="mb-8">
              <span 
                className="bg-[#00BFFF]/20 border border-[#00BFFF]/40 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
                }}
              >
                May 1 - June 17, 2025
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent">
              Software Development Intern
            </h1>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaMapMarkerAlt className="text-[#00BFFF]" />
                <span>Remote/Hybrid</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendarAlt className="text-[#00BFFF]" />
                <span>1.5 Months</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A focused 1.5-month internship at Menagalme Publication where I contributed to digital publishing 
              solutions and gained valuable experience in publication technology and content management systems.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["JavaScript", "Web Development", "Content Management", "Database", "API Integration"].map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white/10 backdrop-blur-sm border border-[#00BFFF]/30 px-4 py-2 rounded-full text-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(0, 191, 255, 0.2)"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlight Card */}
            <div 
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📖</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Publication Technology Focus</h3>
                  <p className="text-gray-300">
                    This internship provided me with unique insights into the digital publishing industry. 
                    I worked on technology solutions that bridge the gap between traditional publishing 
                    and modern digital platforms, gaining experience in specialized publication workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Image Placeholder */}
            <div className="mb-16">
              <div 
                className="w-full max-h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-[#00BFFF]/40 flex items-center justify-center p-20"
                style={{
                  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)"
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Menagalme Publication</h3>
                  <p className="text-gray-300">Digital Publishing Solutions</p>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Contributions & Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                >
                  <div className="text-3xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies & Skills Developed</h2>
            </div>
            
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

          {/* Experience Summary */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Experience Summary</h2>
            <div 
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                <p className="text-gray-300 mb-4">
                  This internship at Menagalme Publication provided me with valuable exposure to the digital 
                  publishing industry and its unique technological challenges. Working on publication-focused 
                  software solutions enhanced my understanding of content management and editorial workflows.
                </p>
                <p className="text-gray-300">
                  The experience complemented my previous internship perfectly, giving me a broader perspective 
                  on different industry domains and their specific technological requirements.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;