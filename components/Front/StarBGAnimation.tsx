import { CDN2 } from "@/utils/cdn";

interface StarBGAnimationProps {
  zIndex?: number;
}

const StarBGAnimation: React.FC<StarBGAnimationProps> = ({ zIndex = -10 }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
        zIndex: zIndex,
      }}
      data-aos="animate-stars"
    />
  );
};

export default StarBGAnimation;
