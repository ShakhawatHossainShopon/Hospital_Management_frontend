'use client';
import { loginService, logOut } from '@/services/auth/loginService';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

type User = {
  password: string;
  email: string;
} | null;

// Define context type
type AuthContextType = {
  login: (userData: Exclude<User, null>) => void;
  logout: () => void;
  logoutLoading: boolean;
  loginLoading: boolean;
};

// Create context with default null (will be checked in useAuth)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for provider
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const login = async (userData: Exclude<User, null>) => {
    setLoginLoading(true);
    try {
      const id = await loginService(userData);
      router.push(`/${id}`); // Redirect here after success
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error('Invalid email and password');
      throw error; // rethrow if callers need it
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    setLogoutLoading(true);
    try {
      const res = await logOut();
      toast.success(res.message);
      Cookies.remove('accessToken');
      Cookies.remove('userid');
    } finally {
      setLogoutLoading(false);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, logoutLoading, loginLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with safety check
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
