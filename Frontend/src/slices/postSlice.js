import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAbortSignalWithTimeout, handleError } from '../utils/axiosController';

const users_url = "http://localhost:3001/api/users";

const initialState = {
    feed: [],
    users: null,
    page: 1,
    hasMore: true,
    profilePosts: [],
    savedPosts: [],
    commentsById: [],
    userPosts:[],
};

export const getFeed = createAsyncThunk("user/getFeed", async (page) => {
    const signal = createAbortSignalWithTimeout(10000);
    console.log(page);
    try {
        const posts = await axios.get(`${users_url}/get-feed?page=${page}`, { signal });
        const data = {
            posts: posts.data.posts,
            hasMore: posts.data.hasMore,
        };
        return data;
    } catch (error) {
        handleError(error, 'getFeed');
    }
});


export const commentOnPost = createAsyncThunk("user/commentOnPost", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.post(`${users_url}/comment`, { data }, { withCredentials: true, signal: abortSignal });
        return response.data;
    } catch (error) {
        handleError(error, 'commentOnPost');
    }
});

export const deleteComment = createAsyncThunk("user/deleteComment", async (commentId) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        await axios.delete(`${users_url}/deleteComment`, {
            params: { id: commentId },
            withCredentials: true,
            signal: abortSignal,
        });
        return commentId;
    } catch (error) {
        handleError(error, 'deleteComment');
    }
});

export const getComments = createAsyncThunk("user/getComments", async () => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getPostcomment`, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data;
    } catch (error) {
        handleError(error, 'getComments');
    }
});




export const getMyProfilePosts = createAsyncThunk("user/getMyProfilePosts", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getMyProfilePosts`, {
            params:{id : id},
            withCredentials: true,
            signal: abortSignal,
        });
        return {
            profilePosts: response.data.profilePosts,
            savedPosts: response.data.savedPosts,
        };
    } catch (error) {
        handleError(error, 'getMyProfilePosts');
    }
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/get-users`, {
            signal: abortSignal,
        });
        return {
            users: response.data,
        };
    } catch (error) {
        handleError(error, 'getUsers');
    }
});



export const likePost = createAsyncThunk("user/likePost", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(50000);
    try {
        const response = await axios.patch(`${users_url}/likePost`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, likeStatus: response.data.likeStatus, updatedPost: response.data.updatedPost };

    } catch (error) {
        handleError(error, 'likePost')
    }
});

export const followUser = createAsyncThunk("user/followUser", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/followUser`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, followStatus: response.data.followStatus, updatedUser: response.data.updatedUser };
    } catch (error) {
        handleError(error, 'followUser')
    }
});

export const blockUser = createAsyncThunk("user/blockUser", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${users_url}/blockUser`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data.updatedData;
    } catch (error) {
        handleError(error, 'blockUser')
    }
});

export const getPost = createAsyncThunk("user/getPost", async (id) => {

    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${users_url}/getPostData`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal,
        });

        return response.data;
    } catch (error) {
        handleError(error, 'getPost')
    }
});


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updateFeed: (state, action) => {
            const postIndexFeed = state.feed.findIndex(post => post._id === action.payload._id);
            const postIndexMyPosts = state.profilePosts.findIndex(post => post._id === action.payload._id);
            if (postIndexFeed !== -1) {
                state.feed[postIndexFeed] = action.payload;
            }
            if (postIndexMyPosts !== -1) {
                state.profilePosts[postIndexMyPosts] = action.payload;
            }

        },
        updateFeedAfterDelete: (state, action) => {
            const newFeed = state.feed.filter(obj => obj._id !== action.payload.postId);
            const newMyPosts = state.profilePosts.filter(obj => obj._id !== action.payload.postId);
            state.feed = newFeed
            state.profilePosts = newMyPosts
        },
        updateFeedAfterUpload: (state, action) => {
            state.feed.unshift(action.payload.newPost)
            state.profilePosts.push(action.payload.newPost)
        },
        pushIntoDisplayedComments: (state, action) => {
            state.displayedComments.push(action.payload.commentId)
        },
        clearFeed: (state) => {
            state.feed = []
            state.page = 1
        },
        updateBlockStatus: (state, action) => {
            let userIndex = state.users.findIndex(ele => ele._id === action.payload.id)
            state.users[userIndex].status = action.payload.status
        },
        pushIntoUsers: (state, action) => {
            state.users.push(action.payload)
        },
        updateAdminStatus: (state, action) => {
            let userIndex = state.users.findIndex(ele => ele._id === action.payload.id)
            state.users[userIndex].roles = action.payload.roles
        },
        clearProfilePosts: (state,action) => {
            state.profilePosts = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.fulfilled, (state, action) => {
                state.feed = [...state.feed, ...action.payload.posts];
                state.page += 1; // Increment the page number
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getMyProfilePosts.fulfilled, (state, action) => {
                state.profilePosts = action.payload.profilePosts;
                if (action.payload.savedPosts) {
                    state.savedPosts = action.payload.savedPosts;
                }
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const postFeedIndex = state.feed.findIndex(post => post._id === action.payload.id);
                const postMyPostsIndex = state.profilePosts.findIndex(post => post._id === action.payload.id);
                const postSavedPostsIndex = state.savedPosts.findIndex(post => post._id === action.payload.id);
                if (postFeedIndex !== -1) {
                    state.feed[postFeedIndex].likedUsers = action.payload.updatedPost.likedUsers;
                }
                if (postMyPostsIndex !== -1) {
                    state.profilePosts[postMyPostsIndex].likedUsers = action.payload.updatedPost.likedUsers;
                }
                if (postSavedPostsIndex !== -1) {
                    state.savedPosts[postSavedPostsIndex].likedUsers = action.payload.updatedPost.likedUsers;
                }
            })
            .addCase(followUser.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(user => user._id === action.payload.id);
                if (userIndex !== -1) {
                    state.users[userIndex].followers = action.payload.updatedUser.followers;
                }
            })
            .addCase(commentOnPost.fulfilled, (state, action) => {
                const newCommentData = action.payload.newCommentData
                const parentData = action.payload.parentData
                state.commentsById[newCommentData._id] = newCommentData;
                if (parentData) {
                    state.commentsById[parentData._id] = {
                        ...state.commentsById[parentData._id],
                        ...parentData
                    };
                }
            })
            .addCase(getComments.fulfilled, (state, action) => {
                const newCommentsById = action.payload.commentData.reduce((acc, comment) => {
                    acc[comment._id] = comment;
                    return acc;
                }, {});
                state.commentsById = { ...state.commentsById, ...newCommentsById };
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const deletedCommentId = action.payload;
                delete state.commentsById[deletedCommentId];

                Object.values(state.commentsById).forEach(comment => {
                    if (comment.replies && comment.replies.includes(deletedCommentId)) {
                        comment.replies = comment.replies.filter(replyId => replyId !== deletedCommentId);
                    }
                });

            })
            .addCase(blockUser.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(user => user._id === action.payload.id);
                if (userIndex !== -1) {
                    state.users[userIndex].blocked = action.payload.blocked;
                }
            })
    }
});

export default postSlice.reducer;
export const {
    updateFeed,
    updateFeedAfterDelete,
    updateFeedAfterUpload,
    clearCommentsById,
    pushIntoDisplayedComments,
    clearFeed,
    updateBlockStatus,
    pushIntoUsers,
    updateAdminStatus,
    clearProfilePosts

} = postSlice.actions;
