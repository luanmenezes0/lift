import { useMutation } from "react-query";
import { customInstance } from "src/lib/axios";
import { User } from "../models";

interface LoginParams {
  identifier: string;
  password: string;
}

function login(data: LoginParams) {
  return customInstance<{ jwt: string; user: User }>({
    method: "post",
    url: "auth/local",
    data,
  });
}

export default function useLoginMutation() {
  return useMutation((params: LoginParams) => login(params));
}
