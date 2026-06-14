import { backendApi } from "./apiService";

export const getPaiements = async (page = 1) => {
  const response = await backendApi.get(`/paiement/?page=${page}`);
  return response.data;
};

export const getPaiementByEtudiant = async (idEtu, page) => {
  const response = await backendApi.get(
    `/etudiant/paiement/${idEtu}?page=${page}`,
  );
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
