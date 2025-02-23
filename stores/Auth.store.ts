import { AuthState } from "@interfaces/auth/AuthStore.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      filters: [],
      setAuthState: (newState: Partial<AuthState>) =>
        set((state) => ({ ...state, ...newState })),
      clearAuthState: () =>
        set({
          token: null,
          refreshToken: null,
          user: null,
          filters: [],
        }),
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user
      }),
    }
  )
);