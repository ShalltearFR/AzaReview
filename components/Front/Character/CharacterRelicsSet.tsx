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

  const finalPossessedRelicSets = Object.values(processedRelicSets);
  const [isTooltipRecommended, setIsTooltipRecommended] = useState(false);
  const [isTooltipSet, setIsTooltipSet] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [requiredRelicsSet, setRequiredRelicsSet] = useState<any>([]);
  const [colorRelics, setColorRelics] = useState<Array<any>>([]);
  const [relics2pAlt, setRelics2pAlt] = useState<any>(null);

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
        setColorRelics(setColors);

        // Filtre les relics recommandés
        const reviewRecommended = review.filter(
          (reviewEl) => reviewEl.recommended
        );

        // Ajoute le nom traduit des relics
        const translateArray = reviewRecommended.map((item) => ({
          ...item,
          ...(relicsSetTranslate.find((obj2) => obj2.id === item.id) || {}),
        }));

        if (setColors.some((el: any) => el === "text-red")) {
          // Si un set n'est pas bon
          const relics2P = review
            .filter((reviewRelic) => {
              // Filtre les relics equipés
              const duplicateRelic = relics.find(
                (singleRelic) => singleRelic.id === reviewRelic.id
              );
              return !duplicateRelic;
            })
            .filter((relic) => relic.num === 2) // Filtre toutes les relics 2p en non recommandés
            .filter((relic) => relic.ornament === false) // Filtre les reliques
            .map((item) => ({
              // Ajoute la traduction dans la relique
              ...item,
              ...(relicsSetTranslate.find(
                (translate) => translate.id === item.id
              ) || {}),
            }));
          setRelics2pAlt(relics2P);
        } else {
          setRelics2pAlt(null);
        }

        setRequiredRelicsSet(translateArray);
      } else {
        setColorRelics(["text-white", "text-white", "text-white"]);
        setRelics2pAlt(null);
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
              onMouseEnter={() => setIsTooltipRecommended(true)}
              onMouseLeave={() => setIsTooltipRecommended(false)}
            >
              !
              {isTooltipRecommended && (
                <div className="absolute z-10 p-2 bg-background rounded-xl w-60 -left-24 top-7 text-white text-sm">
                  <div className="font-bold">Recommandés :</div>
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
            </p>
          </>
        )}

        <p
          className="text-yellow text-lg font-bold text-center leading-4 ml-auto"
          onMouseEnter={() => setIsTooltipSet([false, false, false])}
        >
          Sets equipés
        </p>
      </div>
      <div
        className={`flex w-full text-white text-sm font-bold text-center justify-center gap-[15px] relative`}
      >
        {finalPossessedRelicSets.length !== 0 ? (
          <>
            {finalPossessedRelicSets.map((relic, i) => {
              let array = [false, false, false];
              if (i === 0) array = [true, false, false];
              if (i === 1) array = [false, true, false];
              if (i === 2) array = [false, false, true];

              return (
                <div
                  key={crypto.randomUUID()}
                  className="relative w-[135px] mt-5"
                >
                  {relics2pAlt &&
                    isTooltipSet[i] &&
                    colorRelics[i] === "text-red" && (
                      <div className="absolute z-10 p-2 -left-14 top-5 bg-background rounded-xl w-60 text-white flex flex-col">
                        <p>Reliques possibles :</p>
                        <ul className="text-left list-outside font-normal">
                          {relics2pAlt.map((relic: any) => (
                            <li key={crypto.randomUUID()}>
                              <strong>2P -</strong>{" "}
                              <span className="italic">{relic.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <img
                    src={`${CDN}/${relic.icon}`}
                    onMouseEnter={() => setIsTooltipSet(array)}
                    onMouseLeave={() => setIsTooltipSet([false, false, false])}
                  />
                  <span
                    className={`absolute top-0 left-0 p-1 bg-background/75 rounded-full ${colorRelics[i]}`}
                  >
                    {relic.num}P
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 p-1 w-full bg-background/75 rounded-full text-xs ${colorRelics[i]}`}
                    onMouseEnter={() => setIsTooltipSet([false, false, false])}
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
