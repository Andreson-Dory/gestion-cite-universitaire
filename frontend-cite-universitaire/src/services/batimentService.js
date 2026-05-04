import { backendApi } from "./apiService"

export const getBatiments = async () => {
    const response = await backendApi.get("/batiment/");
    return response.data;
}

export const createBatiment = async (data) => {
    const response = await backendApi.post("/batiment/", data);
    return response.data;
}

export const updateBatiment = async (idBat, data) => {
    const response = await backendApi.put(`/batiment/${idBat}`, data);
    return response.data;
}

export const deleteBatiment = async (idBat) => {
    const response = await backendApi.post(`/batiment/${idBat}`);
    return response.data;
}