import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const createGoal = createAsyncThunk(
    "goals/createGoals",
    async (goalData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/goals/", goalData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating goal");
        }
    }
)

export const updateGoal = createAsyncThunk(
    
    "goals/updateGoals",
    async (goalData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/goals/${goalData.id}`, goalData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating goal");
        }
    }
)

export const deleteGoal = createAsyncThunk(
    "goals/deleteGoals",
    async (goalId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/goals/${goalId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting goal");
        }
    }
)


export const getGoals = createAsyncThunk(
    "goals/getGoals",
    async (goalId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/goals/user`);
            // console.log(response.data);
            return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || "Error fetching goals");
                }
                
    })