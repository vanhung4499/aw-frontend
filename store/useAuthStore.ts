import {IUser} from "@/models";
import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"

interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    token: string | null;
    refreshToken: string | null;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    removeUser: () => void;
    removeToken: () => void;
    removeRefreshToken: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null,
            setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
            setUser: (user: IUser) => set({ user }),
            removeUser: () => set({ user: null }),
            setToken: (token: string) => set({ token }),
            removeToken: () => set({ token: null }),
            setRefreshToken: (refreshToken: string) => set({ refreshToken }),
            removeRefreshToken: () => set({ refreshToken: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);