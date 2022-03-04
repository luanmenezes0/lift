import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import api from "../../lib/client";
import useLoginMutation from "../auth/queries/useLoginMutation";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useLoginMutation();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "token@lift": token } = parseCookies();

    if (token) {
      api("users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then(setUser);
    } else {
      Router.push("/login");
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const response = await login.mutateAsync({
      identifier: email,
      password,
    });

    const { jwt, user } = await response.json();
    console.log(jwt);
    console.log(user);

    setCookie(undefined, "token@lift", jwt, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    // api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
