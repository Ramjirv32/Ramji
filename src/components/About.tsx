"use client";

import { useEffect, useState } from 'react';
// import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <section id="about" className="w-full py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-purple-600 mx-auto"></div>
        </div>

        {/* Content container - flexbox for side by side layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - About content */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6" data-aos="fade-up">
                Full Stack Developer & Cloud Enthusiast
              </h3>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed" data-aos="fade-up">
                My name is Ramji, and I am a Full Stack Developer currently studying in II CSE B at KPRIET. There has always been a burning passion for creating new things and a constant urge to learn, which has driven me into the technology industry.
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
                I have experience in both frontend and backend development, and I am looking for more new opportunities. Recently, I have been working on integrating cloud technologies into applications because I believe they are essential for building strong applications in the modern world.
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4" data-aos="fade-up">
                If I am not working on code, I love browsing for new tech, working on open-source projects, or thinking about my next move. I am always ready for collaboration and new opportunities in web development and cloud technologies.
              </p>

              <div className="flex flex-wrap gap-4 mt-8" data-aos="fade-up">
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition duration-300"
                >
                  Get In Touch
                </motion.a>
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  className="border border-purple-500 text-purple-500 px-6 py-2.5 rounded-lg font-medium hover:bg-purple-500/10 transition duration-300"
                >
                  View My Work
                </motion.a>
              </div>
              
              {/* Location popup */}
              <AnimatePresence>
                {showLocation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-purple-500/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 rounded-full p-2">
                        <FaMapMarkerAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Chennai, India</h4>
                        <p className="text-gray-300 text-sm">13.0827° N, 80.2707° E</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      Based in Chennai, a tech hub known for its vibrant IT industry and cultural heritage.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Earth image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            data-aos="fade-left"
          >
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] animate-float">
              <img
                src="/earth.png" 
                alt="Digital Earth Globe"
                width={400}
                height={400}
                className="object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
              
              {/* Location marker */}
              <motion.div 
                className="absolute cursor-pointer"
                style={{ top: '35%', left: '60%' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut" 
                }}
                onClick={() => setShowLocation(!showLocation)}
              >
                <div className="relative">
                  <FaMapMarkerAlt 
                    className="text-red-500 text-3xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] ml-[-54px] mt-[10px]" 
                  />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/20 rounded-full animate-ping"></div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-black/80 text-white text-xs py-1 px-2 rounded">
                  Click here to view location
                </div>
              </motion.div>
              
              <div className="absolute inset-0 rounded-full animate-pulse bg-blue-500/20 blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;