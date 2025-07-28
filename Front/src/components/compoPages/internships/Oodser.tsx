import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
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
      icon: "🚀",
      title: "Innovative AI Platform",
      description: "Worked on a LinkedIn-like platform with AI integration to automate job-related tasks, showcasing cutting-edge technology implementation."
    },
    {
      icon: "💻",
      title: "Frontend Mastery",
      description: "Started with React (JSX) and successfully transitioned to TypeScript (TSX), mastering both technologies with mentor guidance."
    },
    {
      icon: "🏗️",
      title: "Enterprise Backend Architecture",
      description: "Learned modular company-grade Node.js architecture with controllers, routes, middlewares, models, and server components."
    },
    {
      icon: "🗄️",
      title: "Database Migration",
      description: "Gained experience with both MongoDB and Supabase, including handling database migration in a production environment."
    },
    {
      icon: "🔐",
      title: "Security Best Practices",
      description: "Implemented project security measures and learned industry-standard practices for secure application development."
    },
    {
      icon: "⚡",
      title: "Full API Flow Understanding",
      description: "Mastered REST APIs and gained comprehensive understanding of complete API development lifecycle."
    }
  ];

  const technologies = [
    { name: "React (JSX & TSX)", description: "Frontend development with JavaScript and TypeScript" },
    { name: "TypeScript", description: "Successfully transitioned from JSX to TSX with AI assistance" },
    { name: "Node.js", description: "Company-structured backend with modular architecture" },
    { name: "Supabase", description: "Database management and migration from MongoDB" },
    { name: "REST APIs", description: "Complete API development and integration" },
    { name: "Git & GitHub", description: "Professional version control workflows" },
    { name: "Security Practices", description: "Application security implementation" },
    { name: "Deployment", description: "Basic deployment processes and practices" }
  ];

  const projectPhases = [
    {
      date: "January 20",
      title: "Project Introduction",
      description: "Started my journey as Full-Stack Developer Intern. Introduced to an innovative AI-integrated platform similar to LinkedIn."
    },
    {
      date: "January 22",
      title: "React Development Begins",
      description: "Started working on the web application using React (JSX). Intense learning curve with incredible mentor support."
    },
    {
      date: "Mid-Project",
      title: "TypeScript Transition",
      description: "Team transitioned to TypeScript (TSX). Took it as a challenge and successfully adapted with AI assistance."
    },
    {
      date: "Throughout",
      title: "Backend Architecture",
      description: "Learned modular Node.js architecture and gained comprehensive understanding of enterprise-level backend structure."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "4s"
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(30, 144, 255, 0.1) 50%, transparent 80%)",
              animationDuration: "3.5s",
              animationDelay: "1.5s"
            }}
          />
          <div
            className="absolute top-1/5 right-1/5 w-32 h-32 rounded-full blur-2xl animate-pulse"
            style={{
              background: "rgba(0, 191, 255, 0.2)",
              animationDuration: "2.8s",
              animationDelay: "0.8s"
            }}
          />
          <div
            className="absolute bottom-1/5 left-1/5 w-24 h-24 rounded-full blur-xl animate-pulse"
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
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-xl font-bold">Oodser Ltd Internship</span>
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
                January 20 - April 2025
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent">
              🚀 My Full-Stack Internship Journey
            </h1>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaMapMarkerAlt className="text-[#00BFFF]" />
                <span>Remote</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendarAlt className="text-[#00BFFF]" />
                <span>3+ Months</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              An incredible journey as a Full-Stack Developer Intern at Oodser, working on an innovative AI-integrated platform 
              similar to LinkedIn that automates job-related tasks. This ambitious project taught me enterprise-level development 
              and real-world problem-solving.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {["React (JSX & TSX)", "TypeScript", "Node.js", "Supabase", "REST APIs", "Security"].map((tech) => (
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
                <div className="text-2xl">🌟</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">🧠 Key Outcome</h3>
                  <p className="text-gray-300">
                    This internship gave me a solid foundation in full-stack development, improved my problem-solving ability, 
                    and introduced me to how real-world teams work in sync. I now feel confident working on both the frontend 
                    and backend of scalable applications with enterprise-level architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a 
                href="https://oodser.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] px-6 py-3 rounded-full hover:from-[#1E90FF] hover:to-[#00BFFF] transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)"
                }}
              >
                <FaExternalLinkAlt />
                <span>Visit Oodser</span>
              </a>
            </div>

            {/* Company Image */}
            <div className="mb-16">
              <div 
                className="w-full max-h-[400px] bg-gradient-to-r from-[#00BFFF]/20 to-[#1E90FF]/20 rounded-xl border border-[#00BFFF]/40 overflow-hidden"
                style={{
                  boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)"
                }}
              >
                <img
                  src="/oodser.png"
                  alt="Oodser Ltd Company"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: "brightness(0.9) contrast(1.1)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Project Timeline */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">🌐 Project Timeline</h2>
            <div className="space-y-6">
              {projectPhases.map((phase, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BFFF]/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 191, 255, 0.1)"
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className="bg-[#00BFFF] text-white px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        boxShadow: "0 0 10px rgba(0, 191, 255, 0.5)"
                      }}
                    >
                      {phase.date}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{phase.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Grid */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Achievements & Learning</h2>
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

          {/* Backend Architecture Section */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">⚙️ Backend Architecture Mastery</h2>
            <div 
              className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8 mb-8"
              style={{
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
              }}
            >
              <p className="text-gray-300 mb-6 text-center">
                The backend was built using Node.js with a modular company-grade architecture:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["controllers/", "routes/", "middlewares/", "models/", "server/"].map((component, index) => (
                  <div 
                    key={index}
                    className="bg-black/30 border border-[#00BFFF]/20 rounded-lg p-4 text-center"
                  >
                    <span className="text-[#00BFFF] font-mono font-semibold">{component}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mt-6 text-center">
                Initially challenging, but now I can implement and work within this architecture effectively!
              </p>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="max-w-6xl mx-auto py-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl md:text-3xl font-bold">Technologies & Skills Gained</h2>
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

          {/* Mentors & Leadership Section */}
          <section className="max-w-6xl mx-auto py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Mentorship & Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mentors */}
              <div 
                className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">👨‍💻</div>
                  <h3 className="text-xl font-semibold mb-4">Technical Mentors</h3>
                  <p className="text-gray-300 mb-4">
                    Heartfelt gratitude to my mentors <span className="text-[#00BFFF] font-semibold">Harsha Magapu</span> and 
                    <span className="text-[#00BFFF] font-semibold"> Shashank Aluru</span> who explained concepts clearly and 
                    provided effective solutions to any problems I faced.
                  </p>
                  <p className="text-gray-300">
                    Their guidance helped me progress quickly through the intense learning curve.
                  </p>
                </div>
              </div>

              {/* CEO Leadership */}
              <div 
                className="bg-[#00BFFF]/10 backdrop-blur-sm border border-[#00BFFF]/30 rounded-2xl p-8"
                style={{
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)"
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-4">Leadership Guidance</h3>
                  <p className="text-gray-300 mb-4">
                    Special thanks to <span className="text-[#00BFFF] font-semibold">Ramu</span>, the CEO of Oodser, 
                    who constantly motivated me and personally guided me through each task.
                  </p>
                  <p className="text-gray-300">
                    His support helped me understand not just coding but the value of organized development, 
                    teamwork, and real-world problem-solving.
                  </p>
                </div>
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