"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Atom,
  Image,
  LayoutDashboard,
  MoreHorizontal,
  Newspaper,
  Settings,
  Trophy,
  X,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { is } from "date-fns/locale";

export function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isMobile, isOpen, onClose] = useSidebar((state) => [
    state.isMobile,
    state.isOpen,
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
    },
    {
      icon: <Atom className="w-6 h-6 " />,
      href: `/labor`,
      label: "Labor",
      active: pathname === `/labor`,
    },
  ];

  const handleCLick = async (href: string) => {
    router.push(href);
  };

  return (
    <nav
      className={cn(
        "flex flex-col space-y-4 justify-between",
        !isMobile ? "w-full" : "items-center",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        {routes.map((route) => (
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
        ))}
      </div>
    </nav>
  );
}
