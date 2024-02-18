"use client";
import CDN from "@/utils/cdn";
import { jsonUID } from "@/utils/jsonUid";
import CharacterEidolon from "./CharacterEidolon";

interface CharacterSplashProps {
  uidData: jsonUID;
  index: number;
}

const CharacterSplash: React.FC<CharacterSplashProps> = ({
  uidData,
  index,
}) => {
  const character = uidData.characters[index];
  return (
    <div
      className="flex flex-col w-full h-[480px] border relative"
      // style={{
      //   backgroundImage: `url('${CDN}/${character.portrait}')`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center center",
      //   backgroundSize: "contain",
      // }}
    >
      <img
        src={`${CDN}/${character.portrait}`}
        alt=""
        className="absolute top-10"
      />
      <div className="ml-5">
        <div className="grid grid-cols-[1fr_120px] items-center">
          <span className="text-white text-4xl z-10">{character.name}</span>
          <span className="text-orange text-right text-3xl pr-5 z-10">
            Niv.{character.level}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          <img
            src={`${CDN}/${character.element.icon}`}
            className="w-6 z-10"
            alt="element"
          />
          <img
            src={`${CDN}/${character.path.icon}`}
            className="w-6 z-10"
            alt="path"
          />
        </div>
      </div>
      <div className="flex mt-auto w-full h-16 items-center justify-center border gap-2 z-10">
        {character.rank_icons.map((eidolon, i) => {
          return (
            <CharacterEidolon
              key={crypto.randomUUID()}
              img={eidolon}
              isActive={character.rank > i ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSplash;
