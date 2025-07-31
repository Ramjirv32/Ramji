import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaTimes, FaUserPlus, FaSignInAlt, FaExclamationTriangle } from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    if (password.length < 10) {
      setPasswordError("Password must be at least 10 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Set session storage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", data.userId);
      if (data.role === 'admin') {
        sessionStorage.setItem("isAdmin", "true");
      }
      
      // Call the onLogin callback and close modal
      onLogin();
      onClose();
      
      // Force a small delay to ensure state propagation
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('authStateChanged'));
      }, 100);
      
    } catch (err: any) {
      // Fallback for admin hardcoded credentials
      if (email === "ramjib2311@gmail.com" && password === "vikas2311") {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("isAdmin", "true");
        sessionStorage.setItem("userId", "admin");
        
        onLogin();
        onClose();
        
        // Force state update
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('authStateChanged'));
        }, 100);
      } else {
        setError(err.message || "Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:9000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          password,
          fullName,
          role: "user"
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      
      setSuccessMessage("Account created successfully! You can now login.");
      setTimeout(() => {
        setShowSignup(false);
        setSuccessMessage("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword.length > 0 && newPassword.length < 10) {
      setPasswordError(`Password must be at least 10 characters long (${newPassword.length}/10)`);
    } else {
      setPasswordError("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {showSignup ? "Create Account" : "Admin Login"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
            {successMessage}
          </div>
        )}
        
        {!showSignup ? (
          <form onSubmit={handleLogin} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`bg-gray-800 border ${passwordError ? 'border-yellow-500' : 'border-gray-700'} text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-yellow-500' : 'focus:ring-blue-500'} focus:border-transparent`}
                  placeholder="Enter your password (min 10 characters)"
                  required
                />
                {passwordError && (
                  <div className="absolute right-0 top-0 h-full pr-3 flex items-center">
                    <FaExclamationTriangle className="text-yellow-500" />
                  </div>
                )}
              </div>
              {passwordError && (
                <p className="mt-2 text-yellow-500 text-xs flex items-center">
                  <FaExclamationTriangle className="mr-1" /> {passwordError}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading || !!passwordError}
              className={`w-full flex items-center justify-center ${
                passwordError 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              } text-white py-2 px-4 rounded-lg transition-colors duration-300`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Login
                </>
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              Need an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignup(true);
                  setError("");
                  setPasswordError("");
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`bg-gray-800 border ${passwordError ? 'border-yellow-500' : 'border-gray-700'} text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-yellow-500' : 'focus:ring-blue-500'} focus:border-transparent`}
                  placeholder="Choose a password (min 10 characters)"
                  required
                />
                {passwordError && (
                  <div className="absolute right-0 top-0 h-full pr-3 flex items-center">
                    <FaExclamationTriangle className="text-yellow-500" />
                  </div>
                )}
              </div>
              {passwordError && (
                <p className="mt-2 text-yellow-500 text-xs flex items-center">
                  <FaExclamationTriangle className="mr-1" /> {passwordError}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading || !!passwordError}
              className={`w-full flex items-center justify-center ${
                passwordError 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
              } text-white py-2 px-4 rounded-lg transition-colors duration-300`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Sign Up
                </>
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignup(false);
                  setError("");
                  setPasswordError("");
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginModal;