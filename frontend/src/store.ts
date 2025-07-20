import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Fuse from "fuse.js";
import type { ItemType } from "./types";
//import { error } from "console";

axios.defaults.withCredentials = true;



//Store for all post related logic(filtering, searching)

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
    clearSearchResults: () => set({ searchQuery: '', searchResults: [] }),

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
            //console.error("Search error: ", error);
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

//Store for determining type of screen;

interface ScreenStore {
    screen: "mobile" | "tablet" | "desktop";
    setScreen: (screen: "mobile" | "tablet" | "desktop") => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
    screen: 'desktop',
    setScreen: (screen: "mobile" | "tablet" | "desktop") => set({ screen })
}))


//Store for all Auth logic

interface AuthStore {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    initializeAuth: () => void;
    clearError: () => void;
}

// Set up axios interceptor to include token in all requests
const setupAxiosInterceptor = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            login: async (email: string, password: string) => {
                if (!email || !password) {
                    set({ error: "Please fill all fields" });
                    return false;
                }
                set({ loading: true, error: null })
                try {
                    const response = await axios.post(`${backend}/login`, {
                        email,
                        password,
                    }, {
                        withCredentials: true
                    });
                    
                    console.log('Login response:', response.data); // Debug log
                    
                    if (response.data.user) {
                        const token = response.data.token;
                        if (token) {
                            setupAxiosInterceptor(token);
                        }
                        set({
                            user: response.data.user,
                            token: token || null,
                            isAuthenticated: true,
                            loading: false
                        })
                        return true;
                    }
                    return false;
                } catch (err) {
                    let errorMessage = "Login failed";
                    if (typeof err === "object" && err !== null && "response" in err && typeof (err as any).response === "object" && (err as any).response !== null && "data" in (err as any).response && typeof (err as any).response.data === "object" && (err as any).response.data !== null && "error" in (err as any).response.data) {
                        errorMessage = (err as any).response.data.error;
                    } else if (typeof err === "object" && err !== null && "message" in err) {
                        errorMessage = (err as any).message;
                    }
                    set({ error: errorMessage, isAuthenticated: false, loading: false });
                    return false;
                }
            },
            signup: async (name: string, email: string, password: string) => {
                if (!name || !email || !password) {
                    set({error: "Please fill all fields"});
                    return false;
                }
                set({loading: true, error: null});
                try {
                    const response = await axios.post(`${backend}/signup`, {
                        name,
                        email,
                        password,
                    }, {
                        withCredentials: true
                    });
                    if (response.data.user && response.data.token) {
                        setupAxiosInterceptor(response.data.token);
                        set({
                            user: response.data.user,
                            token: response.data.token,
                            isAuthenticated: true,
                            loading: false
                        })
                        return true;
                    }
                    return false;
                } catch (err) {
                    let errorMessage = "Signup failed";
                    if (typeof err === "object" && err !== null && "response" in err && typeof (err as any).response === "object" && (err as any).response !== null && "data" in (err as any).response && typeof (err as any).response.data === "object" && (err as any).response.data !== null && "error" in (err as any).response.data) {
                        errorMessage = (err as any).response.data.error;
                    } else if (typeof err === "object" && err !== null && "message" in err) {
                        errorMessage = (err as any).message;
                    }
                    set({error: errorMessage, loading: false, isAuthenticated: false})
                    return false;
                }
            },
            logout: async () => {
                try {
                    await axios.post(`${backend}/logout`, {}, {withCredentials: true});
                } catch {
                    //console.error('Logout error', error);
                }
                setupAxiosInterceptor(null);
                set({user: null, token: null, error: null, isAuthenticated: false});
            },
            initializeAuth: () => {
                const { token } = get();
                if (token) {
                    setupAxiosInterceptor(token);
                    const storedUser = localStorage.getItem('user');
                if(storedUser) {
                    try {
                        const user = JSON.parse(storedUser);
                        set({user: user, isAuthenticated: true});
                    } catch(error) {
                        localStorage.removeItem('user');
                    }
                }
                }
                
            },
            clearError: () => {
                set({error: null});
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
)