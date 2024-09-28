import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout } from '../services/auth';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to verify the token here
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      // console.log('Full response:', response);
      // console.log('Access Token:', response.data.accessToken);

      if (response && response.data.accessToken) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.accessToken);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw the error to be handled by the component
    }
  };

  const registerUser = async (name: string, email: string, password: string) => {
    const response = await register(name, email, password);
    setUser(response.user);
    setIsAuthenticated(true);
    // localStorage.setItem('token', response.token);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, register: registerUser, logout: logoutUser, isAuthenticated }}>
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