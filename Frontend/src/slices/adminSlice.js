import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAbortSignalWithTimeout, handleError } from "../utils/axiosController";
import axios from "axios";

const admin_url = "http://localhost:3001/api/admin";

const initialState = {
    postData: {},
    messageData: {},
    communityData: {},
    userData: {},
    loadingAdminPage: false,
    contentData: [],
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
        handleError(error, 'getDashboardData(admin)')
    }
});

export const restrictUser = createAsyncThunk("admin/restrictUser", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(50000);
    try {
        const response = await axios.patch(`${admin_url}/restrictUser`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, status: response.data.status };

    } catch (error) {
        handleError(error, 'restrictUser')
    }
});

export const addNewUser = createAsyncThunk("admin/addNewUser", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.post(`${admin_url}/addNewUser`, data, {
            withCredentials: true,
            signal: abortSignal,
        });

        return response.data;
    } catch (error) {
        handleError(error, 'addNewUser')
    }
});

export const restrictCommunity = createAsyncThunk("admin/restrictCommunity", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(50000);
    try {
        const response = await axios.patch(`${admin_url}/restrictCommunity`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, status: response.data.status };

    } catch (error) {
        handleError(error, 'restrictUser')
    }
});

export const addNewAdmin = createAsyncThunk("admin/addNewAdmin", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(50000);
    try {
        const response = await axios.patch(`${admin_url}/addNewAdmin`, {
            id: id,
        }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return { id, roles: response.data };

    } catch (error) {
        handleError(error, 'addNewAdmin')
    }
});

export const addBadge = createAsyncThunk("admin/addBadge", async (data) => {
    console.log(data);
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.post(`${admin_url}/addBadge`, data, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data;
    } catch (error) {
        handleError(error, 'addBadge')
    }
});

export const editBadge = createAsyncThunk("admin/editBadge", async (data) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${admin_url}/editBadge`, data, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data
    } catch (error) {
        handleError(error, 'editBadge')
    }
});

export const deleteBadge = createAsyncThunk("admin/deleteBadge", async (id) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        await axios.delete(`${admin_url}/deleteBadge`, {
            params: { id },
            withCredentials: true,
            signal: abortSignal,
        });

        return id;
    } catch (error) {
        handleError(error, 'deleteBadge')
    }
});

export const getAllContent = createAsyncThunk("admin/getAllContent", async () => {

    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.get(`${admin_url}/getAllContent`, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data;
    } catch (error) {
        handleError(error, 'getAllContent(admin)')
    }
});


export const archiveContent = createAsyncThunk("admin/archiveContent", async (contentId) => {
    const abortSignal = createAbortSignalWithTimeout(10000);
    try {
        const response = await axios.patch(`${admin_url}/archiveContent`, { contentId }, {
            withCredentials: true,
            signal: abortSignal,
        });
        return response.data;
    } catch (error) {
        handleError(error, 'archiveContent(admin)');
    }
});


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.userData = action.payload.userData
            state.communityData = action.payload.communityData
            state.messageData = action.payload.messageData
            state.postData = action.payload.postData
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state, action) => {
                state.loadingAdminPage = true;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                console.log(action.payload);
                state.userData = action.payload.userData
                state.postData = action.payload.postData
                state.messageData = action.payload.messageData
                state.communityData = action.payload.communityData
                state.loadingAdminPage = false
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.loadingAdminPage = false
            })
            .addCase(getAllContent.pending, (state, action) => {
                state.loadingAdminPage = true;
            })
            .addCase(getAllContent.fulfilled, (state, action) => {
                state.contentData = action.payload
                state.loadingAdminPage = false
            })
            .addCase(getAllContent.rejected, (state, action) => {
                state.loadingAdminPage = false
            })
            .addCase(archiveContent.fulfilled, (state, action) => {
                const index = state.contentData.findIndex(ele => ele._id === action.payload._id)
                state.contentData[index] = action.payload
            })
    }
})

export default adminSlice.reducer;
export const { updateState } = adminSlice.actions