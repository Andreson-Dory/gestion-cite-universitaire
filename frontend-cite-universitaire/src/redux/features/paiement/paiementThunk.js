import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPaiement, deletePaiement, getPaiements } from "../../../services/paiementService";

export const fetchPaiement = createAsyncThunk(
    "baitments/fetchPaiements",
    async () => {
        const response = await getPaiements();
        return response;
    }
);

export const addPaiement = createAsyncThunk(
    "paiements/createPaiement",
    async (data) => {
        const response = await createPaiement(data);
        return response;
    }
);

export const removePaiement = createAsyncThunk(
    "paiements/deletePaiement",
    async (IdPai) => {
        const response = await deletePaiement(IdPai);
        return response;
    }
)