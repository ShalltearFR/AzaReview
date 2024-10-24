import { CDN2 } from "@/utils/cdn";

interface StarProps {
  number: string;
  className?: string;
}
export const Star: React.FC<StarProps> = ({ number, className = "" }) => {
  return (
    <>
      {Array.from({ length: Number(number) }, (_: any, i: number) => (
        <img
          key={i}
          className={className}
          src={`${CDN2}/img/guides/icon/star.webp`}
          alt="star"
        />
      ))}
    </>
  );
};
