import { backendApi } from "./apiService";

export const getSanctions = async (page = 1) => {
  const response = await backendApi.get(`/sanction/?page=${page}`);
  return response.data;
};

export const getSanctionByEtudiant = async (idEtu, page = 1) => {
  const response = await backendApi.get(
    `/etudiant/sanction/${idEtu}?page=${page}`,
  );
  return response.data;
};

export const createSanction = async (data) => {
  const response = await backendApi.post("/sanction/", data);
  return response.data;
};

export const updateSanction = async (idSac, data) => {
  const response = await backendApi.put(`/sanction/${idSac}`, data);
  return response.data;
};

export const deleteSanction = async (idSac) => {
  const response = await backendApi.post(`/sanction/${idSac}`);
  return response.data;
};
