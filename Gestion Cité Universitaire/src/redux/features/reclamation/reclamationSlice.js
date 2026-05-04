import { createSlice } from "@reduxjs/toolkit";
import { addReclamation, editReclamation, fetchReclamation, removeReclamation } from "./reclamationThunk";


const reclamationSlice = createSlice({
    name: "reclamations",
    initialState: {
        reclamations: [],
        status: "idle",
        error: null
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
                state.data = action.payload;
            })
            .addCase(fetchReclamation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Reclamation
            .addCase(addReclamation.fulfilled, (state, action) => {
                state.reclamations.push(action.payload)
            })
            //update a Reclamation
            .addCase(editReclamation.fulfilled, (state, action) => {
                const index = state.reclamations.findIndex((r) => r.idRec === action.payload.idRec)
                if(index !== -1){
                    state.reclamations[index] = {...state.reclamations[index], ...action.payload }
                }
            })
            //delete a Reclamation
            .addCase(removeReclamation.fulfilled, (state, action) => {
                state.reclamations = state.reclamations.filter((r) => r.idRec !== action.payload.idRec)
            });
    }
})

export default reclamationSlice.reducer;