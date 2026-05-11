import { backendApi } from "./apiService"

export const getStatistiques = async () => {
    const response = await backendApi.get("/statistique/");
    return response.data;
}