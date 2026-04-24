import { CDN } from "@/utils/cdn";
import { splitAndKeepDelimiters } from "@/utils/format";
import { useEffect, useState } from "react";

interface CharacterTraceProps {
  index?: number;
  characterID: string;
  id: string;
  type: string;
  level: number;
  img: string;
  name: string;
  desc: string;
  type_text?: string;
  remembrance?: boolean;
  elation?: boolean;
}

const CharacterTrace: React.FC<CharacterTraceProps> = ({
  index = 0,
  characterID,
  id,
  level,
  img,
  type,
  name,
  desc,
  remembrance,
  type_text,
}) => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [descArray, setDescArray] = useState<string[]>([]);

  useEffect(() => {
    const descriptionsArray = splitAndKeepDelimiters(desc, ". ");
    setDescArray(descriptionsArray);
  }, [desc]);

  return (
    <div
      className={`flex flex-col w-20 h-20 relative font-Agbalumo ${type_text === "Comicompétence" && index > 0 ? "translate-x-4 z-[11]" : ""}`}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div
        className={`hidden absolute z-20 p-2 bg-background border border-orange rounded-xl xl:w-[650px] text-white top-16${
          tooltip ? " xl:flex flex-col gap-2" : ""
        }`}
      >
        <p className="font-bold z-50">{name}</p>
        {descArray.map((desc: string) => (
          <p key={`traceDesc+${id}+${desc}+${characterID}`}>{desc}</p>
        ))}
      </div>

      <div
        className={`absolute w-16 h-16 top-1 left-1 rounded-full bg-black border border-gray `}
      >
        <img
          src={`
            ${
              type_text === "Comicompétence"
                ? `${CDN}/icon/path/ElationSmall.png`
                : `${CDN}/${img}`
            }`}
          alt={""}
          width={62}
          height={62}
          className={`${remembrance ? "remembranceIcon" : ""}`}
        />
      </div>
      <span
        className={`z-10 h-5 flex justify-center items-center bg-light-gray rounded-full text-xs font-bold ${type_text === "Comicompétence" ? "w-28 -translate-x-4" : ""}`}
      >
        {type}
      </span>
      <span className="flex mt-auto z-10 bg-light-gray w-7 h-7 justify-center items-center rounded-full font-bold">
        {level}
      </span>
    </div>
  );
};

export default CharacterTrace;
