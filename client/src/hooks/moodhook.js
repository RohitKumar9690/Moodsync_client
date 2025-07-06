import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const createMood = createAsyncThunk(
    "mood/createMood",
    async (moodData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/moods/", moodData);
            // console.log(response.data);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating mood");
        }
    }
);

export const updateMood = createAsyncThunk(
    "mood/updateMood",
    async (moodData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/moods/${moodData.id}`, moodData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating mood");
        }
    }
);

export const deleteMood = createAsyncThunk(
    "mood/deleteMood",
    async (moodId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/moods/${moodId}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting mood");
        }
    }
);


export const getMoods = createAsyncThunk(
    "mood/getMoods",
    async (moodId, { rejectWithValue }) => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.get(`/moods/user/${moodId}`,{
                headers:{Authorization: `Bearer ${token}`}});
        //    console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching moods");
        }       
    })