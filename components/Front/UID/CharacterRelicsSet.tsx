import { CDN } from "@/utils/cdn";
import { RelicSet } from "@/types/jsonUid";
import { RelicsSet } from "@/types/CharacterModel";
import { useEffect, useMemo, useState } from "react";
import { UIDtitles } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface CharacterRelicsSetProps {
  relics: RelicSet[];
  review: RelicsSet[];
  relicsSetTranslate: Array<any>;
  lang: keyof TranslateSection | undefined;
  showRedstats: boolean;
  showInformations: boolean;
}

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({
  relics,
  review,
  relicsSetTranslate,
  lang,
  showRedstats,
  showInformations,
}) => {
  const processedRelicSets = useMemo(() => {
    return relics.reduce((accumulator, relicSet) => {
      accumulator[relicSet.id] = relicSet;
      return accumulator;
    }, {} as Record<any, any>);
  }, [relics]);

  const finalPossessedRelicSets = Object.values(processedRelicSets);
  const [isTooltipRecommended, setIsTooltipRecommended] = useState(false);
  const [isTooltipSet, setIsTooltipSet] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [requiredRelicsSet, setRequiredRelicsSet] = useState<any[]>([]);
  const [colorExclamation, setColorExclamation] = useState<boolean>(true);
  const [colorRelics, setColorRelics] = useState<string[]>([]);
  const [relics2pAlt, setRelics2pAlt] = useState<any[]>([]);

  useEffect(() => {
    if (!review) {
      setColorRelics(Array(finalPossessedRelicSets.length).fill("text-white"));
      setRelics2pAlt([]);
      setRequiredRelicsSet([]);
      return;
    }

    const setColors = finalPossessedRelicSets.map((relicPossessed) => {
      const corresponding = review.find(
        (reviewRelic) =>
          reviewRelic.id === relicPossessed.id &&
          reviewRelic.num === relicPossessed.num
      );
      return corresponding ? "text-white" : "text-red";
    });

    setColorRelics(setColors);

    const reviewRecommended = review.filter((item) => item.recommended);
    const translateArray = reviewRecommended.map((item) => ({
      ...item,
      ...(relicsSetTranslate.find((obj2) => obj2.id === item.id) || {}),
    }));

    const hasRed = setColors.some((el) => el === "text-red");

    const relics2P = hasRed
      ? review
          .filter(
            (reviewRelic) =>
              !relics.some(
                (singleRelic) =>
                  singleRelic.id === reviewRelic.id &&
                  reviewRelic.num === 2 &&
                  !reviewRelic.recommended
              )
          )
          .map((item) => ({
            ...item,
            ...(relicsSetTranslate.find(
              (translate) => translate.id === item.id
            ) || {}),
          }))
      : [];

    setRelics2pAlt(relics2P);
    setRequiredRelicsSet(translateArray);
  }, [relics, review]);

  useEffect(() => {
    const relicCount = finalPossessedRelicSets.length;

    if (
      relicCount < 2 ||
      (relicCount === 2 &&
        finalPossessedRelicSets[0].num + finalPossessedRelicSets[1].num < 6)
    ) {
      setColorExclamation(false);
    } else {
      setColorExclamation(true);
    }
  }, [finalPossessedRelicSets]);

  const reduceText = (text: string) =>
    text.length > 32 ? `${text.substring(0, 32)}...` : text;

  const ornamantsAltList = relics2pAlt.filter(
    (relicAlt: any) => Number(relicAlt.id) > 300
  );

  return (
    <div>
      <div className="relative">
        {requiredRelicsSet.length > 0 && (
          <button
            className="absolute right-0 top-0 z-10"
            onMouseEnter={() => setIsTooltipRecommended(true)}
            onMouseLeave={() => setIsTooltipRecommended(false)}
          >
            {showInformations && (
              <>
                <InformationCircleIcon
                  className={`size-9 absolute top-0 right-0 rounded-full ${
                    colorExclamation ? "fill-gray" : "fill-red"
                  }`}
                />
                {isTooltipRecommended && (
                  <div
                    className={`absolute z-20 p-2 bg-background border border-orange rounded-xl xl:-top-44 xl:h-44 right-8 w-60 text-white text-sm ${
                      requiredRelicsSet[2]
                        ? "xl:w-[476px] xl:-left-52 -top-52"
                        : "xl:w-80 xl:-left-36 -top-36"
                    }`}
                  >
                    <div className="font-bold z-10 flex">
                      {UIDtitles[lang ?? "fr"].Recommendeds}
                    </div>
                    <div className="xl:flex gap-2 w-full xl:h-[140px]">
                      {requiredRelicsSet.map((el: any) => (
                        <div
                          className="italic font-normal h-full flex flex-col w-full"
                          key={el.id}
                        >
                          <p>
                            <span className="font-bold">{el.num}P</span>
                            <span> - {reduceText(el.name)}</span>
                          </p>
                          <img
                            src={`${CDN}/${el.icon}`}
                            alt={el.name}
                            className="h-24 w-24 mx-auto mt-auto"
                            width={96}
                            height={96}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </button>
        )}

        <p className="text-yellow text-lg font-bold text-center leading-4 ml-auto">
          {UIDtitles[lang ?? "fr"].relicsSet}
        </p>
      </div>
      <div className="flex w-full text-white text-sm font-bold text-center justify-center gap-[15px] relative">
        {finalPossessedRelicSets.length > 0 ? (
          finalPossessedRelicSets.map((relic, i) => {
            const tooltipArray = [false, false, false];
            tooltipArray[i] = true;

            return (
              <div
                key={`RelicSet${colorRelics[i]}+${i}`}
                className="relative w-[135px] mt-5"
                onMouseEnter={() => setIsTooltipSet(tooltipArray)}
                onMouseLeave={() => setIsTooltipSet([false, false, false])}
              >
                {colorRelics[i] === "text-red" && (
                  <div
                    className={`absolute z-10 p-2 -left-14 top-5 bg-background rounded-xl w-60 text-white flex flex-col ${
                      isTooltipSet[i] ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-left">
                      {Number(relic.id) > 300
                        ? UIDtitles[lang ?? "fr"].PossibleOrnaments
                        : UIDtitles[lang ?? "fr"].PossibleRelics}
                    </p>
                    <ul className="text-left list-outside font-normal">
                      {(Number(relic.id) > 300
                        ? ornamantsAltList
                        : relics2pAlt
                      ).map((relicAlt: any) => (
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
                  alt={relic.name}
                  className="w-[128px] h-[128px]"
                  width={128}
                  height={128}
                />
                <span
                  className={`absolute top-0 left-0 p-1 bg-background/75 rounded-full ${
                    showRedstats && colorRelics[i]
                  }`}
                >
                  {relic.num}P
                </span>
                <span
                  className={`absolute bottom-0 left-0 p-1 w-full bg-background/75 rounded-full text-xs ${
                    showRedstats && colorRelics[i]
                  }`}
                >
                  {relic.name}
                </span>
              </div>
            );
          })
        ) : (
          <p className="mt-5">{UIDtitles[lang ?? "fr"].emptyRelicSet}</p>
        )}
      </div>
    </div>
  );
};

export default CharacterRelicsSet;
