import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStatistiques } from "@/services/statistiqueService";

export const fetchStatistique = createAsyncThunk(
    "statistiques/fetchStatistiques",
    async (_, {rejectWithValue}) => {
        try{
            const response = await getStatistiques();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Erreur serveur"
                }
            );
        }
    }
);