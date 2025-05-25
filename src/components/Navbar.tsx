import React, { useState } from "react";

// Define nav items with their corresponding section IDs
const navItems = [
  { name: "Home", id: "home" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
  { name: "Certifcations", id: "boo-call" }
];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const handleNavClick = (item: string, id: string) => {
    setActive(item);
    
    // Get the element by ID
    const element = document.getElementById(id);
    
    // Scroll to the element if it exists
    if (element) {
      // Offset for navbar height
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50 text-white flex items-center justify-between px-8 py-4">
      <div className="text-3xl font-bold">Ramji</div>

      <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.name, item.id)}
            className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              active === item.name
                ? "bg-white text-black shadow-[0_0_10px_white]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="text-2xl">⌘</div>
    </nav>
  );
};

export default Navbar;
