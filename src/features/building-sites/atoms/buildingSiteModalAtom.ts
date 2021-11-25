import { atom } from "jotai";

interface BuildingSiteModalAtom {
  show: boolean;
  editMode: boolean;
  id: number | null;
}

export const buildingSiteModalAtom = atom<BuildingSiteModalAtom>({
  show: false,
  editMode: false,
  id: null,
});
