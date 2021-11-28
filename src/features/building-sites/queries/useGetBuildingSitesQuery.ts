import { useQuery } from "react-query";
import { BuildingSite } from "../models";
import { client } from "../../../lib/client";

export default function useGetBuildingSitesQuery() {
  const qs = new URLSearchParams({ _sort: "id" });

  return useQuery<BuildingSite[]>("buildingSites", () =>
    client(`building-sites?${qs}`)
  );
}
