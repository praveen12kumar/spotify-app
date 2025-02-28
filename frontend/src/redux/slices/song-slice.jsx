import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  axiosInstance  from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    songs: [],
    featuredSongs:[],
    madeForYouSongs:[],
    trendingSongs:[]
};

export const addSong = createAsyncThunk("song/addSong", async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("artist", data.artist);
        formData.append("albumId", data.album);
        formData.append("duration", data.duration.toString());
        formData.append("thumbnail", data.thumbnail);
        formData.append("song", data.song);

        const response =  axiosInstance.post('/admin/songs/add', formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })

        toast.promise(response, {
            loading: "Wait! Adding song...",
            success: "Song added successfully",
            error: "Something went wrong",
        })

        return (await response).data.data


    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const getAllSongs = createAsyncThunk('song/getAllSong', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get('/songs/all');

        toast.promise(response, {
            loading: "Wait! Fetching songs...",
            success: "Songs fetched successfully",
            error: "Something went wrong",
        })

        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
});


export const deleteSong = createAsyncThunk('song/deleteSong', async(id, {rejectWithValue})=>{
    try {
        const response = axiosInstance.delete(`/admin/songs/${id}`);

        toast.promise(response, {
            loading: "Wait! Deleting song...",
            success: "Song deleted successfully",
            error: "Something went wrong",
        })
        return (await response).data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
})


export const getTrendingSongs = createAsyncThunk('song/getTrendingSong', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get('/songs/trending');

        toast.promise(response, {
            loading: "Wait! Fetching songs...",
            success: "Songs fetched successfully",
            error: "Something went wrong",
        })

        console.log("trending songs", await response);
        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
});


export const getFeaturedSongs = createAsyncThunk('song/getFeaturedSong', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get('/songs/featured');

        toast.promise(response, {
            loading: "Wait! Fetching songs...",
            success: "Songs fetched successfully",
            error: "Something went wrong",
        })

        console.log("featured Songs", await response);
        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
});


export const getMadeForYou = createAsyncThunk('song/getMadeForYou', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get('/songs/made-for-you');

        toast.promise(response, {
            loading: "Wait! Fetching songs...",
            success: "Songs fetched successfully",
            error: "Something went wrong",
        })

        console.log("made for you songs", await response);
        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
})




export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addSong.fulfilled, (state, action)=>{
            state.songs = [...state.songs, action.payload];
        })

        .addCase(getAllSongs.fulfilled, (state, action)=>{
            //console.log("action.payload", action.payload);
            state.songs = action.payload;
        })

        .addCase(deleteSong.fulfilled, (state, action)=>{
            state.songs = state.songs?.filter((song) => song?._id !== action.payload._id);
        })

        .addCase(getTrendingSongs.fulfilled, (state, action)=>{
            //console.log("action.payload", action.payload);
            state.trendingSongs = action.payload;
        })

        .addCase(getFeaturedSongs.fulfilled, (state, action)=>{
            //console.log("featured action.payload", action.payload);
            state.featuredSongs = action.payload;
        })


        .addCase(getMadeForYou.fulfilled, (state, action)=>{
            //console.log("action.payload", action.payload);
            state.madeForYouSongs = action.payload;
        })
    }
})


export const songReducer = songSlice.reducer;