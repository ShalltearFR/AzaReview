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
    <article className="flex h-36 w-[1350px] bg-[#4E4A82] rounded-full items-center mx-auto shadow-xl">
      <img
        className="w-24 h-24 ml-8"
        alt="UID logo"
        src={`${cdn}/${uidData.player.avatar.icon}`}
      />
      <div className="text-center w-48 text-white">
        <p className="text-lg font-medium">{uidData.player.nickname}</p>
        <p className="text-sm">Pionnier {uidData.player.level}</p>
        <p className="text-sm italic">UID : {uidData.player.uid}</p>
      </div>
      <div className="flex ml-20 gap-5 w-full mr-16 justify-center">
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
