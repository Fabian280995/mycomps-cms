"use client";
import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CellActionProps {
  url: string;
  name: string;
  mode?: "link" | "main";
}

export const CellLink: React.FC<CellActionProps> = ({
  url,
  name,
  mode = "link",
}) => {
  const pathname = usePathname();
  const lastPathIndex = pathname.split("/").slice(-1).toString();

  const route = url.split("/").slice(0, -1).includes(lastPathIndex)
    ? pathname + "/" + url.split("/").slice(-1)
    : pathname + "/" + url;

  return (
    <Link
      href={route}
      className={cn(
        `flex items-center transition hover:underline
        group gap-x-0.5 text-slate-700`,
        mode === "link" && "font-medium",
        mode === "main" && "font-bold"
      )}
    >
      {mode === "link" && (
        <LinkIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-700" />
      )}
      {name}
    </Link>
  );
};
