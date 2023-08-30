import Image from "next/image";
import React from "react";

interface Props {
  image: {
    id: string;
    url: string;
  };
}

const CellImage = ({ image }: Props) => {
  if (!image.url) {
    return <p className="text-red-400">No image found.</p>;
  }
  return (
    <div
      className="
      relative
      overflow-hidden
      w-12
      aspect-square
      rounded-full
    "
    >
      <Image
        src={image.url}
        fill
        sizes="100%"
        alt={image.url}
        className="hover:scale-110 transition-all cursor-pointer object-cover object-center"
      />
    </div>
  );
};

export default CellImage;
