import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStatistiques } from "@/services/statistiqueService";

export const fetchStatistique = createAsyncThunk(
    "statistiques/fetchStatistiques",
    async () => {
        const response = await getStatistiques();
        return response;
    }
);