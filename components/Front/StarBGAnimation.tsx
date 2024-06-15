import { CDN2 } from "@/utils/cdn";

const StarBGAnimation: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
        zIndex: -10,
      }}
      data-aos="animate-stars"
    />
  );
};

export default StarBGAnimation;
