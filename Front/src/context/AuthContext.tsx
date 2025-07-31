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
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  fetchUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setIsLoggedIn(true);
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
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
    const checkLoginStatus = () => {
      const loginStatus = sessionStorage.getItem('isLoggedIn');
      const adminStatus = sessionStorage.getItem('isAdmin');
      
      setIsLoggedIn(loginStatus === 'true');
      setIsAdmin(adminStatus === 'true');
      
      if (loginStatus === 'true') {
        fetchUserData();
      }
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
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
        fetchUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};