import { CDN, CDN2 } from "@/utils/cdn";
import { Character } from "@/types/jsonUid";
import CharacterEidolon from "./CharacterEidolon";
import { UIDtitles } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";

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
    <div className="flex flex-col h-[480px] relative items-center">
      <img
        height={480}
        width={"100%"}
        src={`${CDN}/${character.portrait}`}
        alt=""
        className="absolute xl:top-10 xl:w-[520px] object-contain h-[480px] mx-auto"
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
            className="w-8 z-10"
            alt="element"
          />
          <img
            src={`${CDN}/${character.path.icon}`}
            className="w-8 z-10"
            alt="path"
          />
        </div>
      </div>
      <div className="flex mt-auto w-full h-20 items-center justify-center gap-2">
        {character.rank_icons.map((eidolon, i) => {
          const eidolonId = eidolonsList.find(
            (el) => el.id === `${character.id}0${i + 1}`
          );

          return (
            <div key={`${character.id}+${i}`}>
              <CharacterEidolon
                img={eidolon}
                isActive={character.rank > i ? true : false}
                eidolon={eidolonId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSplash;
