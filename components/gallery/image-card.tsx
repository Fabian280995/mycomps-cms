import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Ban, Check } from "lucide-react";

import ImageActions from "./image-actions";

interface Props {
  image: PrismaImage;
  onSelect: (image: PrismaImage) => void;
  selected: boolean;
  loading: boolean;
}

const ImageCard = ({ image, onSelect, selected, loading }: Props) => {
  return (
    <div
      className="group relative w-full aspect-square overflow-hidden rounded-3xl shadow-md
          cursor-pointer select-none"
      onClick={() => onSelect(image)}
    >
      <Image
        src={image.url}
        alt={image.url}
        fill
        sizes="100%"
        priority
        className="object-cover object-center group-hover:scale-[1.02] transition-all duration-100"
      />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4">
        <div
          className={`w-4 h-4  rounded-full 
        flex justify-center items-center transition-all duration-100
        ${selected ? "bg-teal-600" : "bg-white/40"}
        
      `}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
        <ImageActions data={image} />
      </div>
      {image.creatorLink && (
        <a
          href={image.creatorLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 truncate text-white text-sm font-medium"
        >
          Creator: {image.creatorLink}
        </a>
      )}
      {image.key === "no-key" && (
        <div className="absolute bottom-4 right-4">
          <Ban className="w-8 h-8 text-red-500 drop-shadow-dark" />
        </div>
      )}
      {loading ? <div className="absolute bg-black/50 inset-0" /> : null}
    </div>
  );
};

export default ImageCard;
