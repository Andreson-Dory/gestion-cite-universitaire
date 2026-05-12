import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistique } from "./statistiqueThunk"

const statistiqueSlice = createSlice({
    name: "statistiques",
    initialState: {
        statistiques: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Statistiques
            .addCase(fetchStatistique.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStatistique.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.statistiques = action.payload;
            })
            .addCase(fetchStatistique.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

export default statistiqueSlice.reducer;