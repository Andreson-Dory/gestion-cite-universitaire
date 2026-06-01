import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAttribuer,
  deleteAttribuer,
  getAttribuers,
  toggleToFinishedAttribuer,
  updateAttribuer,
} from "../../../services/attribuerSerrvice";

export const fetchAttribuer = createAsyncThunk(
  "attribuers/fetchAttribuers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAttribuers();
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

export const addAttribuer = createAsyncThunk(
  "attribuers/createAttribuer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAttribuer(data);
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

export const editAttribuer = createAsyncThunk(
  "attribuers/updateAttribuer",
  async ({ IdAtt, data }, { rejectWithValue }) => {
    try {
      const response = await updateAttribuer(IdAtt, data);
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

export const toggleAttribuer = createAsyncThunk(
  "attribuers/toggleAttribuer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await toggleToFinishedAttribuer(data);

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

export const removeAttribuer = createAsyncThunk(
  "attribuers/deleteAttribuer",
  async (IdAtt, { rejectWithValue }) => {
    try {
      const response = await deleteAttribuer(IdAtt);
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
