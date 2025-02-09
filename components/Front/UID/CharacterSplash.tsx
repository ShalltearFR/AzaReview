import { CDN, CDN2 } from "@/utils/cdn";
import { Character } from "@/types/jsonUid";
import CharacterEidolon from "./CharacterEidolon";
import { UIDtitles } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";
import Image from "next/image";

interface CharacterSplashProps {
  character: Character;
  eidolonsList: Array<any>;
  lang: keyof TranslateSection | undefined;
}

const CharacterSplash: React.FC<CharacterSplashProps> = ({
  character,
  eidolonsList,
  lang,
}) => {
  return (
    <div className="flex flex-col h-[550px] relative items-center">
      <img
        key={character.portrait}
        src={`${CDN2}/img/portraits/${character.id}.webp`}
        height={470}
        width={470}
        fetchPriority="high"
        alt={`${character.name} portrait`}
        className="absolute xl:w-[470px] object-contain xl:object-cover h-[470px] mx-auto"
        style={{
          maskImage: `url(${CDN2}/img/characterMask.png)`,
          maskSize: "100% 480px",
        }}
      />
      <div className="w-full self-start font-semibold ">
        <div className="grid grid-cols-[1fr_120px] items-center align-top">
          <span className="text-white text-4xl z-10 ml-5 xl:ml-0">
            {character.name}
          </span>
          <span className="text-orange text-right text-3xl pr-5 z-10 self-start">
            {UIDtitles[lang ?? "fr"].levelMin}
            {character.level}
          </span>
        </div>
        <div className="flex gap-1 mt-2 ml-5 xl:ml-0">
          <img
            src={`${CDN}/${character.element.icon}`}
            alt={`character element ${character.element.name}`}
            width={32}
            height={32}
            className="w-8 z-10"
          />
          <img
            src={`${CDN}/${character.path.icon}`}
            alt={`character element ${character.path.name}`}
            width={32}
            height={32}
            className="w-8 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterSplash;
