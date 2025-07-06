import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
export const createJournal = createAsyncThunk(
    "journal/createJournal",
    async (journalData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/journals/", journalData);
            // console.log(response.data);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating journal");
        }
    }
);

export const updateJournal = createAsyncThunk(
  "journal/updateJournal",
  async (journalData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/journals/${journalData.id}`, journalData);
    //  console.log(response.data);
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating journal");
    }
  }
);
    

export const deleteJournal = createAsyncThunk(
    "journal/deleteJournal",
    async (journalId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/journals/${journalId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting journal");
        }
    }
);

export const getJournals = createAsyncThunk(
    "journal/getJournals",
    async (journalId, { rejectWithValue }) =>
        {
            try {
                const response = await axios.get(`/journals/user/`,);
                //  console.log(response.data);
                 
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || "Error fetching journals");
            }
        }
);