  "use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipe context untuk token
interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
}

// Inisialisasi context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk AuthContext
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mengakses context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
