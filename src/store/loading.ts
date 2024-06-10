import { create } from "zustand";

export const loadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (newState: boolean) =>
    set((state: any) => ({
      isLoading: newState,
    })),
}));
