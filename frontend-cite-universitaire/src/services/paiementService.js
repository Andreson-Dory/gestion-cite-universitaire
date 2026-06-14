import { backendApi } from "./apiService";

export const getPaiements = async () => {
  const response = await backendApi.get("/paiement/");
  return response.data;
};

export const getPaiementByEtudiant = async (idEtu) => {
  const response = await backendApi.get(`/etudiant/paiement/${idEtu}`);
  return response.data;
};

export const createPaiement = async (data) => {
  const response = await backendApi.post("/paiement/", data);
  return response.data;
};

export const deletePaiement = async (idPai) => {
  const response = await backendApi.post(`/paiement/${idPai}`);
  return response.data;
};
