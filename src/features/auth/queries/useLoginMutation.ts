import { useMutation } from "react-query";
import client from "../../../lib/client";

interface LoginParams {
  identifier: string;
  password: string;
}

export default function useLoginMutation() {
  return useMutation((params: LoginParams) =>
    client.post("auth/local", { json: params })
  );
}
