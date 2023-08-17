import { create } from "zustand";

interface useSidebarProps {
  isOpen: boolean;
  isExpanded: boolean;
  onOpen: () => void;
  onClose: () => void;
  onExpand: () => void;
}

export const useSidebar = create<useSidebarProps>((set) => ({
  isOpen: true,
  isExpanded: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onExpand: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));
