"use client";
import Slideshow, {
  PublishedSlideshow,
} from "@/components/slideshows/slideshow";
import React, { useEffect, useState } from "react";

interface Props {
  publishedSlideshows: PublishedSlideshow[];
}

const NewsClient = ({ publishedSlideshows }: Props) => {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <Slideshow slideshow={publishedSlideshows[0]} />
    </div>
  );
};

export default NewsClient;
