import { create } from "zustand";

export interface AlertType {
  type: string;
  message: string;
}

export const alertStore = create((set) => ({
  alert: {
    type: "none",
    message: "",
  },
  updateAlert: (newAlert: any) =>
    set((state: any) => ({
      alert: {
        ...state.alert,
        ...newAlert,
      },
    })),
}));
