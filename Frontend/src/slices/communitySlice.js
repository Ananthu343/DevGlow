import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout,handleError } from "../utils/axiosController";
import axios from "axios";

const users_url = "http://localhost:3001/api/users";

const initialState = {
    communities: [],
    communityMessages:[],
};

export const createCommunity = createAsyncThunk("user/createCommunity", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
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

export const getCommunities = createAsyncThunk("user/getCommunities", async () => {
    const signal = createAbortSignalWithTimeout(10000);
    try {
      const communities = await axios.get(`${users_url}/get-communities`, { signal });
      return communities.data;
    } catch (error) {
      handleError(error, 'getCommunities');
    }
  });

  export const joinCommunity = createAsyncThunk("user/joinCommunity", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/joinCommunity`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data.updatedData;
    } catch (error) {
       handleError(error,'joinCommunity')
    }
});

  export const leaveCommunity = createAsyncThunk("user/leaveCommunity", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/leaveCommunity`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data.updatedData;
    } catch (error) {
       handleError(error,'leaveCommunity')
    }
});

  export const editCommunity = createAsyncThunk("user/editCommunity", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/editCommunity`, data, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data.updatedData
    } catch (error) {
       handleError(error,'editCommunity')
    }
});

export const deleteCommunity = createAsyncThunk("user/deleteCommunity", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        await axios.delete(`${users_url}/delete-community`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal, 
        });

        return id;
    } catch (error) {
        handleError(error,'deleteCommunity')
    }
});

export const getCommunityHistory = createAsyncThunk("user/getCommunityHistory", async (id) => {

    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getCommunityHistory`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal, 
        });
        return response.data;
    } catch (error) {
        handleError(error,'getCommunityHistory')
    }
});

export const addUser = createAsyncThunk("user/addUser", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/community/addUser`, data, {
            withCredentials: true,
            signal: abortSignal,
        });

        return response.data.updatedData
    } catch (error) {
       handleError(error,'addUser')
    }
});

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers : {
        clearCommunityMessages: (state) => {
            state.communityMessages = []
        },
        updateCommunityMessages: (state,action) => {
            state.communityMessages.push(action.payload)
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createCommunity.fulfilled,(state,action)=>{
            state.communities = [...state.communities,action.payload.newCommunity]
        })
        .addCase(getCommunities.fulfilled,(state,action)=>{
            state.communities = action.payload.communityData
        })
        .addCase(joinCommunity.fulfilled,(state,action)=>{
            const updatedCommunity = action.payload; 
            const communityIndex = state.communities.findIndex(ele => ele._id === updatedCommunity._id); 
            if (communityIndex >= 0) { 
                state.communities[communityIndex] = updatedCommunity;
            }
        })
        .addCase(leaveCommunity.fulfilled,(state,action)=>{
            const updatedCommunity = action.payload; 
            const communityIndex = state.communities.findIndex(ele => ele._id === updatedCommunity._id); 
            if (communityIndex >= 0) { 
                state.communities[communityIndex] = updatedCommunity;
            }
        })
        .addCase(editCommunity.fulfilled,(state,action)=>{
            const updatedCommunity = action.payload; 
            const communityIndex = state.communities.findIndex(ele => ele._id === updatedCommunity._id); 
            if (communityIndex >= 0) { 
                state.communities[communityIndex] = updatedCommunity;
            }
        })
        .addCase(getCommunityHistory.fulfilled,(state,action)=>{
            state.communityMessages = [...action.payload.communityHistory]
        })
        .addCase(deleteCommunity.fulfilled,(state,action)=>{
            const newCommunities = state.communities.filter(obj => obj._id !== action.payload);
            state.communities = newCommunities
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            const updatedCommunity = action.payload; 
            const communityIndex = state.communities.findIndex(ele => ele._id === updatedCommunity._id);             
            if (communityIndex >= 0) { 
                state.communities[communityIndex] = updatedCommunity;
            }
        })
    }
})

export default communitySlice.reducer;
export const {clearCommunityMessages,updateCommunityMessages} = communitySlice.actions
