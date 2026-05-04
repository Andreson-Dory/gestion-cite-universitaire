import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAttribuer, deleteAttribuer, getAttribuers, updateAttribuer } from "../../../services/attribuerSerrvice";

export const fetchAttribuer = createAsyncThunk(
    "baitments/fetchAttribuers",
    async () => {
        const response = await getAttribuers();
        return response.data;
    }
);

export const addAttribuer = createAsyncThunk(
    "attribuers/createAttribuer",
    async (data) => {
        const response = await createAttribuer();
        return response.data;
    }
);

export const editAttribuer = createAsyncThunk(
    "attribuers/updateAttribuer",
    async (idAtt, data) => {
        const response = await updateAttribuer(idAtt, data);
        return response.data;
    }
)

export const removeAttribuer = createAsyncThunk(
    "attribuers/deleteAttribuer",
    async (idAtt) => {
        const response = await deleteAttribuer(idAtt);
        return response.data;
    }
)