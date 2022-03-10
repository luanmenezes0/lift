export type NewBuildingSiteStatus = "ativo" | "inativo";

export const NewBuildingSiteStatus = {
  ativo: "ativo" as NewBuildingSiteStatus,
  inativo: "inativo" as NewBuildingSiteStatus,
};
export interface BuildingSite {
  id: number;
  address: string;
  city: string;
  description: string;
  district: string;
  status: "ativo" | "inativo";
}

export interface NewBuildingSite {
  address: string;
  city: string;
  district: string;
  description: string;
  status: NewBuildingSiteStatus;
}
