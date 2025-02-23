import { ModalBoxInterface } from "@interfaces/boxes/ModalBox.interface";
import { create } from "zustand";

interface modalBoxState {
  modalBox: ModalBoxInterface | null;
  showModalBox: (modalBox: ModalBoxInterface) => void;
  hideModalBox: () => void;
}

export const useModalBoxStore = create<modalBoxState>((set) => ({
  modalBox: null,
  showModalBox: (modalBox: ModalBoxInterface) =>
    set({ modalBox: { ...modalBox, open: true } }),
  hideModalBox: () => set({ modalBox: null }),
}));
