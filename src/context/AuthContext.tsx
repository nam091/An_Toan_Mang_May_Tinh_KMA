// src/context/AuthContext.tsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define user data type from token
interface User {
  sub: string;
  email: string;
  // Add other fields if needed, e.g.: roles
}

// Define Context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // You can decode the token here to get user info if needed
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    // Temporarily set user as an empty object, will update after callback page
    setUser({ sub: '', email: '' }); 
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    // After removing token, redirect to home page
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook to use AuthContext more easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 