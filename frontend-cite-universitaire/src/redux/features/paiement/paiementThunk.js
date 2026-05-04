import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPaiement, deletePaiement, getPaiements } from "../../../services/paiementService";

export const fetchPaiement = createAsyncThunk(
    "baitments/fetchPaiements",
    async () => {
        const response = await getPaiements();
        return response.data;
    }
);

export const addPaiement = createAsyncThunk(
    "paiements/createPaiement",
    async (data) => {
        const response = await createPaiement();
        return response.data;
    }
);

export const removePaiement = createAsyncThunk(
    "paiements/deletePaiement",
    async (idBat) => {
        const response = await deletePaiement(idBat);
        return response.data;
    }
)