import { backendApi } from "./apiService"

export const getAttribuers = async () => {
    const response = await backendApi.get("/attribuer/");
    return response.data;
}

export const createAttribuer = async (data) => {
    const response = await backendApi.post("/attribuer/", data);
    return response.data;
}

export const updateAttribuer = async (IdAtt, data) => {
    const response = await backendApi.put(`/attribuer/${IdAtt}`, data);
    return response.data;
}

export const toggleToFinishedAttribuer = async (IdAtt) => {
    const response = await backendApi.put(`/attribuer/toggle/${IdAtt}`);
    return response.data;
} 

export const deleteAttribuer = async (IdAtt) => {
    const response = await backendApi.post(`/attribuer/${IdAtt}`);
    return response.data;
}