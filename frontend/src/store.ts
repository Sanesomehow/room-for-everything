// import { configureStore } from "@reduxjs/toolkit";
// import postsReducer, { fetchPosts } from "./slices/postsSlice";

// export const store = configureStore({
//     reducer: {
//         posts: postsReducer,
//     }
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { create } from "zustand";
import axios from "axios";
import Fuse from "fuse.js";
import type { ItemType } from "./types";

interface StandardPreviewData {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
}

interface TwitterPreviewData {
    url: string;
    author_name: string;
    author_url: string;
    html: string;
    provider_name: string;
}

export interface Post {
    id: number;
    title: string;
    text: string;
    url?: string;
    previewData?: string | StandardPreviewData | TwitterPreviewData;
    type: ItemType;
    isPublic: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ScreenStore {
    screen: "mobile" | "tablet" | "desktop";
    setScreen: (screen: "mobile" | "tablet" | "desktop") => void;
}

interface PostStore {
    posts: Post[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    searchResults: (Post & { score?: number, matches?: any[] })[];
    filters: ItemType[];
    fuse: Fuse<Post> | null;
    setPosts: (posts: Post[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (searchQuery: string) => void;
    setSearchResults: (searchResults: (Post & { score?: number; matches?: any[] })[]) => void;
    setFilters: (filters: ItemType[]) => void;
    fetchPosts: () => Promise<void>;
    searchPosts: (query: string) => Promise<(Post & { score?: number; matches?: any[] })[]>;
    getSearchResults: () => Post[];
    getPostsById: (id: string | number) => Post | undefined;
    getFilteredPosts: () => Post[];
    clearFilters: () => void;
    clearSearchResults: () => void;
}

const backend = import.meta.env.VITE_BACKEND_URL;
const fuseOptions = {
    keys: ['title', 'text', 'url', 'type',
        'previewData.title',
        'previewData.description',
        'previewData.url',
        'previewData.image',
        'previewData.author_name',
        'previewData.author_url',
        'previewData.html',
        'previewData.provider_name'],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    useExtendedSearch: true,
    ignoreLocation: true,
    findAllMatches: true
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
    screen: 'desktop',
    setScreen: (screen: "mobile" | "tablet" | "desktop") => set({screen})
}))



const usePostStore = create<PostStore>((set, get) => ({
    posts: [],
    loading: false,
    error: null,
    searchQuery: '',
    searchResults: [],
    filters: [],
    fuse: null,

    setPosts: (posts: Post[]) => {
        const parsedPosts = posts.map(post => ({
            ...post,
            previewData: typeof post.previewData === 'string'
            ? JSON.parse(post.previewData)
            : post.previewData
        }))
        const fuse = new Fuse(parsedPosts, fuseOptions);
        set({ posts: parsedPosts, fuse, })
    },
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    setSearchResults: (searchResults: (Post & { score?: number, matches?: any[] })[]) => set({ searchResults }),
    setFilters: (filters: ItemType[]) => set({ filters }),
    clearFilters: () => set({ filters: [] }),
    clearSearchResults: () => set({searchQuery: '', searchResults: []}),

    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${backend}/api/posts`);
            const posts = response.data as Post[];
            const parsedPosts = posts.map(post => ({
            ...post,
            previewData: typeof post.previewData === 'string' 
                ? JSON.parse(post.previewData) 
                : post.previewData
        })); 
            const fuse = new Fuse(parsedPosts, fuseOptions);
            set({ posts: parsedPosts, fuse, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            set({ loading: false, error: errorMessage });
        }
    },

    searchPosts: async (query: string) => {
        const { fuse } = get();
        if (!fuse || !query.trim()) {
            set({ searchQuery: '', searchResults: [] });
            return [];
        }

        set({ searchQuery: query });
        try {
            const fuzzyQuery = `'${query}`
            const results = fuse.search(fuzzyQuery);

            const mappedResults = results.map(result => ({
                ...result.item,
                score: result.score,
                matches: result.matches ? [...result.matches] : undefined
            }))

            set({ searchResults: mappedResults });
            return mappedResults;
        } catch (error) {
            console.error("Search error: ", error);
            set({ searchResults: [] });
            return [];
        }
    },
    getSearchResults: () => {
        const { searchResults } = get();
        return searchResults
    },
    getPostsById: (id) => {
        const { posts } = get();
        return posts.find(post => post.id === id);
    },

    getFilteredPosts: () => {
        const { posts, filters } = get();
        if (filters.length === 0) return posts;
        return posts.filter(post => filters.includes(post.type));
    }
}))

export default usePostStore;
