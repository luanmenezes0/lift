import { useMutation, useQueryClient } from "react-query";
import { BuildingSite } from "../models";
import { client } from "../../../lib/client";

export default function useEditBuildingSitesMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (bs: BuildingSite) =>
      client(`building-sites/${bs.id}`, {
        body: JSON.stringify(bs),
        method: "PUT",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("buildingSites");
      },
    }
  );
}
