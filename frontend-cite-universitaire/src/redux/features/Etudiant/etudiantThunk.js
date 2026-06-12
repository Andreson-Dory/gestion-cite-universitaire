import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEtudiant,
  deleteEtudiant,
  getEtudiants,
  updateEtudiant,
} from "../../../services/etudiantService";

export const fetchEtudiant = createAsyncThunk(
  "etudiants/fetchEtudiants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEtudiants();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Erreur serveur",
        },
      );
    }
  },
);

export const addEtudiant = createAsyncThunk(
  "etudiants/createEtudiant",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createEtudiant(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Erreur serveur",
        },
      );
    }
  },
);

export const editEtudiant = createAsyncThunk(
  "etudiants/updateEtudiant",
  async ({ IdEtu, data }, { rejectWithValue }) => {
    try {
      const response = await updateEtudiant(IdEtu, data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Erreur serveur",
        },
      );
    }
  },
);

export const removeEtudiant = createAsyncThunk(
  "etudiants/deleteEtudiant",
  async (IdEtu, { rejectWithValue }) => {
    try {
      const response = await deleteEtudiant(IdEtu);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Erreur serveur",
        },
      );
    }
  },
);
