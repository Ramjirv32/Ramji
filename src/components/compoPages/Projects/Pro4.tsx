import React from 'react';

const Index = () => {
  const features = [
    {
      icon: "🎯",
      title: "Modern UI/UX",
      description: "Minimalist yet bold landing page design tailored for tech startups and AI tools."
    },
    {
      icon: "⚡",
      title: "Built with React",
      description: "Leverages modern React patterns for lightning-fast performance and SEO."
    },
    {
      icon: "🎨",
      title: "Tailwind CSS Styling",
      description: "Clean, scalable utility-first styles with custom components and consistent design tokens."
    },
    {
      icon: "🌟",
      title: "Smooth Animations",
      description: "Smooth entrance animations and scroll-based effects for enhanced user experience."
    },
    {
      icon: "📱",
      title: "TypeScript & Maintainability",
      description: "Typed components and props provide strong tooling and scalability."
    },
    {
      icon: "🚀",
      title: "Optimized Performance",
      description: "Globally fast and secure hosting with CDN, edge functions, and custom domains."
    }
  ];

  const technologies = [
    { name: "React", description: "Core UI library" },
    { name: "TypeScript", description: "Static typing for maintainable code" },
    { name: "Tailwind CSS", description: "Utility-first CSS for design system" },
    { name: "Vite", description: "Lightning fast build tool" },
    { name: "Lucide React", description: "Beautiful icon library" }
  ];

  return (
    <div className="min-h-screen bg-none text-white overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div> */}

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold">StarForge</span>
        </div>
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/20 transition-all duration-300">
          Check it out →
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-8">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center py-16 md:py-24">
          <div className="mb-8">
            <span className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium">
              GET STARTED
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            StarForge - AI SaaS Template
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            A sleek and modern AI SaaS landing page built for performance and visual impact. Designed with a focus on 
            engaging UI/UX and smooth interactions.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {["React", "TypeScript", "TailwindCSS", "Vite"].map((tech) => (
              <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* Built to Inspire Card */}
          <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 mb-16 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">💡</div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">Built to Inspire</h3>
                <p className="text-gray-300">
                  StarForge blends aesthetic appeal with performance. Whether you're building SaaS or just love beautiful UI — it's a 
                  reference to spark your next project.
                </p>
              </div>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore the Possibilities
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              of AI Chatting with <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent underline decoration-purple-400">StarForge</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Unleash the power of AI within Brainwave. Upgrade your productivity with 
              Brainwave, the open AI chat app.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              GET STARTED
            </button>
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
          <p className="mb-4">3/1/2024</p>
          <p>&copy; 2024 StarForge. Built with modern web technologies.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
