"use client";
import { CDN } from "@/utils/cdn";
import { RelicSet } from "@/types/jsonUid";
import { RelicsSet } from "@/types/CharacterModel";
import { useEffect, useState } from "react";
import relicsSetList from "@/utils/relicsSetList";

interface CharacterRelicsSetProps {
  relics: RelicSet[];
  review: RelicsSet[];
  relicsSetTranslate: Array<any>;
}

interface AsOrnamentState {
  isGood: boolean;
  asAnOrnamant: boolean;
  relicsNumber?: Array<any>;
}

const processRelicSets = (relics: RelicSet[]) => {
  return relics.reduce((accumulator, relicSet) => {
    accumulator[relicSet.id] = relicSet;
    return accumulator;
  }, {} as Record<any, any>);
};

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({
  relics,
  review,
  relicsSetTranslate,
}) => {
  const processedRelicSets = processRelicSets(relics);

  const finalPossessedRelicSets = Object.values(processedRelicSets);
  const [isTooltipRecommended, setIsTooltipRecommended] = useState(false);
  const [isTooltipSet, setIsTooltipSet] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [requiredRelicsSet, setRequiredRelicsSet] = useState<any[]>([]);
  const [colorExclamation, setColorExclamation] = useState<boolean>();
  const [colorRelics, setColorRelics] = useState<string[]>([]);
  const [relics2pAlt, setRelics2pAlt] = useState<any[]>([]);
  const [asOrnament, setAsOrnament] = useState<AsOrnamentState>({
    isGood: true,
    asAnOrnamant: true,
  });

  useEffect(() => {
    const verifyMainStat = () => {
      if (review) {
        const setColors: string[] = finalPossessedRelicSets.map(
          (relicPossessed) => {
            const corresponding = review.find(
              (reviewRelic) =>
                reviewRelic.id === relicPossessed.id &&
                reviewRelic.num === relicPossessed.num
            );
            if (corresponding) {
              return "text-white";
            }
            return "text-red";
          }
        );
        setColorRelics(setColors);

        const ornamentsList = relicsSetList.filter(
          (relicCondition) => relicCondition.isOrnamant === true
        );

        const asGoodOrnament = finalPossessedRelicSets
          .map((relicPossessed) => {
            const corresponding = ornamentsList.some(
              (ornamant) =>
                ornamant.id === relicPossessed.id &&
                review.find(
                  (reviewRelic) => reviewRelic.id === relicPossessed.id
                )
            );
            return corresponding;
          })
          .some((el) => el === true);

        const asAnOrnamant = finalPossessedRelicSets
          .map((relicPossessed) => {
            const corresponding = ornamentsList.some(
              (ornamant) => ornamant.id === relicPossessed.id
            );
            return corresponding;
          })
          .some((el) => el === true);

        const numberOfRelicsEquiped = finalPossessedRelicSets.map(
          (equipedRelic) => equipedRelic.num
        );

        setAsOrnament({
          isGood: asGoodOrnament,
          asAnOrnamant: asAnOrnamant,
          relicsNumber: numberOfRelicsEquiped,
        });

        const reviewRecommended = review.filter(
          (reviewEl) => reviewEl.recommended
        );

        const translateArray = reviewRecommended.map((item) => ({
          ...item,
          ...(relicsSetTranslate.find((obj2) => obj2.id === item.id) || {}),
        }));

        if (setColors.some((el: string) => el === "text-red")) {
          const relics2P = review
            .filter((reviewRelic) => {
              const duplicateRelic = relics.find(
                (singleRelic) => singleRelic.id === reviewRelic.id
              );
              return !duplicateRelic;
            })
            .filter((relic) => relic.num === 2)
            .filter((relic) => relic.recommended === false)
            .map((item) => ({
              ...item,
              ...(relicsSetTranslate.find(
                (translate) => translate.id === item.id
              ) || {}),
            }));

          setRelics2pAlt(relics2P);
        } else {
          setRelics2pAlt([]);
        }

        setRequiredRelicsSet(translateArray);
      } else {
        setColorRelics(["text-white", "text-white", "text-white"]);
        setRelics2pAlt([]);
        setRequiredRelicsSet([]);
      }
    };
    verifyMainStat();

    const processExclamation = () => {
      if (finalPossessedRelicSets.length < 2) {
        setColorExclamation(false);
        return null;
      }
      if (
        finalPossessedRelicSets.length === 2 &&
        finalPossessedRelicSets[0].num + finalPossessedRelicSets[1].num < 6
      ) {
        setColorExclamation(false);
        return null;
      }
      setColorExclamation(true);
    };
    processExclamation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  return (
    <div>
      <div className="relative">
        {requiredRelicsSet.length > 0 && (
          <>
            <div
              className={`absolute right-0 z-10 px-3 py-1 rounded-full text-black font-bold ${
                colorExclamation ? "bg-gray" : "bg-red"
              }`}
              onMouseEnter={() => setIsTooltipRecommended(true)}
              onMouseLeave={() => setIsTooltipRecommended(false)}
            >
              !
              {isTooltipRecommended && (
                <div className="absolute z-20 p-2 bg-background rounded-xl w-60 right-0 xl:right-auto xl:-left-24 top-7 text-white text-sm">
                  <div className="font-bold">Recommandés :</div>
                  {requiredRelicsSet.map((el: any) => (
                    <div className="gap-1 italic font-normal ml-1" key={el.id}>
                      <span className="font-bold">{el.num}P -</span>
                      <span> {el.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <p className="text-yellow text-lg font-bold text-center leading-4 ml-auto">
          Sets équipés
        </p>
      </div>
      <div
        className={`flex w-full text-white text-sm font-bold text-center justify-center gap-[15px] relative`}
      >
        {finalPossessedRelicSets.length > 0 ? (
          <>
            {finalPossessedRelicSets.map((relic, i) => {
              let array = [false, false, false];
              if (i === 0) array = [true, false, false];
              if (i === 1) array = [false, true, false];
              if (i === 2) array = [false, false, true];

              let relicsMap: any[] = [];
              let description = "";

              if (relics2pAlt.length > 0) {
                const ornamantsList = relicsSetList
                  .filter((el) => el.isOrnamant === true)
                  .map((el) => el.id);
                const relicsList = relicsSetList
                  .filter((el) => el.isOrnamant === false)
                  .map((el) => el.id);

                const ornamantsAltList = relics2pAlt.filter((relicAlt: any) =>
                  ornamantsList.includes(relicAlt.id)
                );

                const relicsAltList = relics2pAlt.filter((relicAlt: any) =>
                  relicsList.includes(relicAlt.id)
                );

                if (i === 2) {
                  relicsMap = ornamantsAltList;
                  description = "Ornements possibles :";
                } else if (
                  i === 1 &&
                  asOrnament.relicsNumber &&
                  asOrnament.relicsNumber[0] === 4 &&
                  asOrnament.isGood
                ) {
                  relicsMap = ornamantsAltList;
                  description = "Ornements possibles :";
                } else if (
                  i === 1 &&
                  asOrnament.relicsNumber &&
                  asOrnament.relicsNumber[0] === 4
                ) {
                  relicsMap = ornamantsAltList;
                  description = "Ornements possibles :";
                } else if (
                  i === 0 &&
                  asOrnament.relicsNumber &&
                  asOrnament.relicsNumber[0] === 2 &&
                  asOrnament.asAnOrnamant === true
                ) {
                  relicsMap = ornamantsAltList;
                  description = "Ornements possibles :";
                } else {
                  relicsMap = relicsAltList;
                  description = "Reliques possibles :";
                }
              }

              return (
                <div
                  key={`RelicSet${colorRelics[i]}+${i}`}
                  className="relative w-[135px] mt-5"
                  onMouseEnter={() => setIsTooltipSet(array)}
                  onMouseLeave={() => setIsTooltipSet([false, false, false])}
                >
                  {relicsMap.length > 0 && colorRelics[i] === "text-red" && (
                    <div
                      className={`absolute z-10 p-2 -left-14 top-5 bg-background rounded-xl w-60 text-white flex flex-col ${
                        isTooltipSet[i] ? "block" : "hidden"
                      }`}
                    >
                      <p className="text-left">{description}</p>
                      <ul className="text-left list-outside font-normal">
                        {relicsMap.map((relicAlt: any) => (
                          <li key={relicAlt.id}>
                            <strong>2P -</strong>{" "}
                            <span className="italic">{relicAlt.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <img
                    src={`${CDN}/${relic.icon}`}
                    className="w-[128px] h-[128px]"
                  />
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
          <p className="mt-5">Pas de set équipé</p>
        )}
      </div>
    </div>
  );
};

export default CharacterRelicsSet;
