import React from "react";

interface Props {
  dimension?: number;
}
const DragonScale = ({ dimension = 50 }: Props) => {
  return (
    <div
      className="bg-gray-700 rounded-sm"
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
      }}
    />
  );
};

export default DragonScale;
