import CDN from "@/utils/cdn";
import { Character } from "@/utils/jsonUid";
import CharacterEidolon from "./CharacterEidolon";

interface CharacterSplashProps {
  character: Character;
}

const CharacterSplash: React.FC<CharacterSplashProps> = ({ character }) => {
  return (
    <div className="flex flex-col h-[480px] relative overflow-hidden items-center">
      <img
        src={`${CDN}/${character.portrait}`}
        alt=""
        className="absolute xl:top-10 xl:w-[520px] object-cover h-[480px] mx-auto"
        style={{
          maskImage: "url(/img/characterMask.png)",
          maskSize: "100% 480px",
        }}
      />
      <div className="xl:ml-5">
        <div className="grid grid-cols-[1fr_120px] items-end">
          <span className="text-white text-4xl z-10">{character.name}</span>
          <span className="text-orange text-right text-3xl pr-5 z-10">
            Niv. {character.level}
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
      <div className="flex mt-auto w-full h-20 items-center justify-center gap-2 z-10">
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
