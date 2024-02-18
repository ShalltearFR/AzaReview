"use client";
import { jsonUID } from "@/utils/jsonUid";
import CharacterSplash from "./CharacterSplash";

interface CharacterDetailsProps {
  uidData: jsonUID;
  index: number;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  uidData,
  index,
}) => {
  return (
    <article
      className="grid grid-cols-3 w-[1350px] h-[950px] mx-auto mt-14"
      style={{ backgroundImage: "url('/img/character_bg.avif')" }}
    >
      <div>
        <CharacterSplash uidData={uidData} index={index} />
      </div>
      <div></div>
      <div></div>
    </article>
  );
};

export default CharacterDetails;
