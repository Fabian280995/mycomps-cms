import React from "react";

import { Prisma } from "@prisma/client";
import Image from "next/image";

const slideWithImageUrl = Prisma.validator<Prisma.SlideDefaultArgs>()({
  include: {
    image: {
      select: {
        url: true,
      },
    },
  },
});

export type SlideWithImageUrl = Prisma.SlideGetPayload<
  typeof slideWithImageUrl
>;

interface Props {
  slide: SlideWithImageUrl;
}

const Slide = ({ slide }: Props) => {
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <Image
        src={slide.image.url}
        alt={slide.title}
        fill
        sizes="100vw"
        quality={100}
        className="object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-2xl md:text-5xl font-bold truncate drop-shadow-dark pb-2">
          {slide.title}
        </h3>
        <p className="text-white/90 text-lg md:text-2xl font-thin drop-shadow-dark-sm">
          {slide.description}
        </p>
      </div>
    </div>
  );
};

export default Slide;
