"use client";
import { CDN2 } from "@/utils/cdn";
import Snowfall from "react-snowfall";

interface StarBGAnimationProps {
  zIndex?: number;
}

const StarBGAnimation: React.FC<StarBGAnimationProps> = ({ zIndex = -10 }) => {
  return (
    <div className="absolute w-full h-[calc(100%-205px)]">
      {/* EFFET NEIGE */}
      <Snowfall
        snowflakeCount={75}
        speed={[0, 1.5]}
        wind={[-1, 1]}
        radius={[0.5, 3.5]}
        style={{ position: "absolute", zIndex: "49" }}
      />
      <div
        style={{
          backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
          zIndex: zIndex,
        }}
        className="animate-stars"
      />
    </div>
  );
};

export default StarBGAnimation;
