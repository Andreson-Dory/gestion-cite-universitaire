import { authApi } from "./apiService";

export const loginUser = async (data) => {
  return authApi.post(`/login`, data);
};
