import { configureStore } from "@reduxjs/toolkit";
import  authReducer   from "../slices/auth-slice";
import { songReducer } from "../slices/song-slice";
import { adminReducer } from "../slices/admin-slice";
import { albumReducer } from "../slices/album-slice";
import { playerReducer } from "../slices/player-slice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        songs:songReducer,
        admin:adminReducer,
        albums:albumReducer,
        player:playerReducer


    }, devTools: true
});

export default store