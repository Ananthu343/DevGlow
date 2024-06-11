import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const users_url = "http://localhost:3001/api/users";

const initialState = {
    rankings: [],
    badges:[],
};

export const getRankings = createAsyncThunk("user/getRankings", async () => {
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

export const getBadges = createAsyncThunk("user/getBadges", async () => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getBadges`, {
            signal: abortSignal, 
        });
        return response.data;
    } catch (error) {
        handleError(error,'getBadges')
    }
});


const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers : {
        setRanking:(state,action)=>{
            state.rankings = [...state.rankings,...action.payload];
        },
        addToBadges:(state,action)=>{
            state.badges.push(action.payload)
        },
        removeFromBadges:(state,action)=>{
            const newData = state.badges.filter(ele => ele._id !== action.payload)
            state.badges = newData
        },
        replaceBadge:(state,action)=>{
            const index = state.badges.findIndex(ele => ele._id === action.payload._id)
            state.badges[index] = action.payload
        }
    },
    extraReducers: builder =>{
        builder
        .addCase(getBadges.fulfilled,(state,action)=>{
            state.badges = action.payload
        })
    }
})

export default leaderboardSlice.reducer;
export const {setRanking , addToBadges , removeFromBadges , replaceBadge} = leaderboardSlice.actions
