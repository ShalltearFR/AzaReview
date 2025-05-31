"use client";
import { CDN } from "@/utils/cdn";
import type { jsonUID } from "@/types/jsonUid";
import { useEffect, useState } from "react";

interface CharacterListProps {
  uidData: jsonUID;
  setIndex: any;
  index: number;
  charactersReview: any;
  characterID: string;
}

const CharacterList: React.FC<CharacterListProps> = ({
  uidData,
  setIndex,
  index = 0,
  charactersReview,
  characterID,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const review = charactersReview.find(
      (character: any) => character.id === characterID
    );

    if (review) setDate(new Date(review.updatedAt));
    else setDate(undefined);
  }, [index]);

  return (
    <div className="py-5 xl:py-0 mb-[27px]">
      <div className="flex flex-col mt-7 xl:flex-row xl:h-36 w-11/12 xl:w-[1350px] z-10 bg-[#4E4A82] rounded-3xl lg:rounded-full items-center mx-auto shadow-md shadow-black pb-3 xl:pb-0">
        <img
          className="w-24 h-24 xl:ml-8"
          width={96}
          height={96}
          alt="UID logo"
          src={`${CDN}/${uidData?.player?.avatar?.icon}`}
        />
        <div className="text-center w-48 text-white">
          <p className="text-lg font-medium">{uidData?.player?.nickname}</p>
          <p className="text-sm">Pionnier {uidData?.player?.level}</p>
          <p className="text-sm italic">UID : {uidData?.player?.uid}</p>
        </div>
        <div className="flex flex-wrap ml-20 gap-5 w- mr-16 mt-5 justify-center px-5">
          {uidData.characters.map((character, i) => {
            return (
              <button
                className={`rounded-full w-20 h-20 overflow-hidden border ${
                  index === i ? "bg-orange" : "bg-background"
                }`}
                key={`characterIndex${i}`}
                onClick={() => setIndex(i)}
              >
                <img src={`${CDN}/${character.icon}`} width={96} height={96} />
              </button>
            );
          })}
        </div>
      </div>
      {date && (
        <p className="text-center bg-[#4E4A82] rounded-b-3xl w-64 mx-auto text-sm font-semibold text-white -mt-[1px] pb-1 shadow-[0px_4px_4px_rgba(0,0,0,0.5)] shadow-black">
          Dernière mise à jour : {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default CharacterList;
