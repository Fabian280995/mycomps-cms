import React from "react";
import { Button } from "../ui/button";
import { Donut } from "lucide-react";
import Image from "next/image";
import FolderActions from "./folder-actions";
import Link from "next/link";
import { Image as PrismaImage } from "@prisma/client";

export interface CardFolder {
  id: string;
  name: string;
  images: PrismaImage[];
  createdAt: string;
}

interface Props {
  folder: CardFolder;
}

const FolderCard = ({ folder }: Props) => {
  const { id, name, images, createdAt } = folder;
  return (
    <div className="bg-white rounded-xl px-4 py-2 shadow-md space-y-2">
      <div className="flex gap-2 justify-between items-center">
        <Link
          href={`/gallery/${id}`}
          className="truncate text-gray-700 flex-1 font-semibold
          hover:underline"
        >
          {name}
        </Link>
        <FolderActions data={folder} />
      </div>
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
        {images[0] ? (
          <>
            <Image
              src={images[0].url}
              alt={name}
              fill
              sizes="100%"
              quality={50}
              loading="lazy"
              className="object-cover object-center"
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">no images yet...</p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end">
        <p className="text-gray-500 text-sm font-semibold">
          {images.length} image{images.length > 1 ? "s" : ""}
        </p>
        <p className="text-gray-500 text-xs">{createdAt}</p>
      </div>
    </div>
  );
};

export default FolderCard;
