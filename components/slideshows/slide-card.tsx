import { Prisma } from "@prisma/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import React from "react";

const slideWithImage = Prisma.validator<Prisma.SlideDefaultArgs>()({
  include: { image: true },
});

export type SlideWithImage = Prisma.SlideGetPayload<typeof slideWithImage>;

interface Props {
  slide: SlideWithImage;
  onSelect: () => void;
  loading: boolean;
}

const SlideCard = ({ slide, onSelect, loading }: Props) => {
  const handleClick = () => {
    if (loading) return;
    onSelect();
  };
  return (
    <div
      className="relative group flex w-full rounded-md aspect-[16/9] overflow-hidden bg-white shadow-md cursor-pointer"
      onClick={handleClick}
    >
      {slide.image ? (
        <Image
          src={slide.image.url}
          fill
          sizes="100%"
          alt={slide.title}
          priority
          className="group-hover:scale-110 transition-all object-cover object-center"
        />
      ) : (
        <div className="flex-1 flex flex-col gap-2 items-center justify-center">
          <p className="text-sm text-gray-400">No image found.</p>
        </div>
      )}
      <div className="absolute inset-0 flex items-end bg-black/40">
        <h3 className="text-white font-bold truncate px-2 py-1">
          {slide.title}
        </h3>
      </div>
      {loading ? <div className="absolute inset-0 bg-gray-500/30 " /> : null}
    </div>
  );
};

export default SlideCard;
