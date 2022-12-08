import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { useToast } from "../hooks/useToast";
import { api } from "../services/api";

export type UserType = {
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
  loading: boolean;
};

type AuthApiResponseType = {
  token: string;
  user: UserType;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const isAuthenticated = !!user;

  const saveUser = (user: UserType, token: string) => {
    setCookie(undefined, "letnote.user", JSON.stringify({ user, token }), {
      maxAge: 10 * 365 * 24 * 60 * 60, // infinite-ish
    });

    setUser(user);

    toast.show({
      title: "Sucesso!",
      desc: "Autenticado com sucesso.",
      type: "success",
    });
    (window as Window).location = "/";
  };

  const signIn: SignInType = async (email, password) => {
    setLoading(true);

    try {
      const res = await api.post<AuthApiResponseType>("auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;

      saveUser(user, token);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const signUp: SignUpType = async (name, email, password) => {
    setLoading(true);

    try {
      const { user, token } = (
        await api.post<AuthApiResponseType>("auth/register", {
          name,
          email,
          password,
        })
      ).data;

      saveUser(user, token);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
