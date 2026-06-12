import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBatiment,
  deleteBatiment,
  getBatiments,
  updateBatiment,
} from "../../../services/batimentService";

export const fetchBatiment = createAsyncThunk(
  "batiments/fetchBatiments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBatiments();
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

export const addBatiment = createAsyncThunk(
  "batiments/createBatiment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBatiment(data);
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

export const editBatiment = createAsyncThunk(
  "batiments/updateBatiment",
  async ({ IdBat: IdBat, data }, { rejectWithValue }) => {
    try {
      const response = await updateBatiment(IdBat, data);
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

export const removeBatiment = createAsyncThunk(
  "batiments/deleteBatiment",
  async (IdBat, { rejectWithValue }) => {
    try {
      const response = await deleteBatiment(IdBat);
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
