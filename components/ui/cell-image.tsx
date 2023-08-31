import Image from "next/image";
import React from "react";

interface Props {
  image: {
    id: string;
    url: string;
  };
}

// Sport icons: https://icons8.de/icon/set/sport/ios

const CellImage = ({ image }: Props) => {
  if (!image.url) {
    return <p className="text-red-400">No image found.</p>;
  }
  return (
    <div
      className="
      overflow-hidden
      w-12
      p-1
      border
      aspect-square
      rounded-full
    "
    >
      <div className="relative w-full aspect-square">
        <Image
          src={image.url}
          fill
          sizes="100%"
          alt={image.url}
          className="hover:scale-110 transition-all cursor-pointer object-cover object-center"
        />
      </div>
    </div>
  );
};

export default CellImage;
