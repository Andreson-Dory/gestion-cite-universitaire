import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReclamation, deleteReclamation, getReclamations, updateReclamation } from "../../../services/reclamationService";

export const fetchReclamation = createAsyncThunk(
    "baitments/fetchReclamations",
    async () => {
        const response = await getReclamations();
        return response.data;
    }
);

export const addReclamation = createAsyncThunk(
    "reclamations/createReclamation",
    async (data) => {
        const response = await createReclamation();
        return response.data;
    }
);

export const editReclamation = createAsyncThunk(
    "reclamations/updateReclamation",
    async (idBat, data) => {
        const response = await updateReclamation(idBat, data);
        return response.data;
    }
)

export const removeReclamation = createAsyncThunk(
    "reclamations/deleteReclamation",
    async (idBat) => {
        const response = await deleteReclamation(idBat);
        return response.data;
    }
)