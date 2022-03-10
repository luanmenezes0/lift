import { useMutation, useQueryClient } from "react-query";
import { customInstance } from "src/lib/axios";
import { BuildingSite } from "../models";

const createBuildingSite = (newBuildingSite: BuildingSite) => {
  return customInstance({
    url: `/building-sites`,
    method: "post",
    data: newBuildingSite,
  });
};

export default function useCreateBuildingSitesMutation() {
  const queryClient = useQueryClient();

  return useMutation((data: BuildingSite) => createBuildingSite(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("buildingSites");
    },
  });
}
