import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAbortSignalWithTimeout } from '../utils/axiosController';

const users_url = "http://localhost:5000/api/users";

const initialState = {
    feed: [], 
    users: null,
    page: 1, 
    hasMore: true,
    myPosts :[],
    savedPosts:[]
};

export const getFeed = createAsyncThunk("user/getFeed", async (page) => {
    try {
        const timeoutMs = 5000;
        const abortSignal = createAbortSignalWithTimeout(timeoutMs);
        const posts = await axios.get(`${users_url}/get-feed?page=${page}`,{
            signal: abortSignal,
          });
        const data = {
           posts: posts.data.posts,
           hasMore: posts.data.hasMore,
        };
         
        return data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled due to timeout', error.message);
            throw new Error('Request canceled due to timeout');
          } else {
            throw error;
          }
    }
});

export const getMyProfilePosts = createAsyncThunk("user/getMyProfilePosts", async (_, { signal }) => {
    const timeoutMs = 5000; 
    const abortSignal = createAbortSignalWithTimeout(timeoutMs);
    try {
        const posts = await axios.get(`${users_url}/getMyProfilePosts`, {
            withCredentials: true,
            signal: abortSignal, 
        });
        const data = {
            myPosts: posts.data.myPosts,
            savedPosts: posts.data.savedPosts,
        };
        return data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled due to timeout', error.message);
            throw new Error('Request canceled due to timeout');
        } else {
            throw error;
        }
    }
});

export const getUsers = createAsyncThunk("user/getUsers", async (_, { signal }) => {
    const timeoutMs = 5000; 
    const abortSignal = createAbortSignalWithTimeout(timeoutMs);
    try {
        const users = await axios.get(`${users_url}/get-users`, {
            signal: abortSignal, 
        });

        const data = {
            users: users.data,
        };
        console.log(data, "incoming users");
        return data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled due to timeout', error.message);
            throw new Error('Request canceled due to timeout');
        } else {
            throw error;
        }
    }
});


export const likePost = createAsyncThunk("user/likePost", async (id, { signal }) => {
    const timeoutMs = 5000; 
    const abortSignal = createAbortSignalWithTimeout(timeoutMs);

    try {
        const response = await axios.patch(`${users_url}/likePost`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, likeStatus: response.data.likeStatus, updatedPost: response.data.updatedPost };

    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled due to timeout', error.message);
            throw new Error('Request canceled due to timeout');
        } else {
            throw error;
        }
    }
});

export const followUser = createAsyncThunk("user/followUser", async (id, { signal }) => {
    const timeoutMs = 5000;
    const abortSignal = createAbortSignalWithTimeout(timeoutMs);
    try {
        const response = await axios.patch(`${users_url}/followUser`, {
            id: id, 
        }, {
            withCredentials: true,
            signal: abortSignal, 
        });
        return { id, followStatus: response.data.followStatus, updatedUser: response.data.updatedUser };
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled due to timeout', error.message);
            throw new Error('Request canceled due to timeout');
        } else {
            throw error;
        }
    }
});


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updateFeed: (state, action) => {
            const postIndexFeed = state.feed.findIndex(post => post._id === action.payload._id);
            const postIndexMyPosts = state.myPosts.findIndex(post => post._id === action.payload._id);
                if (postIndexFeed !== -1) {
                    state.feed[postIndexFeed] = action.payload;
                }
                if (postIndexMyPosts !== -1) {
                    state.myPosts[postIndexMyPosts] = action.payload;
                }

        },
        updateFeedAfterDelete: (state, action) => {
            const newFeed = state.feed.filter(obj => obj._id !== action.payload.postId);
            const newMyPosts = state.myPosts.filter(obj => obj._id !== action.payload.postId);
            state.feed = newFeed
            state.myPosts = newMyPosts
        },
        updateFeedAfterUpload: (state, action) => {
         state.feed.unshift(action.payload.newPost)
         state.myPosts.push(action.payload.newPost)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.fulfilled, (state, action) => {
                state.feed = [...state.feed, ...action.payload.posts];
                state.page += 1; // Increment the page number
                state.hasMore = action.payload.hasMore;  
            })
            .addCase(getMyProfilePosts.fulfilled, (state, action) => {
                state.myPosts = action.payload.myPosts;
                state.savedPosts = action.payload.savedPosts;  
                console.log(action.payload.savedPosts);
            })
            .addCase(getUsers.fulfilled, (state, action) => {
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
export const {updateFeed,updateFeedAfterDelete,updateFeedAfterUpload} = postSlice.actions;
