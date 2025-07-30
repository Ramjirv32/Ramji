import React, { useState } from 'react';
import { FaTimes, FaLock } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

// Get admin credentials from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "ramjib2311@gmail.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "vikas2311";

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simple credential check
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        throw new Error("Invalid credentials");
      }

      // Set session storage to remember logged-in state
      sessionStorage.setItem('isLoggedIn', 'true');
      
      // Call the onLogin callback
      onLogin();
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md">
      <div 
        className="bg-[#151030] border border-[#00BFFF]/30 rounded-lg p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FaLock className="text-[#00BFFF] mr-2" /> Admin Login
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <p className="mt-4 text-xs text-gray-500">
          This area is restricted to the site administrator. Unauthorized access attempts will be logged.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;