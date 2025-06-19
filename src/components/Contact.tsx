import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2'; // Uncomment this import
import * as THREE from 'three';

const generateSpherePoints = () => {
  const points = [];
  for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    
    // Check for NaN values before adding
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      points.push(x, y, z);
    }
  }
  return new Float32Array(points);
};

// When creating the BufferGeometry:
const geometry = new THREE.BufferGeometry();
const vertices = generateSpherePoints();

// Only set the attribute if vertices has valid values
if (vertices.length > 0) {
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
}

export default function ContactComponent() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Let's work together!";
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Form state
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.user_name || !formData.user_email || !formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields',
        background: '#151030',
        color: '#ffffff',
        confirmButtonColor: '#7e22ce'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log the data being sent for debugging
      console.log('Sending data to API:', {
        name: formData.user_name,
        email: formData.user_email,
        message: formData.message
      });

      // Send directly to the backend API
      const response = await fetch('https://luxor-backend.vercel.app/api/port', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.user_name,
          email: formData.user_email,
          message: formData.message
        }),
      });
      
      // Even if the request returns an error status, try to parse the response
      const data = await response.json().catch(() => ({ error: 'Failed to parse server response' }));
      
      if (response.ok) {
        // Success message
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: data.message || 'Thank you for reaching out. I\'ll get back to you soon!',
          background: '#151030',
          color: '#ffffff',
          confirmButtonColor: '#7e22ce'
        });
        
        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          message: ''
        });
      } else {
        // Handle error response
        throw new Error(data.error || 'Something went wrong sending your message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // More detailed error message to help with debugging
      Swal.fire({
        icon: 'error',
        title: 'Message Not Sent',
        html: `
          <p>Failed to send message. Please try again later or contact me directly.</p>
          <p class="mt-2 text-sm text-gray-400">Error: ${error.message || 'Unknown error'}</p>
          <p class="mt-1 text-sm text-purple-400">Email: ramjib2311@gmail.com</p>
        `,
        background: '#151030',
        color: '#ffffff',
        confirmButtonColor: '#7e22ce'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fixed typing animation effect
  useEffect(() => {
    let typingInterval: ReturnType<typeof setInterval>;
    
    // Function to handle typing animation
    const handleTypingAnimation = () => {
      setDisplayText(prevText => {
        if (!isDeleting) {
          const nextText = fullText.slice(0, prevText.length + 1);
          
          // If we've completed typing the full text
          if (nextText === fullText) {
            setTimeout(() => {
              setIsDeleting(true);
              setTypingSpeed(100);
            }, 2000);
          }
          
          return nextText;
        } else {
          const nextText = fullText.slice(0, prevText.length - 1);
          
          // If we've deleted the entire text
          if (nextText === '') {
            setIsDeleting(false);
            setTypingSpeed(500);
          }
          
          return nextText;
        }
      });
    };
    
    // Set up the interval
    typingInterval = setInterval(handleTypingAnimation, typingSpeed);
    
    // Clean up the interval on component unmount or dependency change
    return () => {
      clearInterval(typingInterval);
    };
  }, [isDeleting, fullText, typingSpeed]); // Reduced dependencies

  // Cursor blink effect (separate effect)
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(cursorInterval);
    };
  }, []); // No dependencies, runs once

  // AOS initialization (separate effect)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []); // No dependencies, runs once

  return (
    <>
      <section className="relative bg-none py-4 md:py-16 w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-none opacity-40 rounded-full blur-3xl"></div>
        <div className="hidden sm:flex fixed md:absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 flex-col gap-2 md:gap-3 z-50 pointer-events-auto">
          {[ 
            { name: 'Twitter', icon: <FaTwitter size={22} className="md:text-2xl" />, href: '#' },
            { name: 'LinkedIn', icon: <FaLinkedin size={22} className="md:text-2xl" />, href: 'https://www.linkedin.com/in/ramji-b-613539308/' },
            { name: 'GitHub', icon: <FaGithub size={22} className="md:text-2xl" />, href: 'https://github.com/Ramjirv32' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer" 
              className="w-6 h-6 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors cursor-pointer relative z-50"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="container relative mx-auto px-3 md:px-4 max-w-6xl z-20">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-12">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 relative z-20">
              <h2 
                className="text-xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-6 text-white inline-block"
                data-aos="zoom-out"
              >
                {displayText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </h2>
              <p className="text-sm md:text-2xl text-gray-300 mb-4 md:mb-8" data-aos="fade-up">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <div className="flex flex-col space-y-2 md:space-y-4" data-aos="fade-up">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-purple-400 text-base md:text-3xl" />
                  <span className="text-xs md:text-2xl text-gray-300">ramjib2311@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative z-30 pointer-events-auto">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6 relative">
                <input 
                  type="text" 
                  name="user_name"
                  required
                  placeholder="Your Name" 
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 text-white placeholder-gray-400 text-xs md:text-xl px-3 md:px-4 py-2 md:py-3 rounded-md md:rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 relative z-30 pointer-events-auto"
                />
                <input 
                  type="email" 
                  name="user_email"
                  required
                  placeholder="Your Email" 
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 text-white placeholder-gray-400 text-xs md:text-xl px-3 md:px-4 py-2 md:py-3 rounded-md md:rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 relative z-30 pointer-events-auto"
                />
                <textarea 
                  name="message"
                  required
                  placeholder="Your Message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 text-white placeholder-gray-400 text-xs md:text-xl px-3 md:px-4 py-2 md:py-3 rounded-md md:rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none relative z-30 pointer-events-auto"
                ></textarea>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs md:text-xl px-3 md:px-6 py-2 md:py-3 rounded-md md:rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 relative z-30 pointer-events-auto ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-purple-900'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
