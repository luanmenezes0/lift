import { useQuery } from "react-query";

import { client } from "../../../lib/client";
import { BuildingSite } from "../models";

export default function useGetBuildingSiteQuery(id: number) {
  return useQuery<BuildingSite>(
    ["buildingSite", id],
    () => client(`building-sites/${id}`),
    { enabled: Boolean(id) }
  );
}
