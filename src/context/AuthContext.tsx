import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import keycloakInstance from '@/config/keycloak';

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

  const handleToken = (token: string | null) => {
    if (token) {
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
    window.location.href = 'http://localhost:3001/api/auth/logout';
  };
  
  // Token refresh function
  const refreshToken = async () => {
    try {
      if (keycloakInstance.isTokenExpired()) {
        const refreshed = await keycloakInstance.updateToken(30);
        if (refreshed) {
          console.log('Token refreshed successfully');
          // Có thể cập nhật state nếu cần
        }
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout(); // Now logout is in scope
    }
  };

  // Token refresh interval
  useEffect(() => {
    if (token) { // Using token instead of isAuthenticated
      const interval = setInterval(() => {
        refreshToken();
      }, 60000); // Kiểm tra mỗi phút
      
      return () => clearInterval(interval);
    }
  }, [token]); // Dependency on token instead of isAuthenticated

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