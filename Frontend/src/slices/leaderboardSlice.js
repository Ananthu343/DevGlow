import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const users_url = "http://localhost:3001/api/users";

const initialState = {
    rankings: [],
};

export const getRankings = createAsyncThunk("user/getRankings", async (_, { signal }) => {

    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getRankings`, {
            signal: abortSignal, 
        });
        return response.data.leaderboardData;
    } catch (error) {
        handleError(error,'getRankings')
    }
});

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers : {
        setRanking:(state,action)=>{
            state.rankings = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getRankings.fulfilled,(state,action)=>{
            
        })
    }
})

export default leaderboardSlice.reducer;
export const {setRanking} = leaderboardSlice.actions
