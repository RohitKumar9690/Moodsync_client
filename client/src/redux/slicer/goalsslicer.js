import {createSlice} from "@reduxjs/toolkit";
import { createGoal, getGoals } from "../../hooks/goalhook";


const initialState = {
        goals:JSON.parse(localStorage.getItem("goals")) ||  [],
        loading: false,
        error: null,
    };
    
    const goalsSlice = createSlice({
        name: "goals",
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder.addCase(createGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getGoals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;

                localStorage.setItem("goals", JSON.stringify(action.payload));
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
    });
    
    export default goalsSlice.reducer