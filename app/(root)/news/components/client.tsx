"use client";
import Carousel from "@/components/slideshows/carousel";
import Slide from "@/components/slideshows/slide";
import { PublishedSlideshow } from "@/components/slideshows/slideshow";
import React from "react";

interface Props {
  publishedSlideshows: PublishedSlideshow[];
}

const NewsClient = ({ publishedSlideshows }: Props) => {
  const slideshow: PublishedSlideshow = publishedSlideshows[0];
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto items-center">
      {slideshow ? (
        <Carousel>
          {slideshow.slides.map((slide) => (
            <Slide key={slide.id} slide={slide} />
          ))}
        </Carousel>
      ) : (
        <p className="text-gray-400 font-semibold text-center">
          no active slideshow...
        </p>
      )}
    </div>
  );
};

export default NewsClient;
