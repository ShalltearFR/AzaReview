import { CDN } from "@/utils/cdn";
import type { jsonUID } from "@/types/jsonUid";
import { UIDtitles } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";

interface CharacterListProps {
  uidData: jsonUID;
  setIndex: any;
  index: number;
  lang: keyof TranslateSection | undefined;
}

const CharacterList: React.FC<CharacterListProps> = ({
  uidData,
  setIndex,
  index,
  lang,
}) => {
  return (
    <div className="flex flex-col mt-7 xl:flex-row xl:h-36 w-11/12 xl:w-[1350px] py-5 xl:py-0 bg-[#4E4A82] rounded-3xl lg:rounded-full items-center mx-auto shadow-2xl mb-[27px]">
      <img
        className="w-24 h-24 xl:ml-8"
        width={96}
        height={96}
        alt="UID logo"
        src={`${CDN}/${uidData?.player?.avatar?.icon}`}
      />
      <div className="text-center w-48 text-white">
        <p className="text-lg font-medium">{uidData?.player?.nickname}</p>
        <p className="text-sm">
          {UIDtitles[lang ?? "fr"].pioneer}
          {uidData?.player?.level}
        </p>
        <p className="text-sm italic">UID : {uidData?.player?.uid}</p>
      </div>
      <div className="flex flex-wrap ml-20 gap-5 w-full mr-16 mt-5 justify-center px-5">
        {uidData.characters.map((character, i) => {
          return (
            <div
              className={`rounded-full w-20 h-20 overflow-hidden border ${
                index === i ? "bg-orange" : "bg-background"
              }`}
              key={`characterIndex${i}`}
              onClick={() => {
                setIndex(i);
                if (i > 0) {
                  window.history.pushState(
                    {},
                    "",
                    window.location.pathname + `?c=${i}`
                  );
                } else {
                  window.history.pushState({}, "", window.location.pathname);
                }
              }}
            >
              <img src={`${CDN}/${character.icon}`} width={96} height={96} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterList;
