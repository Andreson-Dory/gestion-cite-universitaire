import { createSlice } from "@reduxjs/toolkit";
import {fetchPaiement, addPaiement, removePaiement} from "./paiementThunk";
const paiementSlice = createSlice({
    name: "paiements",
    initialState: {
        paiements: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Paiements
            .addCase(fetchPaiement.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPaiement.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.paiements = action.payload;
            })
            .addCase(fetchPaiement.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Paiement
            .addCase(addPaiement.fulfilled, (state, action) => {
                state.paiements.push(action.payload.Paiement)
            })
            //delete a Paiement
            .addCase(removePaiement.fulfilled, (state, action) => {
                state.paiements = state.paiements.filter((r) => r.IdPai !== Number(action.payload.IdPai))
            });
    }
})

export default paiementSlice.reducer;