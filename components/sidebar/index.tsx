"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

import { Navigation } from "./navigation";
import { useSidebar } from "@/hooks/use-sidebar";

interface SidebarProps {}
const Sidebar = ({}: SidebarProps) => {
  const [isOpen] = useSidebar((state) => [state.isOpen]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <motion.div
      className="fixed sm:static top-0 left-0 bottom-0 flex flex-col gap-y-4 
      h-full bg-white py-8 items-center px-4 transition-all duration-300"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      exit={{ x: "-100%" }}
    >
      <div className="flex flex-col gap-2 items-center">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex w-full justify-center flex-1 mt-8 gap-y-2">
        <Navigation />
      </div>
    </motion.div>
  );
};

export default Sidebar;
