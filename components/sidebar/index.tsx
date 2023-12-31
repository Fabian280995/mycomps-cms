"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import SidebarNavigation from "./nav";

const Sidebar = () => {
  return (
    <div className="flex bg-white flex-col justify-between shadow-md h-full">
      <div className="flex justify-center items-center w-full aspect-square">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-full flex-1">
        <SidebarNavigation />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Sidebar;
