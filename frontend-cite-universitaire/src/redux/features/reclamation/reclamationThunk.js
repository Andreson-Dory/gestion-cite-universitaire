import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReclamation, deleteReclamation, getReclamations, updateReclamation } from "../../../services/reclamationService";

export const fetchReclamation = createAsyncThunk(
    "baitments/fetchReclamations",
    async () => {
        const response = await getReclamations();
        return response;
    }
);

export const addReclamation = createAsyncThunk(
    "reclamations/createReclamation",
    async (data) => {
        const response = await createReclamation(data);
        return response;
    }
);

export const editReclamation = createAsyncThunk(
    "reclamations/updateReclamation",
    async ({IdRec, data}) => {
        const response = await updateReclamation(IdRec, data);
        return response;
    }
)

export const removeReclamation = createAsyncThunk(
    "reclamations/deleteReclamation",
    async (IdRec) => {
        const response = await deleteReclamation(IdRec);
        return response;
    }
)