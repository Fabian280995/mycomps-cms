import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { set } from "date-fns";

interface Props {
  children: React.ReactNode;
  autoSlideInterval?: number;
}

const Carousel: React.FC<Props> = ({
  children: slides,
  autoSlideInterval = 3000,
}) => {
  const [current, setCurrent] = useState(0);
  const [autoSlideActive, setAutoSlideActive] = useState(true);

  if (!Array.isArray(slides)) return null;

  let intervalId: NodeJS.Timeout;
  const prev = () =>
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () =>
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  useEffect(() => {
    if (!autoSlideActive) return;
    intervalId = setInterval(next, autoSlideInterval);
    return () => clearInterval(intervalId);
  }, [autoSlideActive, autoSlideInterval]);

  function onClickNavBtn(currId: number) {
    setAutoSlideActive(false);
    setCurrent(currId);
    setTimeout(() => setAutoSlideActive(true), 5000);
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute bottom-0 top-0 right-0 flex flex-col justify-between items-center p-2 m-2 md:m-4">
        <div className="flex flex-1 flex-col h-full items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`transition-all w-3 h-3 md:w-4 md:h-4 rounded-sm cursor-pointer shadow-black shadow-sm select-none
                          ${current === i ? "bg-teal-500" : "bg-white/50"}`}
              onClick={() => onClickNavBtn(i)}
              type="button"
            />
          ))}
        </div>
        <div className="absolute bottom-0 ">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setAutoSlideActive((prev) => !prev)}
            type="button"
            className="text-white/70 hover:bg-white/10 hover:text-white/90"
          >
            {autoSlideActive ? (
              <Pause className="w-4 h-4 md:w-6 md:h-6" />
            ) : (
              <Play className="w-4 h-4 md:w-6 md:h-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
