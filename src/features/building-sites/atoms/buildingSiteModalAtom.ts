import { atomWithReset } from "jotai/utils";

interface BuildingSiteModalAtom {
  show: boolean;
  editMode: boolean;
  id: number | null;
}

export const buildingSiteModalAtom = atomWithReset<BuildingSiteModalAtom>({
  show: false,
  editMode: false,
  id: null,
});
