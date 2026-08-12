"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  axiosInstance,
  setAccessToken,
  getAccessToken,
  doRefresh,
  isAccessTokenValid,
  getUserFromToken,
  onAuthError,
} from "@/api";
import { getUserByIdClient } from "@/actions/getUserClient";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthError(() => {
      if (mounted) {
        setUser(null);
        qc.removeQueries();
      }
    });

    (async () => {
      const token = getAccessToken();

      if (token && isAccessTokenValid(token)) {
        const tokenUser = getUserFromToken(token);
        const userId = tokenUser?.id || tokenUser?.customer_id;

        if (userId) {
          try {
            const fetchedUser = await getUserByIdClient(userId);
            if (fetchedUser) {
              if (!mounted) return;
              setUser(fetchedUser);
              qc.setQueryData(["user"], fetchedUser);
              setLoading(false);
              return;
            }
          } catch {
            /* fall back to doRefresh */
          }
        }
      }

      const result = await doRefresh();
      if (!mounted) return;

      if (result) {
        setUser(result.user);
        qc.setQueryData(["user"], result.user);
      } else {
        setUser(null);
        qc.removeQueries({ queryKey: ["user"] });
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [qc]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const data = res.data as { user: User; accessToken: string };
      setAccessToken(data.accessToken);
      setUser(data.user);
      qc.setQueryData(["user"], data.user);
    },
    [qc]
  );

  const register = useCallback(
    async (body: { email: string; username: string; password: string }) => {
      const res = await axiosInstance.post("/auth/register", body);
      const data = res.data as { user: User; accessToken: string };
      setAccessToken(data.accessToken);
      setUser(data.user);
      qc.setQueryData(["user"], data.user);
    },
    [qc]
  );

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setAccessToken(null);
    setUser(null);
    qc.removeQueries();
  }, [qc]);

  const logoutAll = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout_all");
    } catch {
      /* ignore */
    }
    setAccessToken(null);
    setUser(null);
    qc.removeQueries();
  }, [qc]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, logoutAll }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}