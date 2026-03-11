import { create } from "zustand";

type AuthStore = {
    user: boolean;
    setUser: (user: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: false,
    setUser: (user: boolean) => set({ user }),
}))