import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "src/lib/axios";

import useLoginMutation from "../queries/useLoginMutation";
import useGetMeQuery from "../queries/useMeQuery";

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
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useLoginMutation();

  const { refetch: getUser } = useGetMeQuery();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "token@lift": token } = parseCookies();

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      getUser().then(({ data }) => setUser(data));
    }
  }, [getUser]);

  async function signIn({ email, password }: SignInData) {
    const response = await login.mutateAsync({
      identifier: email,
      password,
    });

    const { jwt, user } = response;

    setCookie(undefined, "token@lift", jwt, {
      path: "/",
      maxAge: 60 * 60 * 1, // 1 hour
    });

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    setUser(user);

    Router.push("/");
  }

  function signOut() {
    destroyCookie(null, "token@lift", { path: "/" });

    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
