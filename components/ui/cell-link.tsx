"use client";
import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CellActionProps {
  url: string;
  name: string;
  mode?: "link" | "main";
  imageSrc?: string;
}

export const CellLink: React.FC<CellActionProps> = ({
  url,
  name,
  mode = "link",
  imageSrc,
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
      {mode === "link" ? (
        <LinkIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-700" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          width={32}
          height={32}
          quality={80}
          className=" border group-hover:border-gray-500 object-cover object-center aspect-square rounded-lg mr-2"
        />
      ) : null}
      {name}
    </Link>
  );
};
