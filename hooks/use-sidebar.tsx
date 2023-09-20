import { create } from "zustand";

interface useSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onOpen: () => void;
  onClose: () => void;
  setMobileTrue: () => void;
  setMobileFalse: () => void;
}

export const useSidebar = create<useSidebarProps>((set, get) => ({
  isOpen: true,
  isMobile: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  setMobileTrue: () => set(() => ({ isMobile: true })),
  setMobileFalse: () => {
    set(() => ({ isMobile: false }));
    if (!get().isOpen) set(() => ({ isOpen: true }));
  },
}));
