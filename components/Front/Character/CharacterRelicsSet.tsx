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
  const [isTooltipSet, setIsTooltipSet] = useState<boolean>(false);
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
            </p>
            {isTooltipRecommended && (
              <div className="absolute z-10 p-2 bg-background rounded-xl w-auto text-white">
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
          </>
        )}

        <p className="text-yellow text-lg font-bold text-center leading-4 ml-auto">
          Sets equipés
        </p>
      </div>
      <div
        className={`flex w-full text-white mt-5 text-sm font-bold text-center justify-center gap-[15px] relative`}
        onMouseEnter={() => setIsTooltipSet(true)}
        onMouseLeave={() => setIsTooltipSet(false)}
      >
        {relics2pAlt && isTooltipSet && (
          <div className="absolute z-10 p-2 bottom-0 bg-background rounded-xl w-60 text-white flex flex-col">
            <p>Reliques/Ornements possibles :</p>
            <ul className="text-left list-outside font-normal">
              {relics2pAlt.map((relic: any) => (
                <li key={crypto.randomUUID()}>- {relic.name}</li>
              ))}
            </ul>
          </div>
        )}
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
