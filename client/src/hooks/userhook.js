import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios"; // 👈 import the axios instance

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/", userData);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating user");
    }
  }
);


export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/users/${userData.id}`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating user");
    }
  }
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/users/${userId}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting user");
    }
  }
)
// hooks/userhook.js
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", userData);
      // console.log(response.data);
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.details || "Login failed";
      return rejectWithValue(message);
    }
  }
);

  export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.post("/users/logout");
        // console.log(response.data);
      
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Logout failed");
      }
    })

    