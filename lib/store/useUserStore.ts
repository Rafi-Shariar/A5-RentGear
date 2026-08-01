import { create } from "zustand";
import { IUser } from "../types";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;

  updateUser : (updatedData : Partial<IUser['data']>) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  updateUser: (updatedData) =>
    set((state) => {
        if (!state.user) return state;

      return {
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            ...updatedData, 
          },
        },
      };
    }),
}));