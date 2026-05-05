import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEtudiant, deleteEtudiant, getEtudiants, updateEtudiant } from "../../../services/etudiantService";

export const fetchEtudiant = createAsyncThunk(
    "baitments/fetchEtudiants",
    async () => {
        const response = await getEtudiants();
        return response;
    }
);

export const addEtudiant = createAsyncThunk(
    "etudiants/createEtudiant",
    async (data) => {
        const response = await createEtudiant(data);
        return response;
    }
);

export const editEtudiant = createAsyncThunk(
    "etudiants/updateEtudiant",
    async ({IdEtu, data}) => {
        const response = await updateEtudiant(IdEtu, data);
        return response;
    }
)

export const removeEtudiant = createAsyncThunk(
    "etudiants/deleteEtudiant",
    async (IdEtu) => {
        const response = await deleteEtudiant(IdEtu);
        return response;
    }
)