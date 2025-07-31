import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import * as THREE from 'three';

// Use environment variables for API endpoints and email configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const CONTACT_ENDPOINT = `${API_URL}/api/contact`;
const EMAIL_TO = import.meta.env.VITE_EMAIL_TO || 'ramjib2311@gmail.com';

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

  // Add form validation state
  const [formErrors, setFormErrors] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  // Enhanced input validation
  const validateInput = (name: string, value: string) => {
    let error = '';
    
    switch(name) {
      case 'user_name':
        if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'user_email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate on change after initial submission attempt
    if (isSubmitting) {
      validateInput(name, value);
    }
  };

  // Enhanced blur handler for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isNameValid = validateInput('user_name', formData.user_name);
    const isEmailValid = validateInput('user_email', formData.user_email);
    const isMessageValid = validateInput('message', formData.message);
    
    // If any field is invalid, stop submission
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      // Focus on the first invalid field
      if (!isNameValid) {
        document.getElementsByName('user_name')[0].focus();
      } else if (!isEmailValid) {
        document.getElementsByName('user_email')[0].focus();
      } else {
        document.getElementsByName('message')[0].focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send to your backend API using environment variables
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.user_name,
          email: formData.user_email,
          message: formData.message,
          to: EMAIL_TO // Use environment variable
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success message
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: data.message || 'Thank you for reaching out. I\'ll get back to you soon!',
          background: '#151030',
          color: '#ffffff',
          confirmButtonColor: '#00BFFF'
        });
        
        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          message: ''
        });
        
        // Reset form errors
        setFormErrors({
          user_name: '',
          user_email: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Something went wrong sending your message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Get the appropriate error message
      const errorMessage = error.message === 'Failed to fetch' 
        ? 'Could not connect to the server. Please try again later.' 
        : error.message || 'Unknown error';
      
      Swal.fire({
        icon: 'error',
        title: 'Message Not Sent',
        html: `
          <p>Character must be minimum 10.</p>
          <p class="mt-2 text-sm text-gray-400">Error: ${errorMessage}</p>
          <p class="mt-1 text-sm text-[#00BFFF]">Email: ${EMAIL_TO}</p>
        `,
        background: '#151030',
        color: '#ffffff',
        confirmButtonColor: '#00BFFF'
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
      <section id="contact" className="relative bg-none py-8 md:py-16 lg:py-20 w-full min-h-screen flex items-center justify-center overflow-hidden ">
        {/* Optional background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/5 to-transparent opacity-40 pointer-events-none"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-20">
          {/* Section Title */}
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12 lg:mb-16">
            Contact <span className="text-[#00BFFF]">Me</span>
          </h2>
          
          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-12 lg:gap-16">
            
            {/* Left section - Contact Information */}
            <div className="w-full lg:w-1/2 mb-4 md:mb-8 lg:mb-0 relative z-20 text-center lg:text-left">
              {/* Animated Heading */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 text-white inline-block leading-tight"
                data-aos="zoom-out"
              >
                <span className="block sm:inline">
                  {displayText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-4 md:mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-aos="fade-up">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              
              {/* Contact Details */}
              <div className="flex flex-col space-y-3 md:space-y-4 lg:space-y-6" data-aos="fade-up">
                <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4">
                  <FaEnvelope className="text-[#00BFFF] text-lg sm:text-xl md:text-2xl lg:text-3xl flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-300 break-all">
                    {EMAIL_TO}
                  </span>
                </div>
              </div>
            </div>

            {/* Right section - Contact Form */}
            <div className="w-full lg:w-1/2 relative z-30 pointer-events-auto">
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4 md:space-y-6 relative group backdrop-blur-sm bg-gray-900/30 p-4 sm:p-6 md:p-8 rounded-xl border border-[#00BFFF]/20 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]"
              >
                {/* Form Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 md:mb-6 text-center lg:text-left">
                  Get In Touch
                </h3>
                
                {/* Name Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    placeholder="Your Name" 
                    value={formData.user_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-900/60 text-white placeholder-gray-400 text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg border ${
                      formErrors.user_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#00BFFF]/30 focus:border-[#00BFFF] focus:ring-[#00BFFF]'
                    } focus:outline-none focus:ring-1 relative z-30 transition-all duration-300`}
                  />
                  {formErrors.user_name && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.user_name}</p>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg -z-10"></div>
                </div>
                
                {/* Email Input */}
                <div className="relative">
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="Your Email" 
                    value={formData.user_email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-900/60 text-white placeholder-gray-400 text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg border ${
                      formErrors.user_email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#00BFFF]/30 focus:border-[#00BFFF] focus:ring-[#00BFFF]'
                    } focus:outline-none focus:ring-1 relative z-30 transition-all duration-300`}
                  />
                  {formErrors.user_email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.user_email}</p>
                  )}
                </div>
                
                {/* Message Textarea */}
                <div className="relative">
                  <textarea 
                    name="message"
                    required
                    placeholder="Your Message (minimum 10 characters)" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-900/60 text-white placeholder-gray-400 text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg border ${
                      formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#00BFFF]/30 focus:border-[#00BFFF] focus:ring-[#00BFFF]'
                    } focus:outline-none focus:ring-1 resize-none relative z-30 transition-all duration-300 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.message}</p>
                  )}
                  <div className="absolute bottom-2 right-2 text-xs sm:text-sm text-gray-400 z-40">
                    {formData.message.length}/10+ characters
                  </div>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting || !!formErrors.user_name || !!formErrors.user_email || !!formErrors.message || formData.message.length < 10}
                  className={`w-full bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 relative z-30 ${
                    (isSubmitting || !!formErrors.user_name || !!formErrors.user_email || !!formErrors.message || formData.message.length < 10) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
                
                {/* Footer Text */}
                <div className="text-xs sm:text-sm text-gray-400 mt-4 text-center">
                  Your message will be sent directly to my email. I'll respond as soon as possible.
                </div>
              </form>
            </div>
          </div>
          
          {/* Optional decorative elements - Hidden on mobile for cleaner look */}
          <div className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 bg-[#00BFFF]/10 rounded-full blur-3xl pointer-events-none hidden sm:block"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 md:w-40 md:h-40 bg-[#00BFFF]/5 rounded-full blur-3xl pointer-events-none hidden sm:block"></div>
        </div>
      </section>
    </>
  );
}
