import { ReactElement } from 'react';
import { create } from 'zustand';

interface DrawerBox {
    content?: ReactElement;
    open?: boolean;
    onClick?: () => void;
    onClose?:() => void;
    size?: "sm" | "md" | "2xl",
    title: string
}

interface DrawerBoxState {
    drawerBox: DrawerBox | null;
    showDrawerBox: (drawerBox: DrawerBox) => void;
    hideDrawerBox: () => void;
}

export const useDrawerBoxStore = create<DrawerBoxState>((set) => ({
    drawerBox: null,
    showDrawerBox: (drawerBox: DrawerBox) => set({ drawerBox: { ...drawerBox, open: true } }),
    hideDrawerBox: () => set({ drawerBox: null }),
}));
