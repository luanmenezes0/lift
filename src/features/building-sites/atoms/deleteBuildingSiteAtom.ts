import { atomWithReset } from "jotai/utils";

interface DeleteBuildingSiteAtom {
  show: boolean;
  id: number | null;
  description: string;
}

export const deleteBuildingSiteAtom = atomWithReset<DeleteBuildingSiteAtom>({
  show: false,
  id: null,
  description: "",
});
