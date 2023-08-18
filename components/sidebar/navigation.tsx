"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Dumbbell,
  Home,
  LayoutDashboard,
  MapPin,
  MoreHorizontal,
  Newspaper,
  Trophy,
  Users2,
  Wrench,
  X,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

export function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isExpanded, onExpand] = useSidebar((state) => [
    state.isExpanded,
    state.onExpand,
  ]);
  const pathname = usePathname();
  const params = useParams();
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
      icon: <Wrench className="w-6 h-6 " />,
      href: `/settings`,
      label: "Settings",
      active: pathname === `/settings`,
    },
  ];

  const handleCLick = async (href: string) => {
    router.push(href);
  };

  return (
    <nav
      className={cn(
        "flex flex-col space-y-4 justify-between",
        isExpanded ? "w-full" : "items-center",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        {routes.map((route) => (
          <button
            key={route.href}
            type="button"
            onClick={() => handleCLick(route.href)}
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
              {isExpanded ? route.label : null}
            </div>
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExpand()}
        className="border self-end"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-gray-500" />
        ) : (
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
        )}
      </Button>
    </nav>
  );
}
