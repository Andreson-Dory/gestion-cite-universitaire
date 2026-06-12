import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReclamation,
  deleteReclamation,
  getReclamations,
  updateReclamation,
} from "../../../services/reclamationService";

export const fetchReclamation = createAsyncThunk(
  "reclamations/fetchReclamations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getReclamations();
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

export const addReclamation = createAsyncThunk(
  "reclamations/createReclamation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createReclamation(data);
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

export const editReclamation = createAsyncThunk(
  "reclamations/updateReclamation",
  async ({ IdRec, data }, { rejectWithValue }) => {
    try {
      const response = await updateReclamation(IdRec, data);
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

export const removeReclamation = createAsyncThunk(
  "reclamations/deleteReclamation",
  async (IdRec, { rejectWithValue }) => {
    try {
      const response = await deleteReclamation(IdRec);
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
