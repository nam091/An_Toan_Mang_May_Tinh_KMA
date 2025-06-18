// src/context/AuthContext.tsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  sub: string;
  email: string;
  roles?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Hàm giải mã và set state
  const handleToken = (token: string) => {
    try {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      setToken(token);
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      handleToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    handleToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    // Chuyển hướng tới backend để đăng xuất khỏi Keycloak
    window.location.href = 'http://localhost:3001/api/auth/logout';
};

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};