import { createSlice } from "@reduxjs/toolkit";
import {
  addReclamation,
  editReclamation,
  fetchReclamation,
  removeReclamation,
} from "./reclamationThunk";

const reclamationSlice = createSlice({
  name: "reclamations",
  initialState: {
    reclamations: [],
    pagination: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fecth Reclamations
      .addCase(fetchReclamation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReclamation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reclamations = action.payload.reclamations;
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchReclamation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create Reclamation
      .addCase(addReclamation.fulfilled, (state, action) => {
        state.reclamations.push(action.payload.Reclamation);
      })
      //update a Reclamation
      .addCase(editReclamation.fulfilled, (state, action) => {
        const index = state.reclamations.findIndex(
          (r) => r.IdRec === action.payload.Reclamation.IdRec,
        );
        if (index !== -1) {
          state.reclamations[index] = {
            ...state.reclamations[index],
            ...action.payload.Reclamation,
          };
        }
      })
      //delete a Reclamation
      .addCase(removeReclamation.fulfilled, (state, action) => {
        state.reclamations = state.reclamations.filter(
          (r) => r.IdRec !== Number(action.payload.IdRec),
        );
      });
  },
});

export default reclamationSlice.reducer;
