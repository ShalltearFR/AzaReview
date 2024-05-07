"use client";
import { CDN } from "@/utils/cdn";
import { useState } from "react";

interface CharacterTraceProps {
  type: string;
  level: number;
  img: string;
  name: string;
  desc: string;
}

const CharacterTrace: React.FC<CharacterTraceProps> = ({
  level,
  img,
  type,
  name,
  desc,
}) => {
  const [tooltip, setTooltip] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col w-20 h-20 relative font-Agbalumo"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div
        className={`hidden absolute z-20 p-2 bg-background rounded-xl xl:w-[650px] text-white top-16${
          tooltip ? " xl:block" : ""
        }`}
      >
        <p className="font-bold">{name}</p>
        <p>{desc}</p>
      </div>

      <div className="absolute w-16 h-16 top-1 left-1 rounded-full bg-black border border-gray">
        <img src={`${CDN}/${img}`} />
      </div>
      <span className="z-10 h-5 flex justify-center items-center bg-light-gray rounded-full text-xs font-bold">
        {type}
      </span>
      <span className="flex mt-auto z-10 bg-light-gray w-7 h-7 justify-center items-center rounded-full font-bold">
        {level}
      </span>
    </div>
  );
};

export default CharacterTrace;
