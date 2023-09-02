"use client";
import React, { useEffect } from "react";
import { Prisma } from "@prisma/client";
import { Pause, Play, Rat } from "lucide-react";

import { Button } from "../ui/button";
import { AnimatePresence } from "framer-motion";
import Slide from "./slide";

const publishedSlideshow = Prisma.validator<Prisma.SlideshowDefaultArgs>()({
  include: {
    slides: {
      include: {
        image: {
          select: {
            url: true,
          },
        },
      },
    },
  },
});

export type PublishedSlideshow = Prisma.SlideshowGetPayload<
  typeof publishedSlideshow
>;

interface Props {
  slideshow: PublishedSlideshow | null;
}

const Slideshow = ({ slideshow }: Props) => {
  const DELAY = 3000;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [autoSliderActive, setAutoSliderActive] = React.useState(true);

  useEffect(() => {
    if (autoSliderActive && slideshow) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slideshow.slides.length);
      }, DELAY);
      return () => clearInterval(interval);
    }
  }, [autoSliderActive, slideshow]);

  return (
    <div className="relative flex w-full aspect-[16/9] rounded-xl overflow-hidden border bg-white">
      {slideshow ? (
        <AnimatePresence mode="popLayout">
          {slideshow.slides.map((slide, index) => {
            if (index !== currentSlideIndex) {
              return null;
            }
            return <Slide key={slide.id} slide={slide} />;
          })}
          {slideshow.slides.length > 1 ? (
            <div
              key="indexIndicatorBar"
              className="absolute bottom-0 top-0 right-0 p-6"
            >
              <div className="flex flex-col justify-center gap-2 h-full">
                {slideshow.slides.map((slide, index) => {
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`w-3 h-3 rounded-sm shadow-black shadow-sm hover:bg-white/90 transition-all duration-200 ${
                        index === currentSlideIndex
                          ? "bg-teal-500"
                          : "bg-white/50"
                      }`}
                      type="button"
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
          <div key="autoSlideButton" className="absolute bottom-0 right-0 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setAutoSliderActive(!autoSliderActive)}
              type="button"
              className="text-white/70 hover:bg-white/10 hover:text-white/90"
            >
              {autoSliderActive ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
          </div>
        </AnimatePresence>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Rat className="w-8 h-8 text-gray-500" />
          <p className="text-gray-400">Keine Slideshow veröffentlicht...</p>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
