"use client";
import React from "react";
import DragonScale from "./dragon-scale";

import { motion } from "framer-motion";
import { set } from "date-fns";

const DragonScaleBackground = () => {
  const [scales, setScales] = React.useState<{ x: number; y: number }[]>([]); // [{x: 0, y: 0}
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scaleDimension = 50;
  const scaleGap = 10;

  const createScales = (containerWidth: number, containerHeight: number) => {
    const scaleCountX = Math.ceil(containerWidth / (scaleDimension + scaleGap));
    const scaleCountY = Math.ceil(
      containerHeight / (scaleDimension + scaleGap)
    );

    for (let i = 0; i < scaleCountX; i++) {
      const x = i * scaleDimension + i * scaleGap;

      for (let j = 0; j < scaleCountY; j++) {
        const y = j * scaleDimension + j * scaleGap;
        setScales((scales) => [...scales, { x, y }]);
      }
    }
  };

  React.useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current?.offsetWidth;
      const containerHeight = containerRef.current?.offsetHeight;
      createScales(containerWidth, containerHeight);
    }
  }, [containerRef.current, scaleDimension, scaleGap]);

  return (
    <div
      className="w-full h-full overflow-hidden p-1
      bg-gradient-to-tr from-red-800 to-amber-600"
      ref={containerRef}
    >
      <div className="relative">
        {scales.map((scale, index) => (
          <motion.div
            style={{
              position: "absolute",
              top: `${scale.y}px`,
              left: `${scale.x}px`,
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: (scale.x + scale.y) / 1000,
            }}
          >
            <DragonScale
              key={`${scale.x}-${scale.y}`}
              dimension={scaleDimension}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DragonScaleBackground;
