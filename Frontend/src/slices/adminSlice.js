import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const admin_url = "http://localhost:3001/api/admin";

const initialState = {
    postData: {},
    messageData:{},
    communityData:{},
    userData:{},
    loadingAdminPage:false
};

export const getDashboardData = createAsyncThunk("admin/getDashboardData", async (filter) => {

    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${admin_url}/getDashboardData`, {
            params: { filter },
            withCredentials: true,
            signal: abortSignal, 
        });
        return response.data;
    } catch (error) {
        handleError(error,'getDashboardData(admin)')
    }
});


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers : {
        updateState: (state,action) => {
            state.userData = action.payload.userData
            state.communityData = action.payload.communityData
            state.messageData = action.payload.messageData
            state.postData = action.payload.postData
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getDashboardData.pending,(state,action)=>{
            state.loadingAdminPage = true;
        })
        .addCase(getDashboardData.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.userData = action.payload.userData
            state.postData = action.payload.postData
            state.messageData = action.payload.messageData
            state.communityData = action.payload.communityData
            state.loadingAdminPage = false
        })
        .addCase(getDashboardData.rejected,(state,action)=>{
            state.loadingAdminPage = false
        })
    }
})

export default adminSlice.reducer;
export const {updateState} = adminSlice.actions