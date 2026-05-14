import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAttribuer, deleteAttribuer, getAttribuers, toggleToFinishedAttribuer, updateAttribuer } from "../../../services/attribuerSerrvice";

export const fetchAttribuer = createAsyncThunk(
    "attribuers/fetchAttribuers",
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
    async ({IdAtt, data}) => {
        const response = await updateAttribuer(IdAtt, data);
        return response;
    }
)

export const toggleAttribuer = createAsyncThunk(
    "attribuers/toggleAttribuer",
    async (IdAtt) => {
        const response = await toggleToFinishedAttribuer(IdAtt);
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