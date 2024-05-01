import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const users_url = "http://localhost:5000/api/users";

const initialState = {
    feed: [], // Assuming feed is an array of posts
    users: null,
};

export const getFeed = createAsyncThunk("user/getFeed", async () => {
    const posts = await axios.get(`${users_url}/get-feed`);
    const users = await axios.get(`${users_url}/get-users`);
    const data = {
        posts: posts.data,
        users: users.data,
    };
    return data;
});

export const likePost = createAsyncThunk("user/likePost", async (id) => {
    const response = await axios.patch(`${users_url}/likePost`, {
        id: id,
    }, {
        withCredentials: true,
    });
    return { id, likeStatus: response.data.likeStatus, updatedPost: response.data.updatedPost };
});

export const followUser = createAsyncThunk("user/followUser", async (id) => {
    const response = await axios.patch(`${users_url}/followUser`, {
        id: id, 
    }, {
        withCredentials: true,
    });
    return { id, followStatus: response.data.followStatus, updatedUser: response.data.updatedUser };
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updateFeed: (state, action) => {
            const postIndex = state.feed.findIndex(post => post._id === action.payload._id);
                if (postIndex !== -1) {
                    state.feed[postIndex] = action.payload;
                }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.fulfilled, (state, action) => {
                state.feed = action.payload.posts;
                state.users = action.payload.users;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const postIndex = state.feed.findIndex(post => post._id === action.payload.id);
                if (postIndex !== -1) {
                    state.feed[postIndex].likedUsers = action.payload.updatedPost.likedUsers;
                }
            })
            .addCase(followUser.fulfilled,(state,action)=>{
                const userIndex = state.users.findIndex(user => user._id === action.payload.id);
                if (userIndex !== -1) {
                    state.users[userIndex].followers = action.payload.updatedUser.followers;
                }
            })
        }
});

export default postSlice.reducer;
export const {updateFeed} = postSlice.actions;
