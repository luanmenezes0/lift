import { atom } from "jotai";

interface DeleteBuildingSiteAtom {
  show: boolean;
  id: number | null;
}

export const deleteBuildingSiteAtom = atom<DeleteBuildingSiteAtom>({
  show: false,
  id: null,
});
