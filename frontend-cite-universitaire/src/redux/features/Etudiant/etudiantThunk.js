import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEtudiant, deleteEtudiant, getEtudiants, updateEtudiant } from "../../../services/etudiantService";

export const fetchEtudiant = createAsyncThunk(
    "baitments/fetchEtudiants",
    async () => {
        const response = await getEtudiants();
        return response.data;
    }
);

export const addEtudiant = createAsyncThunk(
    "etudiants/createEtudiant",
    async (data) => {
        const response = await createEtudiant();
        return response.data;
    }
);

export const editEtudiant = createAsyncThunk(
    "etudiants/updateEtudiant",
    async (idBat, data) => {
        const response = await updateEtudiant(idBat, data);
        return response.data;
    }
)

export const removeEtudiant = createAsyncThunk(
    "etudiants/deleteEtudiant",
    async (idBat) => {
        const response = await deleteEtudiant(idBat);
        return response.data;
    }
)