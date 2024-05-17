import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAbortSignalWithTimeout,handleError } from '../utils/axiosController'

const users_url = "http://localhost:3001/api/users"


export const verifyEmail = createAsyncThunk("user/verify",async (data)=>{

    const response = await axios.post(`${users_url}/verify/email`,data,{
        withCredentials:true
    })
    return response.data;
})

export const verifyToken = createAsyncThunk("user/verifytoken",async (data)=>{

    const response = await axios.post(`${users_url}/verify/token`,data,{
        withCredentials:true
    })
    return response.data;
})


export const loginUser = createAsyncThunk("user/login",async (data)=>{
    const response = await axios.post(`${users_url}/login`,data,{
        withCredentials:true
    });
    return response.data;
})

export const logoutUser = createAsyncThunk("user/logout",async ()=>{
    const response = await axios.get(`${users_url}/logout`,{
        withCredentials:true
    });
    return response.status === 200;
})

export const uploadPost = createAsyncThunk("user/uploadPost", async (data, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.post(`${users_url}/upload-post`, data, {
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'uploadPost')
    }
});

export const editPost = createAsyncThunk("user/editPost", async (data, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.patch(`${users_url}/edit-post`, data, {
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'editPost')
    }
});


export const deletePost = createAsyncThunk("user/deletePost", async (id, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.delete(`${users_url}/delete-post`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'deletePost')
    }
});


export const getUser = createAsyncThunk("user/getUser", async (id, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);
    try {
        const response = await axios.get(`${users_url}/getUserData`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'getUser')
    }
});


export const savePost = createAsyncThunk("user/savePost", async (id, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.patch(`${users_url}/savePost`, {
            id: id, 
        }, {
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'savePost')
    }
});


export const reportUser = createAsyncThunk("user/reportUser", async (id, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.patch(`${users_url}/reportUser`, {
            id: id, 
        }, {
            withCredentials: true,
            signal: abortSignal,
        });

        return response.data;
    } catch (error) {
        handleError(error,'reportUser')
    }
});




export const editProfile = createAsyncThunk("user/editProfile", async (data, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);

    try {
        const response = await axios.patch(`${users_url}/editProfile`, data, {
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
        handleError(error,'editProfile')
    }
});


export const setBanner = createAsyncThunk("user/setBanner", async (data, { signal }) => {
    const abortSignal = createAbortSignalWithTimeout(5000);
    try {
        const response = await axios.patch(`${users_url}/setBanner`, data, {
            withCredentials: true,
            signal: abortSignal, 
        });

        return response.data;
    } catch (error) {
       handleError(error,'setBanner')
    }
});


const userSlice = createSlice({
    name:"user",
    initialState:{ loading:false , error:"" },
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(verifyToken.pending,state=>{
            state.loading = true
        })
        .addCase(verifyToken.fulfilled,state =>{
            state.loading = false
        })
        .addCase(verifyToken.rejected,(state,action) =>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(verifyEmail.pending,state=>{
            state.loading = true
        })
        .addCase(verifyEmail.fulfilled,state =>{
            state.loading = false
        })
        .addCase(verifyEmail.rejected,(state,action) =>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginUser.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(loginUser.rejected,(state)=>{
            state.loading = false
            state.error = "Invalid email or password"
        }).addCase(logoutUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(uploadPost.pending,(state)=>{
            state.loading = true
        })
        .addCase(uploadPost.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(uploadPost.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(editPost.pending,(state)=>{
            state.loading = true
        })
        .addCase(editPost.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(editPost.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(deletePost.pending,(state)=>{
            state.loading = true
        })
        .addCase(deletePost.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(deletePost.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(getUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(getUser.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(savePost.pending,(state)=>{
            state.loading = true
        })
        .addCase(savePost.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(savePost.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(reportUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(reportUser.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(reportUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(editProfile.pending,(state)=>{
            state.loading = true
        })
        .addCase(editProfile.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(editProfile.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(setBanner.pending,(state)=>{
            state.loading = true
        })
        .addCase(setBanner.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(setBanner.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer