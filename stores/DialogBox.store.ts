import { ReactNode } from "react";
import { create } from "zustand";

export interface DialogBox {
  title: string;
  content: string;
  show?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  type?: 'success' | 'error'
  
}

interface DialogBoxState {
  dialogBox: DialogBox | null;
  showDialogBox: (dialogBox: DialogBox) => void;
  hideDialogBox: () => void;
}

export const useDialogBoxStore = create<DialogBoxState>((set) => ({
  dialogBox: null,
  showDialogBox: (dialogBox: DialogBox) => set({ dialogBox: { ...dialogBox, show: true } }),
  hideDialogBox: () => set({ dialogBox: null }),
}));
