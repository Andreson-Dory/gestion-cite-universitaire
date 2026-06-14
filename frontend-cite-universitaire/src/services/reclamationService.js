import { backendApi } from "./apiService";

export const getReclamations = async () => {
  const response = await backendApi.get("/reclamation/");
  return response.data;
};

export const getReclamationByEtudiant = async (idEtu) => {
  const response = await backendApi.get(`/etudiant/reclamation/${idEtu}`);
  return response.data;
};

export const createReclamation = async (data) => {
  const response = await backendApi.post("/reclamation/", data);
  return response.data;
};

export const updateReclamation = async (idRec, data) => {
  const response = await backendApi.put(`/reclamation/${idRec}`, data);
  return response.data;
};

export const deleteReclamation = async (idRec) => {
  const response = await backendApi.post(`/reclamation/${idRec}`);
  return response.data;
};
