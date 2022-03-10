import { useQuery } from "react-query";
import { customInstance } from "src/lib/axios";
import { User } from "../models";

export const getUsersMe = () => {
  return customInstance<User>({
    url: `/users/me`,
    method: "get",
  });
};

export default function useGetMeQuery() {
  return useQuery<User>([`/users/me`], getUsersMe, { enabled: false });
}
