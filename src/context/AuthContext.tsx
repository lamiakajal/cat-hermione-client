"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session from localStorage on initial client mount
  useEffect(() => {
    const restoreSession = () => {
      try {
        const storedUser = localStorage.getItem("unitypulse_user");
        const storedToken = localStorage.getItem("unitypulse_token");
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to parse stored auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Handle successful user login
  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("unitypulse_user", JSON.stringify(userData));
    localStorage.setItem("unitypulse_token", authToken);
  };

  // Handle user logout and cleanup
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("unitypulse_user");
    localStorage.removeItem("unitypulse_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
