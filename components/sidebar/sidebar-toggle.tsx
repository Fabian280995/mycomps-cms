"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { Menu } from "lucide-react";
import React from "react";

const SidebarToggle = () => {
  const [isOpen, onOpen, onClose] = useSidebar((state) => [
    state.isOpen,
    state.onOpen,
    state.onClose,
  ]);
  return (
    <>
      {!isOpen ? (
        <div
          className="fixed md:hidden bottom-4 right-4 z-50 p-2 rounded-full bg-teal-400 shadow-md
          cursor-pointer"
        >
          <Menu
            className="w-6 h-6 text-white"
            onClick={isOpen ? onClose : onOpen}
          />
        </div>
      ) : null}
    </>
  );
};

export default SidebarToggle;
