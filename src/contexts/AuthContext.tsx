import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { createContext, ReactNode } from "react";

type UserType = {
  name: string;
  email: string;
  avatar: string;
};

type SignInType = (email: string, password: string) => Promise<void>;

type SignUpType = (
  name: string,
  email: string,
  password: string
) => Promise<void>;

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  signIn: SignInType;
  signUp: SignUpType;
};

type AuthApiResponseType = {
  token: string;
  user: UserType;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const isAuthenticated = !!user;

  const saveUser = (user: UserType, token: string) => {
    setCookie(undefined, "letnote.token", token, {
      maxAge: 10 * 365 * 24 * 60 * 60, // infinite-ish
    });

    setUser(user);

    Router.push("/");
  };

  const signIn: SignInType = async (email, password) => {
    const { user, token } = (
      await axios.post<AuthApiResponseType>(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      )
    ).data;

    saveUser(user, token);
  };

  const signUp: SignUpType = async (name, email, password) => {
    const { user, token } = (
      await axios.post<AuthApiResponseType>(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
        }
      )
    ).data;

    saveUser(user, token);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
