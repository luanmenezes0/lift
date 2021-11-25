import { useMutation, useQueryClient } from "react-query";
import { BuildingSite } from "../models";
import { client } from "../../../lib/client";

export default function useCreateBuildingSitesMutation() {
  const queryClient = useQueryClient();

  return useMutation((bs: BuildingSite) => client("building-sites", { body: JSON.stringify(bs) }), {
    onSuccess: () => {
      queryClient.invalidateQueries("buildingSites");
    },
  });
}
