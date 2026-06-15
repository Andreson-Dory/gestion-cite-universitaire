import { backendApi } from "./apiService";

export const getReclamations = async (page = 1) => {
  const response = await backendApi.get(`/reclamation/?page=${page}`);
  return response.data;
};

export const exportReclamations = async () => {
  const response = await backendApi.get(`/reclamation/export`);
  return response.data;
};

export const getReclamationByEtudiant = async (idEtu, page = 1) => {
  const response = await backendApi.get(
    `/etudiant/reclamation/${idEtu}?page=${page}`,
  );
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
