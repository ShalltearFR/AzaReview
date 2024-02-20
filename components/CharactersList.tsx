import cdn from "@/utils/cdn";
import type { jsonUID } from "@/utils/jsonUid";

interface CharacterListProps {
  uidData: jsonUID;
  setIndex: any;
  index: number;
}

const CharacterList: React.FC<CharacterListProps> = ({
  uidData,
  setIndex,
  index,
}) => {
  return (
    <article className="flex flex-col xl:flex-row xl:h-36 w-11/12 xl:w-[1350px] py-5 xl:py-0 bg-[#4E4A82] rounded-3xl md:rounded-full items-center mx-auto shadow-2xl">
      <img
        className="w-24 h-24 xl:ml-8"
        alt="UID logo"
        src={`${cdn}/${uidData.player.avatar.icon}`}
      />
      <div className="text-center w-48 text-white">
        <p className="text-lg font-medium">{uidData.player.nickname}</p>
        <p className="text-sm">Pionnier {uidData.player.level}</p>
        <p className="text-sm italic">UID : {uidData.player.uid}</p>
      </div>
      <div className="flex flex-wrap ml-20 gap-5 w-full mr-16 mt-5 justify-center px-5">
        {uidData.characters.map((character, i) => {
          return (
            <div
              className={`rounded-full w-20 h-20 overflow-hidden border ${
                index === i ? "bg-orange" : "bg-background"
              }`}
              onClick={() => setIndex(i)}
              key={crypto.randomUUID()}
            >
              <img alt="" src={`${cdn}/${character.icon}`} />
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default CharacterList;
