import { create } from "zustand";

type User = {
    id: string;
    email: string;
    Fname: string;
    Lname: string;
    role: "Mentor" | "Mentee";
    hasProfile?: boolean;
}

type AuthStore = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    }
}))