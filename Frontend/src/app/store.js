import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";
import postReducer from "../slices/postSlice";
import messageReducer from "../slices/messageSlice";
import communityReducer from "../slices/communitySlice";
import leaderboardReducer from "../slices/leaderboardSlice";
import adminReducer from "../slices/adminSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
        post:postReducer,
        message:messageReducer,
        community:communityReducer,
        leaderboard:leaderboardReducer,
        admin:adminReducer,
    }
})

export default store;