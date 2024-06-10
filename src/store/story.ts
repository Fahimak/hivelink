import { create } from "zustand";

export const storyStore = create((set) => ({
  storyUuid: "",
  storyId: 0,
  updateStoryUuid: (newAlert: any) =>
    set((state: any) => ({
      storyUuid: newAlert,
    })),
  updateStoryId: (newAlert: any) =>
    set((state: any) => ({
      storyId: newAlert,
    })),
}));
