"use client";
import { cn } from "@/lib/utils";
import {
  Image,
  LayoutDashboard,
  Newspaper,
  Settings,
  Trophy,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const BUTTON_HEIGHT = 4;

const SidebarNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: <LayoutDashboard className="w-6 h-6 " />,
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`,
    },
    {
      icon: <Trophy className="w-6 h-6 " />,
      href: `/competitions`,
      label: "Competitions",
      active: pathname === `/competitions`,
    },
    {
      icon: <Newspaper className="w-6 h-6 " />,
      href: `/news`,
      label: "News",
      active: pathname === `/news`,
    },
    {
      icon: <Image className="w-6 h-6 " />,
      href: `/gallery`,
      label: "Gallery",
      active: pathname === `/gallery`,
    },
    {
      icon: <Settings className="w-6 h-6 " />,
      href: `/settings`,
      label: "Settings",
      active: pathname === `/settings`,
      allowedUserStates: ["admin", "developer"],
    },
  ];

  const handleCLick = async (href: string) => {
    router.push(href);
  };

  return (
    <nav className="relative flex flex-col w-full h-full">
      {routes.map((route, index) => {
        const isSelected = route.href === pathname;
        return (
          <button
            key={index}
            className={cn(
              "flex gap-2 items-center px-6 py-4 transition-colors",
              isSelected
                ? "bg-purple-100 text-purple-900"
                : "bg-white hover:bg-zinc-100 text-gray-600"
            )}
            style={{ height: `${BUTTON_HEIGHT}rem` }}
            onClick={() => handleCLick(route.href)}
          >
            {route.icon}
            <span>{route.label}</span>
          </button>
        );
      })}
      <div
        className={cn(
          "absolute top-0 right-0 w-1 bg-purple-600 transition-all rounded-full duration-500 ease-out"
        )}
        style={{
          height: `${BUTTON_HEIGHT}rem`,
          transform: `translateY(${
            BUTTON_HEIGHT * routes.findIndex((route) => route.href === pathname)
          }rem)`,
        }}
      />
    </nav>
  );
};

export default SidebarNavigation;
