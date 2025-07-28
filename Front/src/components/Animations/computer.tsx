"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

export const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

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

          {/* Right side - Computer Image with Animation */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            data-aos="fade-left"
          >
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              {/* Using the image from your attachment */}
              <motion.img
                src="/computer-setup.png" 
                alt="Computer Workstation"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 1, 0, -1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Location marker */}
              <motion.div 
                className="absolute cursor-pointer z-10"
                style={{ top: '35%', right: '35%' }}
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
              
              {/* Add a subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
