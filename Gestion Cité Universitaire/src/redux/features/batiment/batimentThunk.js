import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBatiment, deleteBatiment, getBatiments, updateBatiment } from "../../../services/batimentService";

export const fetchBatiment = createAsyncThunk(
    "baitments/fetchBatiments",
    async () => {
        const response = await getBatiments();
        return response.data;
    }
);

export const addBatiment = createAsyncThunk(
    "batiments/createBatiment",
    async (data) => {
        const response = await createBatiment();
        return response.data;
    }
);

export const editBatiment = createAsyncThunk(
    "batiments/updateBatiment",
    async (idBat, data) => {
        const response = await updateBatiment(idBat, data);
        return response.data;
    }
)

export const removeBatiment = createAsyncThunk(
    "batiments/deleteBatiment",
    async (idBat) => {
        const response = await deleteBatiment(idBat);
        return response.data;
    }
)