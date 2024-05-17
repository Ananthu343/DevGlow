import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";
import postReducer from "../slices/postSlice";
import messageReducer from "../slices/messageSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
        post:postReducer,
        message:messageReducer
    }
})

export default store;