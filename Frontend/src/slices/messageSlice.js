import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const users_url = "http://localhost:3001/api/users";

const initialState = {
    messages: [],
};

export const getMessageHistory = createAsyncThunk("user/getMessageHistory", async (id, { signal }) => {

    const abortSignal = createAbortSignalWithTimeout(5000);
    try {
        const response = await axios.get(`${users_url}/getMessageHistory`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal, 
        });
        return response.data;
    } catch (error) {
        handleError(error,'getPost')
    }
});

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers : {
        clearMessages: (state, action) => {
            state.messages = []
        },
        updateMessages: (state,action) => {
            state.messages.push(action.payload)
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getMessageHistory.fulfilled,(state,action)=>{
            state.messages = [...action.payload.messageHistory]
        })
    }
})

export default messageSlice.reducer;
export const {clearMessages,updateMessages} = messageSlice.actions