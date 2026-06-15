import { backendApi } from "./apiService";

export const getChambres = async (page = 1) => {
  const response = await backendApi.get(`/chambre/?page=${page}`);
  return response.data;
};

export const getFreeChambres = async () => {
  const response = await backendApi.get(`/chambre/free/`);
  return response.data;
};

export const getEtudiantChambre = async (idEtu) => {
  const response = await backendApi.get(`/etudiant/chambre/${idEtu}`);
  return response.data;
};

export const createChambre = async (data) => {
  const response = await backendApi.post("/chambre/", data);
  return response.data;
};

export const updateChambre = async (idCha, data) => {
  const response = await backendApi.put(`/chambre/${idCha}`, data);
  return response.data;
};

export const deleteChambre = async (idCha) => {
  const response = await backendApi.post(`/chambre/${idCha}`);
  return response.data;
};
