import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBatiment, deleteBatiment, getBatiments, updateBatiment } from "../../../services/batimentService";

export const fetchBatiment = createAsyncThunk(
    "batiments/fetchBatiments",
    async () => {
        const response = await getBatiments();
        return response;
    }
);

export const addBatiment = createAsyncThunk(
    "batiments/createBatiment",
    async (data) => {
        const response = await createBatiment(data);
        return response;
    }
);

export const editBatiment = createAsyncThunk(
    "batiments/updateBatiment",
    async ({IdBat: IdBat, data}) => {
        const response = await updateBatiment(IdBat, data);
        return response;
    }
)

export const removeBatiment = createAsyncThunk(
    "batiments/deleteBatiment",
    async (IdBat) => {
        const response = await deleteBatiment(IdBat);
        return response;
    }
)