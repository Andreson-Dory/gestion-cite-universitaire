import { backendApi } from "./apiService"

export const getAttribuers = async () => {
    const response = await backendApi.get("/attribuer/");
    return response.data;
}

export const createAttribuer = async (data) => {
    const response = await backendApi.post("/attribuer/", data);
    return response.data;
}

export const updateAttribuer = async (idAtt, data) => {
    const response = await backendApi.put(`/attribuer/${idAtt}`, data);
    return response.data;
}

export const deleteAttribuer = async (idAtt) => {
    const response = await backendApi.post(`/attribuer/${idAtt}`);
    return response.data;
}