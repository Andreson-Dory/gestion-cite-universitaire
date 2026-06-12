import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSanction,
  deleteSanction,
  getSanctions,
  updateSanction,
} from "../../../services/sanctionService";

export const fetchSanction = createAsyncThunk(
  "sanctions/fetchSanctions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSanctions();
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

export const addSanction = createAsyncThunk(
  "sanctions/createSanction",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSanction(data);
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

export const editSanction = createAsyncThunk(
  "sanctions/updateSanction",
  async ({ IdSac, data }, { rejectWithValue }) => {
    try {
      const response = await updateSanction(IdSac, data);
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

export const removeSanction = createAsyncThunk(
  "sanctions/deleteSanction",
  async (IdSac, { rejectWithValue }) => {
    try {
      const response = await deleteSanction(IdSac);
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
