import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const users_url = "http://localhost:5000/api/users"

const initialState = {
    feed: null,
    users:null
};

export const getFeed = createAsyncThunk("user/getFeed",async ()=>{
    const posts = await axios.get(`${users_url}/get-feed`);
    const users = await axios.get(`${users_url}/get-users`);
    const data = {
        posts:posts.data,
        users:users.data
    }
    return data;
})

export const likePost = createAsyncThunk("user/likePost", async (id) => {
    const response = await axios.patch(`${users_url}/likePost`, {
        id: id, 
    }, {
        withCredentials: true,
    });
    return response.data;
});


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeed.fulfilled, (state, action) => {
            state.feed = action.payload.posts;
            state.users = action.payload.users;
        });
    },
});

export default postSlice.reducer;