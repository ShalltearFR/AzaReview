"use client";
import { CDN } from "@/utils/cdn";
import { useEffect, useState } from "react";

interface eidolon {
  desc: string;
  name: string;
  id: string;
}

interface CharacterEidolonProps {
  isActive: boolean;
  img: string;
  eidolon: eidolon;
}

const CharacterEidolon: React.FC<CharacterEidolonProps> = ({
  isActive,
  img,
  eidolon,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const descSplitN = eidolon.desc.split("\\n");

  return (
    <div
      className="w-12 rounded-full bg-black border border-gray relative"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {isTooltipVisible && (
        <div className="absolute bg-background text-white z-40 hidden xl:block rounded-xl xl:w-96 p-2 top-12">
          <p className="z-40 font-bold">{eidolon.name}</p>
          {descSplitN.map((el, i) => (
            <p key={`${eidolon.id}+${i}`}>{el}</p>
          ))}
          {/* <p className="z-40">{eidolon.desc.replace(/\n/g, "")}</p> */}
        </div>
      )}
      <img
        src={`${CDN}/${img}`}
        className={`${isActive ? "" : "opacity-25"}`}
      />
    </div>
  );
};

export default CharacterEidolon;
