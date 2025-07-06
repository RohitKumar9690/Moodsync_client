import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const habitCreateType = createAsyncThunk(
    "habit/createHabit",
    async (habitData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/habits/", habitData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating habit");
        }
    }
);

export const gethabitCreateType = createAsyncThunk(
    "habit/getHabit",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/habits/user/${userId}`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching habits");
        }
    }
);


export const habitById = createAsyncThunk(
    "habit/habitById",
    async (habitId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/habits/${habitId}`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching habit");
        }
    }
);

export const updateHabit = createAsyncThunk(
    "habit/updateHabit",
    async (habitData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/habits/update/${habitData.id}`, habitData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating habit");
        }
    }
);

export const deleteHabit = createAsyncThunk(
    "habit/deleteHabit",
    async (habitId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/habits/${habitId}`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting habit");
        }
    }
);

export const createEntry = createAsyncThunk(
    "entry/createEntry",
    async (entryData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/habits/entry", entryData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating entry");
        }
    }
)
export const habitSkip = createAsyncThunk(
    "habit/skipHabit",
    async (habitId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/habits/entry/${habitId}/skip`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error skipping habit");
        }
    }
);

export const habitComplete = createAsyncThunk(
    "habit/completeHabit",
    async (habitId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/habits/entry/${habitId}/complete`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error completing habit");
        }
    }
);
