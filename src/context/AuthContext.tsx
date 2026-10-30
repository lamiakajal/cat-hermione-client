"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import axios from "axios";

export interface User {
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, photoURL: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getStoredUser = (): User | null => {
  try {
    const saved = localStorage.getItem("social_events_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useSyncExternalStore<User | null>(
    subscribeToStorage,
    getStoredUser,
    () => null,
  );

  const loading = false;

  const login = async (userData: User) => {
    localStorage.setItem("social_events_user", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));

    try {
      await axios.post(
        `${API_BASE_URL}/auth/jwt`,
        { email: userData.email, name: userData.name },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("JWT synchronization error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("social_events_user");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const updateUserProfile = (name: string, photoURL: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, photoURL };
    localStorage.setItem("social_events_user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUserProfile }}
    >
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
