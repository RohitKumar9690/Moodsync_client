import { createSlice } from "@reduxjs/toolkit";
import { createJournal ,getJournals} from "../../hooks/journalhook";

const initialState = {
  journals:[],
  loading: false,
  error: null,
};

const journalSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journals.push(action.payload);
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getJournals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload;

        localStorage.setItem("journals", JSON.stringify(action.payload));
      })
      .addCase(getJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default journalSlice.reducer;
