import { backendApi } from "./apiService";

export const getAttribuers = async (page = 1) => {
  const response = await backendApi.get(`/attribuer/?page=${page}`);
  return response.data;
};

export const createAttribuer = async (data) => {
  const response = await backendApi.post("/attribuer/", data);
  return response.data;
};

export const updateAttribuer = async (IdAtt, data) => {
  const response = await backendApi.put(`/attribuer/${IdAtt}`, data);
  return response.data;
};

export const toggleToFinishedAttribuer = async (data) => {
  const response = await backendApi.put(`/attribuer/toggle/`, data);
  return response.data;
};

export const deleteAttribuer = async (IdAtt) => {
  const response = await backendApi.post(`/attribuer/${IdAtt}`);
  return response.data;
};
