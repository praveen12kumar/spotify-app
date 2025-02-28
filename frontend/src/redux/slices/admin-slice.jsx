import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  axiosInstance  from "../../helpers/axiosInstance";
import toast from "react-hot-toast";



const initalState = {
    totalSongs: 0,
    totalUsers: 0,
    totalAlbums: 0,
    totalArtists: 0
}


export const getStats = createAsyncThunk("admin/getStats", async (_, { rejectWithValue }) => {
  try {
    const response = axiosInstance.get("/admin/stats");
    await toast.promise(response, {
      loading: "Wait! Fetching stats...",
      success: "Stats fetched successfully",
      error: "Something went wrong",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    return rejectWithValue(error?.response?.data || { message: "Error" });
  }
})


const adminSlice = createSlice({
  name: "admin",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.totalSongs = action.payload.totalSongs;
      state.totalUsers = action.payload.totalUsers;
      state.totalAlbums = action.payload.totalAlbums;
      state.totalArtists = action.payload.totalArtists;
    });
  },
});

export const adminReducer = adminSlice.reducer;