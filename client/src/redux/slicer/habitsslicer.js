import { createSlice } from "@reduxjs/toolkit";
import {
  habitCreateType,
  gethabitCreateType,
  habitById,
} from "../../hooks/habitshook";

const initialState = {
  habits: [],
  selectedHabit: null,
  entries: [],
  loading: false,
  error: null,
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    clearSelectedHabit(state) {
      state.selectedHabit = null;
      state.entries = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Create Habit
      .addCase(habitCreateType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(habitCreateType.fulfilled, (state, action) => {
        state.loading = false;
        state.habits.push(action.payload);
      })
      .addCase(habitCreateType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📥 Get All Habits
      .addCase(gethabitCreateType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gethabitCreateType.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(gethabitCreateType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎯 Get Habit by ID
      .addCase(habitById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(habitById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHabit = action.payload;
        state.entries = action.payload.entries || [];
      })
      .addCase(habitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedHabit } = habitsSlice.actions;

export default habitsSlice.reducer;
