import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChambre, deleteChambre, getChambres, updateChambre } from "../../../services/chambreService";

export const fetchChambre = createAsyncThunk(
    "baitments/fetchChambres",
    async () => {
        const response = await getChambres();
        return response.data;
    }
);

export const addChambre = createAsyncThunk(
    "chambres/createChambre",
    async (data) => {
        const response = await createChambre();
        return response.data;
    }
);

export const editChambre = createAsyncThunk(
    "chambres/updateChambre",
    async (idBat, data) => {
        const response = await updateChambre(idBat, data);
        return response.data;
    }
)

export const removeChambre = createAsyncThunk(
    "chambres/deleteChambre",
    async (idBat) => {
        const response = await deleteChambre(idBat);
        return response.data;
    }
)