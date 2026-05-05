import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSanction, deleteSanction, getSanctions, updateSanction } from "../../../services/sanctionService";

export const fetchSanction = createAsyncThunk(
    "baitments/fetchSanctions",
    async () => {
        const response = await getSanctions();
        return response;
    }
);

export const addSanction = createAsyncThunk(
    "sanctions/createSanction",
    async (data) => {
        const response = await createSanction(data);
        return response;
    }
);

export const editSanction = createAsyncThunk(
    "sanctions/updateSanction",
    async ({IdSac, data}) => {
        const response = await updateSanction(IdSac, data);
        return response;
    }
)

export const removeSanction = createAsyncThunk(
    "sanctions/deleteSanction",
    async (IdSac) => {
        const response = await deleteSanction(IdSac);
        return response;
    }
)