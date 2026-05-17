import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChambre, deleteChambre, getChambres, updateChambre } from "../../../services/chambreService";

export const fetchChambre = createAsyncThunk(
    "chambres/fetchChambres",
    async (_, {rejectWithValue}) => {
        try{
            const response = await getChambres();
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

export const addChambre = createAsyncThunk(
    "chambres/createChambre",
    async (data, {rejectWithValue}) => {
        try{
            const response = await createChambre(data);
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

export const editChambre = createAsyncThunk(
    "chambres/updateChambre",
    async ({IdCha, data}, {rejectWithValue}) => {
        try{
            const response = await updateChambre(IdCha, data);
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

export const removeChambre = createAsyncThunk(
    "chambres/deleteChambre",
    async (IdCha, {rejectWithValue}) => {
        try{
            const response = await deleteChambre(IdCha);
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