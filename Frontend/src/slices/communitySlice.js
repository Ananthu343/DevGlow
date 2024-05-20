import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const users_url = "http://localhost:3001/api/users";

const initialState = {
    communities: [],
};

export const createCommunity = createAsyncThunk("user/createCommunity", async (data, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);
    try {
        const response = await axios.post(`${users_url}/create-community`, data, {
            withCredentials: true,
            signal: abortSignal, 
        });
        return response.data;
    } catch (error) {
        handleError(error,'createCommunity')
    }
});

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers : {
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createCommunity.fulfilled,(state,action)=>{
            state.communities = [...state.communities,action.payload.newCommunity]
        })
    }
})

export default communitySlice.reducer;
