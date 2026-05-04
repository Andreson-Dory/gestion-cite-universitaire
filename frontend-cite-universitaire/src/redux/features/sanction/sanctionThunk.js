import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSanction, deleteSanction, getSanctions, updateSanction } from "../../../services/sanctionService";

export const fetchSanction = createAsyncThunk(
    "baitments/fetchSanctions",
    async () => {
        const response = await getSanctions();
        return response.data;
    }
);

export const addSanction = createAsyncThunk(
    "sanctions/createSanction",
    async (data) => {
        const response = await createSanction();
        return response.data;
    }
);

export const editSanction = createAsyncThunk(
    "sanctions/updateSanction",
    async (idBat, data) => {
        const response = await updateSanction(idBat, data);
        return response.data;
    }
)

export const removeSanction = createAsyncThunk(
    "sanctions/deleteSanction",
    async (idBat) => {
        const response = await deleteSanction(idBat);
        return response.data;
    }
)