import { createSlice } from "@reduxjs/toolkit";
import { addChambre, editChambre, fetchChambre, removeChambre } from "./chambreThunk";

const chambreSlice = createSlice({
    name: "chambres",
    initialState: {
        chambres: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Chambres
            .addCase(fetchChambre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChambre.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchChambre.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Chambre
            .addCase(addChambre.fulfilled, (state, action) => {
                state.chambres.push(action.payload)
            })
            //update a Chambre
            .addCase(editChambre.fulfilled, (state, action) => {
                const index = state.chambres.findIndex((r) => r.idCha === action.payload.idCha)
                if(index !== -1){
                    state.chambres[index] = {...state.chambres[index], ...action.payload }
                }
            })
            //delete a Chambre
            .addCase(removeChambre.fulfilled, (state, action) => {
                state.chambres = state.chambres.filter((r) => r.idCha !== action.payload.idCha)
            });
    }
})

export default chambreSlice.reducer;