import  { createSlice } from  "@reduxjs/toolkit";
import  { fetchAttribuer, addAttribuer, editAttribuer, removeAttribuer } from "./attibuerThunk";

const attribuerSlice = createSlice({
    name: "attribuers",
    initialState: {
        attribuers: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fecth Attribuers
            .addCase(fetchAttribuer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAttribuer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.attribuers = action.payload;
            })
            .addCase(fetchAttribuer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //create Attribuer
            .addCase(addAttribuer.fulfilled, (state, action) => {
                state.attribuers.push(action.payload.Attribuer)
            })
            //update a Attribuer
            .addCase(editAttribuer.fulfilled, (state, action) => {
                const index = state.attribuers.findIndex((r) => r.IdAtt === action.payload.Attribuer.IdAtt)
                if(index !== -1){
                    state.attribuers[index] = {...state.attribuers[index], ...action.payload.Attribuer }
                }
            })
            //delete a Attribuer
            .addCase(removeAttribuer.fulfilled, (state, action) => {
                state.attribuers = state.attribuers.filter((r) => r.IdAtt !== Number(action.payload.IdAtt))
            });
    }
})

export default attribuerSlice.reducer;