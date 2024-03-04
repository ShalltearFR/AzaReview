"use client";
import { CDN } from "@/utils/cdn";
import { RelicSet } from "@/types/jsonUid";
import { RelicsSet } from "@/types/CharacterModel";
import { useEffect, useState } from "react";

interface CharacterRelicsSetProps {
  relics: RelicSet[];
  review: RelicsSet[];
  relicsSetTranslate: Array<any>;
}

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({
  relics,
  review,
  relicsSetTranslate,
}) => {
  const processedRelicSets = relics.reduce((accumulator, relicSet) => {
    accumulator[relicSet.id] = relicSet;
    return accumulator;
  }, {} as Record<string, RelicSet>);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const finalPossessedRelicSets = Object.values(processedRelicSets);
  const [requiredRelicsSet, setRequiredRelicsSet] = useState<any>([]);
  const [colorRelics, setColorRelics] = useState<Array<any>>([]);

  useEffect(() => {
    const verifMainStat = () => {
      if (review) {
        // Parcours chaques elements et verifie si au moins un set de relique equipé = à au moins un set de recommandés
        const setColors: any = finalPossessedRelicSets.map((relicPossessed) => {
          const corresponding = review.find(
            (reviewRelic) =>
              reviewRelic.id === relicPossessed.id &&
              reviewRelic.num === relicPossessed.num
          );
          if (corresponding) {
            return "text-white";
          }
          // Si aucune correspondance n'est trouvée, retourne l'objet reviewMainStat sans modification
          return "text-red";
        });
        console.log("setColors", setColors);
        setColorRelics(setColors);

        const reviewRecommended = review.filter(
          (reviewEl) => reviewEl.recommended
        );

        const combinedArray = reviewRecommended.map((item) => ({
          ...item,
          ...(relicsSetTranslate.find((obj2) => obj2.id === item.id) || {}),
        }));

        console.log("combinedArray", combinedArray);
        setRequiredRelicsSet(combinedArray);
      } else {
        setColorRelics(["text-white", "text-white", "text-white"]);
        setRequiredRelicsSet(false);
      }
    };
    verifMainStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  return (
    <div>
      <div className="relative">
        {requiredRelicsSet && (
          <>
            <p
              className="absolute right-0 px-3 py-1 bg-gray rounded-full text-black font-bold"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              !
            </p>
            {isTooltipVisible && (
              <div className="absolute z-10 p-2 bg-background rounded-xl w-auto text-white">
                <div className="font-bold">Recommandé :</div>
                {requiredRelicsSet?.map((el: any) => (
                  <div
                    className="flex gap-1 italic font-normal"
                    key={crypto.randomUUID()}
                  >
                    <span className="font-bold">{el.num}P -</span>
                    <span> {el.name}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <p className="text-yellow text-lg font-bold text-center leading-4 ml-auto">
          Sets equipés
        </p>
      </div>
      <div
        className={`flex w-full text-white mt-5 text-sm font-bold text-center justify-center gap-[15px]`}
      >
        {finalPossessedRelicSets.length !== 0 ? (
          <>
            {finalPossessedRelicSets.map((relic, i) => {
              return (
                <div className="relative w-[135px]" key={crypto.randomUUID()}>
                  <img src={`${CDN}/${relic.icon}`} />
                  <span
                    className={`absolute top-0 left-0 p-1 bg-background/75 rounded-full ${colorRelics[i]}`}
                  >
                    {relic.num}P
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 p-1 w-full bg-background/75 rounded-full text-xs ${colorRelics[i]}`}
                  >
                    {relic.name}
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <p>Pas de set équipé</p>
        )}
      </div>
    </div>
  );
};

export default CharacterRelicsSet;
