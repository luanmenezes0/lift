import { useMutation, useQueryClient } from "react-query";
import { customInstance } from "src/lib/axios";

function deleteBuildingSite(id: number) {
  return customInstance({
    method: "DELETE",
    url: `/building-sites/${id}`,
  });
}

export default function useDeleteBuildingSiteMutation() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteBuildingSite(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("buildingSites");
    },
  });
}
