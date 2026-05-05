import { createSlice } from "@reduxjs/toolkit";
import { fetchSanction, addSanction, editSanction, removeSanction } from "./sanctionThunk"

const sanctionSlice = createSlice({
    name: "sanctions",
    initialState: {
        sanctions: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Sanctions
            .addCase(fetchSanction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSanction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.sanctions = action.payload;
            })
            .addCase(fetchSanction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Sanction
            .addCase(addSanction.fulfilled, (state, action) => {
                state.sanctions.push(action.payload.Sanction)
            })
            //update a Sanction
            .addCase(editSanction.fulfilled, (state, action) => {
                const index = state.sanctions.findIndex((r) => r.IdSac === action.payload.Sanction.IdSac)
                if(index !== -1){
                    state.sanctions[index] = {...state.sanctions[index], ...action.payload.Sanction }
                }
            })
            //delete a Sanction
            .addCase(removeSanction.fulfilled, (state, action) => {
                state.sanctions = state.sanctions.filter((r) => r.IdSac !== Number(action.payload.IdSac))
            });
    }
})

export default sanctionSlice.reducer;