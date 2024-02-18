"use client";
import CDN from "@/utils/cdn";

interface CharacterEidolonProps {
  isActive: boolean;
  img: string;
}

const CharacterEidolon: React.FC<CharacterEidolonProps> = ({
  isActive,
  img,
}) => {
  return (
    <div className="w-12 rounded-full bg-black border border-background">
      <img
        src={`${CDN}/${img}`}
        className={`${isActive ? "" : "opacity-25"}`}
      />
    </div>
  );
};

export default CharacterEidolon;
