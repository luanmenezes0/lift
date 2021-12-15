import { useMutation, useQueryClient } from "react-query";

import { client } from "../../../lib/client";
import { BuildingSite } from "../models";

export default function useEditBuildingSitesMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (bs: Partial<BuildingSite>) =>
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
