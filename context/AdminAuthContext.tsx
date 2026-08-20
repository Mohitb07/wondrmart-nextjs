"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  setAdminToken,
  getAdminToken,
  adminLoginApi,
  adminRegisterApi,
  getAdminProfileApi,
} from "@/api/adminApi";
import { AdminUser, AdminRegisterResponse } from "@/types/admin";

type ThemeMode = "dark" | "light";

interface AdminAuthContextValue {
  admin: AdminUser | null;
  loading: boolean;
  theme: ThemeMode;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<AdminRegisterResponse>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    // Check saved theme preference
    const savedTheme = localStorage.getItem("admin_theme") as ThemeMode | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("admin_theme", nextTheme);
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initAdminAuth() {
      const token = getAdminToken();
      if (token) {
        try {
          const res = await getAdminProfileApi();
          if (mounted && res.admin) {
            setAdmin(res.admin);
          }
        } catch (err) {
          // invalid token
          setAdminToken(null);
          setAdmin(null);
        }
      }
      if (mounted) {
        setLoading(false);
      }
    }

    initAdminAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await adminLoginApi(email, password);
    setAdminToken(res.token);
    setAdmin(res.admin);
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string, role?: string) => {
      const res = await adminRegisterApi(username, email, password, role);
      return res;
    },
    []
  );

  const logout = useCallback(() => {
    setAdminToken(null);
    setAdmin(null);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        theme,
        toggleTheme,
        login,
        register,
        logout,
      }}
    >
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
