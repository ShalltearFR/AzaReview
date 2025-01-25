"use client";
import { CDN2 } from "@/utils/cdn";

interface StarBGAnimationProps {
  zIndex?: number;
}

const StarBGAnimation: React.FC<StarBGAnimationProps> = ({ zIndex = -10 }) => {
  return (
    <div className="absolute w-full h-[calc(100%-205px)]">
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
