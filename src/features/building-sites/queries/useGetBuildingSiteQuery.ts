import { useQuery } from "react-query";
import { BuildingSite } from "../models";
import { client } from "../../../lib/client";

export default function useGetBuildingSiteQuery(id: number) {
  return useQuery<BuildingSite>(
    ["buildingSite", id],
    () => client(`building-sites/${id}`),
    { enabled: Boolean(id) }
  );
}
