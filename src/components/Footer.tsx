import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-gray-800 py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-white">Ramji</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>© 2023 Ramji. All rights reserved.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="mailto:contact@youremail.com"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              contact@youremail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;