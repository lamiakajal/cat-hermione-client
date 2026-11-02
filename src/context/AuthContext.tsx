"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, ApiError } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const USER_KEY = "unitypulse_user";
const TOKEN_KEY = "unitypulse_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Stays true until the saved session has been read, so private routes
  // never redirect to /login while a reload is still restoring the user
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  useEffect(() => {
    const restore = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);

      if (!savedToken || !savedUser) {
        setLoading(false);
        return;
      }

      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        clearSession();
        setLoading(false);
        return;
      }
      setLoading(false);

      // Confirm the token is still valid in the background
      try {
        const res = await api<{ user: User }>("/auth/me", { token: savedToken });
        setUser(res.user);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      } catch (err) {
        // Only drop the session when the server says the token is bad,
        // not when it is merely unreachable
        if (err instanceof ApiError && [401, 403, 404].includes(err.status)) {
          clearSession();
        }
      }
    };

    void restore();
  }, [clearSession]);

  const login = useCallback((userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, authToken);
  }, []);

  const updateUser = useCallback((updatedData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updatedData };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, logout: clearSession, updateUser }),
    [user, token, loading, login, clearSession, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
