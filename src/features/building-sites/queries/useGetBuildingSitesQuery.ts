import { useQuery } from "react-query";
import { customInstance } from "src/lib/axios";
import { ApiPaginationParams } from "src/types";
import { BuildingSite } from "../models";

function getBuildingSites(params?: ApiPaginationParams) {
  return customInstance<BuildingSite[]>({
    url: `/building-sites`,
    method: "get",
    params,
  });
}

export default function useGetBuildingSitesQuery(params?: ApiPaginationParams) {
  const keys = [`/building-sites`, ...(params ? [params] : [])];

  return useQuery<BuildingSite[]>(keys, () => getBuildingSites(params));
}
