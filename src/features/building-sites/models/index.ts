export interface BuildingSite {
  id: number;
  address: string;
  city: string;
  description: string;
  district: string;
  status: "ativo" | "inativo";
}
