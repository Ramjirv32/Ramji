import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  full_name: string;
}

interface AuthContextType {
  isAdmin: boolean;
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  fetchUserData: () => Promise<void>;
  refreshAuthState: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  fetchUserData: async () => {},
  refreshAuthState: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const refreshAuthState = () => {
    const loginStatus = sessionStorage.getItem('isLoggedIn');
    const adminStatus = sessionStorage.getItem('isAdmin');
    
    setIsLoggedIn(loginStatus === 'true');
    setIsAdmin(adminStatus === 'true');
    
    if (loginStatus === 'true') {
      fetchUserData();
    } else {
      setUser(null);
    }
  };

  const login = () => {
    refreshAuthState();
    // Dispatch a custom event to notify all components
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: { isLoggedIn: true, isAdmin: sessionStorage.getItem('isAdmin') === 'true' } 
    }));
  };

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    
    // Dispatch a custom event to notify all components
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: { isLoggedIn: false, isAdmin: false } 
    }));
  };

  const fetchUserData = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:9000/auth/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      
      if (userData.role === 'admin') {
        sessionStorage.setItem('isAdmin', 'true');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    refreshAuthState();

    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      refreshAuthState();
    };

    // Listen for custom auth state change events
    const handleAuthStateChange = () => {
      refreshAuthState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleAuthStateChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthStateChange);
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAdmin, 
        isLoggedIn, 
        user,
        login, 
        logout,
        fetchUserData,
        refreshAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};