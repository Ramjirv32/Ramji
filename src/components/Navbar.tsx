import React, { useState } from "react";

const navItems = ["Home", "About", "Projects", "Skills", "Contact", "Book a Call"];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav className="w-full bg-none text-white flex items-center justify-between px-8 py-4">
      <div className="text-3xl font-bold">Ramji</div>

      <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              active === item
                ? "bg-white text-black shadow-[0_0_10px_white]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="text-2xl">⌘</div>
    </nav>
  );
};

export default Navbar;
