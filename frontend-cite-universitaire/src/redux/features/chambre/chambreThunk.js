import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChambre, deleteChambre, getChambres, updateChambre } from "../../../services/chambreService";

export const fetchChambre = createAsyncThunk(
    "chambres/fetchChambres",
    async () => {
        const response = await getChambres();
        return response;
    }
);

export const addChambre = createAsyncThunk(
    "chambres/createChambre",
    async (data) => {
        const response = await createChambre(data);
        return response;
    }
);

export const editChambre = createAsyncThunk(
    "chambres/updateChambre",
    async ({IdCha, data}) => {
        const response = await updateChambre(IdCha, data);
        return response;
    }
)

export const removeChambre = createAsyncThunk(
    "chambres/deleteChambre",
    async (IdCha) => {
        const response = await deleteChambre(IdCha);
        return response;
    }
)