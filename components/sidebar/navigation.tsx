"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Atom,
  Image,
  LayoutDashboard,
  Newspaper,
  Settings,
  Trophy,
} from "lucide-react";
import React from "react";
import { useSidebar } from "@/hooks/use-sidebar";

export function Navigation({ userRole }: { userRole: string }) {
  const [isMobile, onClose] = useSidebar((state) => [
    state.isMobile,
    state.onClose,
  ]);
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
    <nav
      className={cn(
        "flex flex-col space-y-4 justify-between",
        !isMobile ? "w-full" : "items-center"
      )}
    >
      <div className="flex flex-col space-y-4">
        {routes.map((route) => {
          if (
            route.allowedUserStates &&
            !route.allowedUserStates.includes(userRole)
          )
            return null;
          return (
            <button
              key={route.href}
              type="button"
              onClick={() => {
                if (isMobile) onClose();
                handleCLick(route.href);
              }}
            >
              <div
                className={cn(
                  "w-full text-md transition duration-150 font-semibold flex items-center gap-x-2 rounded-md",
                  "p-2",
                  route.active
                    ? "text-black dark:text-white bg-gray-100"
                    : "text-gray-500 hover:underline group hover:text-gray-400"
                )}
              >
                {route.icon}
                {route.label}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
