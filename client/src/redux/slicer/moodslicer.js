import {createSlice} from "@reduxjs/toolkit";
import { createMood, getMoods } from "../../hooks/moodhook";
const initialState = {
        moods: [],
        createMoods: [],
        loading: false,
        error: null,
    };
    
    const moodSlice = createSlice({
        name: "mood",
        initialState,
        reducers: {},
        extraReducers: (builder) =>
        builder
        .addCase(createMood.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createMood.fulfilled, (state, action) => {
            state.loading = false;
            state.moods = action.payload;
        })
        .addCase(createMood.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        .addCase(getMoods.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMoods.fulfilled, (state, action) => {
            state.loading = false;
            state.moods = action.payload;
        })
        .addCase(getMoods.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }),
    });
    
    export default moodSlice.reducer;