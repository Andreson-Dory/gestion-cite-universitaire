import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAttribuer, deleteAttribuer, getAttribuers, updateAttribuer } from "../../../services/attribuerSerrvice";

export const fetchAttribuer = createAsyncThunk(
    "baitments/fetchAttribuers",
    async () => {
        const response = await getAttribuers();
        return response;
    }
);

export const addAttribuer = createAsyncThunk(
    "attribuers/createAttribuer",
    async (data) => {
        const response = await createAttribuer(data);
        return response;
    }
);

export const editAttribuer = createAsyncThunk(
    "attribuers/updateAttribuer",
    async ({idAtt: IdAtt, data}) => {
        const response = await updateAttribuer(IdAtt, data);
        return response;
    }
)

export const removeAttribuer = createAsyncThunk(
    "attribuers/deleteAttribuer",
    async (IdAtt) => {
        const response = await deleteAttribuer(IdAtt);
        return response;
    }
)