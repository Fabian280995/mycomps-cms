import React, { useEffect } from "react";
import { SlideWithImage } from "./slide-card";
import Image from "next/image";

interface Props {
  slides: SlideWithImage[];
}

const SmallImageSlider = ({ slides }: Props) => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <Image
        src={slides[slideIndex].image.url}
        alt={slides[slideIndex].title}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default SmallImageSlider;
