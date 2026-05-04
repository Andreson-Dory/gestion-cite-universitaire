import { createSlice } from "@reduxjs/toolkit";
import { addEtudiant, editEtudiant, fetchEtudiant, removeEtudiant } from "./etudiantThunk";

const etudiantSlice = createSlice({
    name: "etudiants",
    initialState: {
        etudiants: [],
        status: "idle",
        error: null
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
                state.data = action.payload;
            })
            .addCase(fetchEtudiant.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Etudiant
            .addCase(addEtudiant.fulfilled, (state, action) => {
                state.etudiants.push(action.payload)
            })
            //update a Etudiant
            .addCase(editEtudiant.fulfilled, (state, action) => {
                const index = state.etudiants.findIndex((r) => r.idEtu === action.payload.idEtu)
                if(index !== -1){
                    state.etudiants[index] = {...state.etudiants[index], ...action.payload }
                }
            })
            //delete a Etudiant
            .addCase(removeEtudiant.fulfilled, (state, action) => {
                state.etudiants = state.etudiants.filter((r) => r.idEtu !== action.payload.idEtu)
            });
    }
})

export default etudiantSlice.reducer;