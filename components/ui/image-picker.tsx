import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  images: PrismaImage[] | null;
  selectedImageId: string;
  onSelectImage: (imageId: string) => void;
}

const ImagePicker = ({ images, selectedImageId, onSelectImage }: Props) => {
  if (!images) return <div>No images found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-52 overflow-y-auto no-scrollbar">
      {images.map((image) => {
        const selected = image.id === selectedImageId;
        return (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden"
            onClick={() => onSelectImage(image.id)}
          >
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
              alt={image.id}
              className="hover:scale-110 transition-all cursor-pointer"
            />
            {selected && <div className="absolute inset-0 border-2  m-2" />}
          </div>
        );
      })}
    </div>
  );
};

export default ImagePicker;
