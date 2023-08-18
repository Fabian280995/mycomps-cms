"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  routes: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
}

const BottomNav = ({ routes }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="shadow-md rounded-full flex gap-x-2 bg-white p-2 max-w-2xl md:mx-auto
      items-center justify-around mb-4 mx-2
    "
    >
      {isMounted ? (
        <TooltipProvider>
          {routes.map((route) => {
            const active = pathname === route.href;
            return (
              <Tooltip key={route.label + "|" + route.href}>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "flex flex-col items-center justify-center",
                      active ? "bg-gray-100" : "bg-transparent"
                    )}
                    onClick={() => router.push(route.href)}
                  >
                    {route.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs font-semibold">{route.label}</span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      ) : null}
    </div>
  );
};

export default BottomNav;
