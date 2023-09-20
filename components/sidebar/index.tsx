"use client";
import React, { use, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { Navigation } from "./navigation";
import { Button } from "../ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { isOpen, isMobile, setMobileTrue, setMobileFalse, onOpen, onClose } =
    useSidebar((state) => ({
      isOpen: state.isOpen,
      isMobile: state.isMobile,
      setMobileTrue: state.setMobileTrue,
      setMobileFalse: state.setMobileFalse,
      onOpen: state.onOpen,
      onClose: state.onClose,
    }));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 820) {
        setMobileTrue();
      } else {
        setMobileFalse();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="fixed sm:static top-0 left-0 bottom-0 flex flex-col gap-y-4 
          h-full bg-white py-8 items-center px-4 transition-all duration-300 z-40 shadow-md"
          >
            <div className="flex flex-col gap-2 items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex w-full justify-center flex-1 mt-8 gap-y-2">
              <Navigation />
            </div>
            {isMobile ? (
              <div className="self-end">
                <Button size="icon" onClick={onClose}>
                  <X className="w-6 h-6 transform rotate-90" />
                </Button>
              </div>
            ) : null}
          </div>

          {isMobile ? (
            <div
              className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-30"
              onClick={onOpen}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Sidebar;
