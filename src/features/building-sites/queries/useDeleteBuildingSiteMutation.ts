import { useMutation, useQueryClient } from "react-query";
import { client } from "../../../lib/client";

export default function useDeleteBuildingSiteMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => client(`building-sites/${id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("buildingSites");
      },
    }
  );
}
