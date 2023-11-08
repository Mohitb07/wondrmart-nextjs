"use client"

import { Spinner } from "@nextui-org/react";
import { createContext } from "react";

import useGetUser from "../hooks/useGetUser";
import { User } from "../types";

type AuthUserContextType = {
  user: User | null | undefined;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const DEFAULT_VALUES: AuthUserContextType = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  error: null,
};

type AuthUserProviderProps = {
  children: React.ReactNode;
};

export const AuthUserContext =
  createContext<AuthUserContextType>(DEFAULT_VALUES);

export const AuthUserProvider: React.FC<AuthUserProviderProps> = ({
  children,
}) => {
  const { data, isError, isInitialLoading: isLoading, error } = useGetUser();
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const value = {
    user: data,
    isAuth: !isLoading && !isError && !!data,
    isLoading,
    isError,
    error,
  };
  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
};
