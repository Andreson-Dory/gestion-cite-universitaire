import { backendApi } from "./apiService";

export const getEtudiants = async () => {
  const response = await backendApi.get("/etudiant/");
  return response.data;
};

export const getEtudiantsFromChambre = async (idCha) => {
  const response = await backendApi.get(`/chambre/etudiant/${idCha}`);
  return response.data;
};

export const createEtudiant = async (data) => {
  const response = await backendApi.post("/etudiant/", data);
  return response.data;
};

export const updateEtudiant = async (idEtu, data) => {
  const response = await backendApi.put(`/etudiant/${idEtu}`, data);
  return response.data;
};

export const deleteEtudiant = async (idEtu) => {
  const response = await backendApi.post(`/etudiant/${idEtu}`);
  return response.data;
};
