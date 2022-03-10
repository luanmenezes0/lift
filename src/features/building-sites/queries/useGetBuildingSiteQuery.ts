import { useQuery } from "react-query";
import { customInstance } from "src/lib/axios";
import { BuildingSite } from "../models";

function getBuildingSite(id: number) {
  return customInstance<BuildingSite>({
    url: `building-sites/${id}`,
    method: "get",
  });
}

export default function useGetBuildingSiteQuery(id: number) {
  return useQuery<BuildingSite>(
    [`/building-sites/${id}`],
    () => getBuildingSite(id),
    { enabled: Boolean(id) }
  );
}
