"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { signInAdmin } from "@/firebaseConfig";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status on mount if needed, e.g., using Firebase auth state observer
    // For now, we rely on the login function to set isAuthenticated
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInAdmin(email, password);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    // Implement Firebase logout here if needed
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
