import { createSlice } from "@reduxjs/toolkit";
import {
  addEtudiant,
  editEtudiant,
  fetchEtudiant,
  removeEtudiant,
} from "./etudiantThunk";

const etudiantSlice = createSlice({
  name: "etudiants",
  initialState: {
    etudiants: [],
    pagination: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fecth Etudiants
      .addCase(fetchEtudiant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEtudiant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.etudiants = action.payload.etudiants;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEtudiant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create Etudiant
      .addCase(addEtudiant.fulfilled, (state, action) => {
        state.etudiants.push(action.payload.Etudiant);
      })
      //update a Etudiant
      .addCase(editEtudiant.fulfilled, (state, action) => {
        const index = state.etudiants.findIndex(
          (r) => r.IdEtu === action.payload.Etudiant.IdEtu,
        );
        if (index !== -1) {
          state.etudiants[index] = {
            ...state.etudiants[index],
            ...action.payload.Etudiant,
          };
        }
      })
      //delete a Etudiant
      .addCase(removeEtudiant.fulfilled, (state, action) => {
        state.etudiants = state.etudiants.filter(
          (r) => r.IdEtu !== Number(action.payload.IdEtu),
        );
      });
  },
});

export default etudiantSlice.reducer;
