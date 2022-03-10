import { useMutation, useQueryClient } from "react-query";
import { customInstance } from "src/lib/axios";
import { BuildingSite } from "../models";

export async function editBuildingSite(buildingSite: Partial<BuildingSite>) {
  return customInstance({
    method: "PUT",
    url: `/building-sites/${buildingSite.id}`,
    data: buildingSite,
  });
}

export default function useEditBuildingSitesMutation() {
  const queryClient = useQueryClient();

  return useMutation((bs: Partial<BuildingSite>) => editBuildingSite(bs), {
    onSuccess: () => {
      queryClient.invalidateQueries("buildingSites");
    },
  });
}
