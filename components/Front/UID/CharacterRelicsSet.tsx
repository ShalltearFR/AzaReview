import { CDN } from "@/utils/cdn";
import { RelicSet } from "@/types/jsonUid";
import { RelicsSet } from "@/types/CharacterModel";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface CharacterRelicsSetProps {
  characterid: string;
  relics: RelicSet[] | "none";
  review: RelicsSet[] | undefined;
  relicsSetTranslate: Array<any>;
  showRedstats: boolean;
  showInformations: boolean;
}

interface RelicInfos {
  icon: string;
  name: string;
  num: number;
  id: number;
  goodRelic?: boolean;
}

interface GoodRelics {
  relics: RelicInfos[];
  ornaments: RelicInfos[];
}

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({
  characterid,
  relics,
  review,
  relicsSetTranslate,
  showRedstats,
  showInformations,
}) => {
  const reduceText = (text: string) =>
    text.length > 32 ? `${text.substring(0, 32)}...` : text;

  const getRecommandedRelics = () => {
    if (!review) return [];

    const recommendedList = review.filter(
      (reviewRelic) => reviewRelic.recommended
    );

    return recommendedList.map((el) => {
      const fusionObjet = relicsSetTranslate.find((relicSet) => {
        return el.id === relicSet.id;
      });

      return {
        id: Number(fusionObjet?.id),
        num: el?.num,
        name: fusionObjet?.name,
        icon: fusionObjet?.icon,
      };
    });
  };

  const getRelicInfos = (relics: RelicSet[] | "none", bypass?: boolean) => {
    if (relics === "none") return [];

    if (bypass) {
      return relics
        .map((relicSet) => {
          return {
            icon: relicSet.icon,
            name: reduceText(relicSet.name),
            num: relicSet.num,
            id: Number(relicSet.id),
            goodRelic: true,
          };
        })
        .reduce((acc: RelicInfos[], relic: RelicInfos) => {
          // Retire le doublon 2P si le 4P existe
          const existingRelic = acc.find((r) => r.id === relic.id);

          if (!existingRelic) {
            acc.push(relic);
          } else if (relic.num === 4 && existingRelic.num === 2) {
            const index = acc.indexOf(existingRelic);
            acc[index] = relic;
          }

          return acc;
        }, []);
    }
    if (review) {
      const filteredRelics: RelicInfos[] = relics
        .map((relicSet) => {
          const corresponding = review.find(
            (reviewRelic) =>
              reviewRelic.id === relicSet.id && reviewRelic.num === relicSet.num
          );
          return {
            icon: relicSet.icon,
            name: reduceText(relicSet.name),
            num: relicSet.num,
            id: Number(relicSet.id),
            goodRelic: corresponding ? true : false,
          };
        })
        .reduce((acc: RelicInfos[], relic: RelicInfos) => {
          // Retire le doublon 2P si le 4P existe
          const existingRelic = acc.find((r) => r.id === relic.id);

          if (!existingRelic) {
            acc.push(relic);
          } else if (relic.num === 4 && existingRelic.num === 2) {
            const index = acc.indexOf(existingRelic);
            acc[index] = relic;
          }

          return acc;
        }, []);

      const totalNum = filteredRelics.reduce(
        (acc, relic) => acc + relic.num,
        0
      );

      // Si 6 relics sont équipés ou si tous les goodRelic sont false, on désactive l'exclamation
      if (totalNum < 6 || filteredRelics.every((relic) => !relic.goodRelic))
        setRecommendedExclamation(true);
      else setRecommendedExclamation(false);

      return filteredRelics;
    }

    return [];
  };

  const getSeparatedRelicsList = () => {
    if (!review) return { relics: [], ornaments: [] };

    const { relics, ornaments } = review.reduce(
      (acc, reviewRelic) => {
        const translated = relicsSetTranslate.find(
          (relicSet) => relicSet.id === reviewRelic.id
        );

        const relicData = {
          id: Number(reviewRelic.id),
          num: reviewRelic.num,
          name: reduceText(translated?.name),
          icon: translated?.icon,
        };

        if (Number(reviewRelic.id) < 300) {
          acc.relics.push(relicData);
        } else if (Number(reviewRelic.id) > 300) {
          acc.ornaments.push(relicData);
        }

        return acc;
      },
      { relics: [], ornaments: [] } as {
        relics: RelicInfos[];
        ornaments: RelicInfos[];
      }
    );
    return { relics, ornaments };
  };

  const [isTooltipRecommended, setIsTooltipRecommended] = useState(false);
  const [isTooltipSet, setIsTooltipSet] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [relicsInfos, setRelicsInfos] = useState<RelicInfos[] | "none">([]);
  const [relicsRecomended, setRelicsRecommended] = useState<RelicInfos[] | []>(
    []
  );

  const [goodRelics, setGoodRelics] = useState<GoodRelics>({
    relics: [],
    ornaments: [],
  });

  const [recommendedExclamation, setRecommendedExclamation] =
    useState<boolean>(false);

  useEffect(() => {
    const relicsListRecommended = getRecommandedRelics();
    setRelicsRecommended(relicsListRecommended);
    setIsTooltipSet(Array(relics.length).fill(false));
    setIsTooltipRecommended(false);

    if (!review) {
      // Si aucun review n'est passé => Initialise les relics et les affiche
      const relicsList = getRelicInfos(relics, true);
      setRelicsInfos(relicsList);
      setGoodRelics({ relics: [], ornaments: [] });
      setRecommendedExclamation(false);
      return;
    }
    const relicsList = getRelicInfos(relics);
    const separatedRelicsList = getSeparatedRelicsList();

    setRelicsInfos(relicsList);
    setGoodRelics(separatedRelicsList);
  }, [relics, review]);

  return (
    <div>
      <div className="relative">
        {relicsInfos !== "none" && (
          <button
            className="absolute right-0 top-0 z-10"
            onMouseEnter={() => setIsTooltipRecommended(true)}
            onMouseLeave={() => setIsTooltipRecommended(false)}
          >
            {showInformations && (
              <>
                {review && (
                  <InformationCircleIcon
                    className={`size-9 absolute top-0 right-0 rounded-full ${
                      recommendedExclamation ? "fill-red" : "fill-gray"
                    }`}
                  />
                )}
                {isTooltipRecommended && (
                  <div
                    className={`absolute z-20 p-2 bg-background border border-orange rounded-xl xl:-top-44 xl:h-44 right-8 w-60 text-white text-sm ${
                      relicsRecomended.length === 3
                        ? "xl:w-[476px] xl:-left-64 -top-44"
                        : "xl:w-80 xl:-left-44 -top-32"
                    }`}
                  >
                    <div className="font-bold z-10 flex">Recommandés</div>
                    <div className="xl:flex gap-2 w-full xl:h-[140px]">
                      {relicsRecomended.map((el) => (
                        <div
                          className="italic font-normal h-full flex flex-col w-full"
                          key={`relicsRecommended${el.id}+${el.num}${characterid}`}
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
          Sets équipés
        </p>
      </div>
      <div className="flex w-full text-white text-sm font-bold text-center justify-center gap-[15px] relative">
        {relicsInfos !== "none" ? (
          relicsInfos.map((relic, i) => {
            const tooltipArray = [false, false, false];
            tooltipArray[i] = true;
            return (
              <div
                key={`relicsInfos${relic.id}+${relic.num}+${i}+${characterid}`}
                className="relative w-[135px] mt-5"
                onMouseEnter={() => setIsTooltipSet(tooltipArray)}
                onMouseLeave={() => setIsTooltipSet([false, false, false])}
              >
                {!relic.goodRelic && (
                  <div
                    className={`absolute z-10 p-2 -left-14 top-5 bg-background border border-orange rounded-xl w-60 text-white flex flex-col ${
                      isTooltipSet[i] ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-left text-lg">
                      {Number(relic.id) > 300
                        ? "Ornements possibles"
                        : "Reliques possibles"}
                    </p>
                    <ul className="text-left list-outside font-normal">
                      {(Number(relic.id) > 300
                        ? goodRelics.ornaments
                        : goodRelics.relics
                      ).map((relicAlt, i) => (
                        <li
                          key={`goodRelics${relicAlt.id}+${relicAlt.num}+${i}+${characterid}`}
                        >
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
                    showRedstats && !relicsInfos[i].goodRelic && "text-red"
                  }`}
                >
                  {relic.num}P
                </span>
                <span
                  className={`absolute bottom-0 left-0 p-1 w-full bg-background/75 rounded-full text-xs ${
                    showRedstats && !relicsInfos[i].goodRelic && "text-red"
                  }`}
                >
                  {relic.name}
                </span>
              </div>
            );
          })
        ) : (
          <p className="mt-5">Pas de set équipé</p>
        )}
      </div>
    </div>
  );
};

export default CharacterRelicsSet;
