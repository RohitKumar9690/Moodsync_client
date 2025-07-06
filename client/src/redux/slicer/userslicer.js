import { createSlice } from "@reduxjs/toolkit";
import { createUser,loginUser, logoutUser } from "../../hooks/userhook";

const initialState = {
  users: [],
  authUser:  JSON.parse(localStorage.getItem("authUser")) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("access_token", JSON.stringify(action.payload.access_token));
        localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = null;
        localStorage.removeItem("authUser");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});


export const { setUsers, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
