import { createSlice } from "@reduxjs/toolkit";
import { addBatiment, editBatiment, fetchBatiment, removeBatiment } from "./batimentThunk";


const batimentSlice = createSlice({
    name: "batiments",
    initialState: {
        batiments: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Batiments
            .addCase(fetchBatiment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBatiment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchBatiment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Batiment
            .addCase(addBatiment.fulfilled, (state, action) => {
                state.batiments.push(action.payload)
            })
            //update a Batiment
            .addCase(editBatiment.fulfilled, (state, action) => {
                const index = state.batiments.findIndex((r) => r.idBat === action.payload.idBat)
                if(index !== -1){
                    state.batiments[index] = {...state.batiments[index], ...action.payload }
                }
            })
            //delete a Batiment
            .addCase(removeBatiment.fulfilled, (state, action) => {
                state.batiments = state.batiments.filter((r) => r.idBat !== action.payload.idBat)
            });
    }
})

export default batimentSlice.reducer;