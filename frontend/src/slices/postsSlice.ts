import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PostType } from "@/pages/Room";

const backend = import.meta.env.VITE_BACKEND_URL;

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const response = await axios.get(`${backend}/api/posts`);
    return response.data;
});

interface PostsState {
    data: PostType[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    data: [],
    loading: false,
    error: null
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch posts";
            });
    }
})

export default postsSlice.reducer;