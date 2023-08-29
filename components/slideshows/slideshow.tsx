"use client";
import { Prisma } from "@prisma/client";
import { Pause, Play, Rat } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AddButton from "../ui/add-button";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

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
  const DELAY = 5000;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [autoSliderActive, setAutoSliderActive] = React.useState(true);

  useEffect(() => {
    if (!autoSliderActive || !slideshow) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => {
        if (prev === slideshow.slides.length - 1) return 0;
        return prev + 1;
      });
    }, DELAY);
    return () => clearInterval(interval);
  }, [autoSliderActive, slideshow]);

  return (
    <div className="relative flex w-full aspect-[16/9] rounded-xl overflow-hidden border bg-white">
      {slideshow ? (
        <AnimatePresence mode="popLayout">
          {slideshow.slides.map((slide, index) => {
            if (index !== currentSlideIndex) return null;
            return (
              <motion.div
                key={slide.id}
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src={slide.image.url}
                  lazyBoundary="100px"
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-5xl font-bold truncate drop-shadow-dark pb-2">
                    {slide.title}
                  </h3>
                  <p className="text-white/90 text-2xl font-thin drop-shadow-dark-sm px-1">
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            );
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
                      className={`relative w-3 h-3 shadow-sm select-none 
                          bg-white/80 hover:bg-white/90`}
                      onClick={() => setCurrentSlideIndex(index)}
                      type="button"
                    >
                      {index === currentSlideIndex && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-teal-500"
                          initial={{ height: 0 }}
                          animate={{
                            height: "100%",
                          }}
                          transition={{
                            ease: "easeInOut",
                            duration: DELAY / 1000,
                          }}
                        />
                      )}
                    </button>
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
