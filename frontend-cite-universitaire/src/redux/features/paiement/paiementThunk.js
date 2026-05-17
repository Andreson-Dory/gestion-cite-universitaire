import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPaiement, deletePaiement, getPaiements } from "../../../services/paiementService";

export const fetchPaiement = createAsyncThunk(
    "paiements/fetchPaiements",
    async (_, {rejectWithValue}) => {
        try{
            const response = await getPaiements();
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

export const addPaiement = createAsyncThunk(
    "paiements/createPaiement",
    async (data, {rejectWithValue}) => {
        try{
            const response = await createPaiement(data);
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

export const removePaiement = createAsyncThunk(
    "paiements/deletePaiement",
    async (IdPai, {rejectWithValue}) => {
        try{
            const response = await deletePaiement(IdPai);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Erreur serveur"
                }
            );
        }
    }
)