import { CDN2 } from "@/utils/cdn";

interface StarProps {
  number: string;
}
export const Star: React.FC<StarProps> = ({ number }) => {
  return (
    <>
      {Array.from({ length: Number(number) }, (_: any, i: number) => (
        <img
          key={i}
          src={`${CDN2}/img/guides/icon/star.webp`}
          width={24}
          alt="star"
        />
      ))}
    </>
  );
};
