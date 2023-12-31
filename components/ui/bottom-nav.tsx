"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Props {
  routes?: {
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
    <motion.div
      className="shadow-md rounded-full max-w-prose flex gap-x-6 max-sm:gap-x-2 bg-white px-2 py-2 md:mx-auto
      items-center justify-around border"
      layout
    >
      {isMounted ? (
        <TooltipProvider delayDuration={300}>
          {routes &&
            routes.map((route) => {
              const active = pathname === route.href;
              return (
                <Tooltip key={route.label + "|" + route.href}>
                  <TooltipTrigger
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-full border-2 border-transparent hover:border-gray-100 transition",
                      "text-gray-400 hover:text-gray-600 duration-75",
                      active ? "bg-gray-100 text-gray-900" : "bg-transparent"
                    )}
                    onClick={() => router.push(route.href)}
                  >
                    {route.icon}
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs font-semibold">{route.label}</span>
                  </TooltipContent>
                </Tooltip>
              );
            })}
        </TooltipProvider>
      ) : (
        <div className="flex flex-col items-center justify-center p-2 rounded-lg animate-spin">
          <Loader2 className="w-6 h-6 text-slate-500" />
        </div>
      )}
    </motion.div>
  );
};

export default BottomNav;
