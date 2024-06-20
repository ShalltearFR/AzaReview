import { CDN, CDN2 } from "@/utils/cdn";
import { Relic } from "@/types/jsonUid";
import { MainStats, RecommendedStats } from "@/types/CharacterModel";
import calculateRelic from "@/utils/calculateRelic";
import { useState, useEffect } from "react";
import { typeValueMap, typeValueMapEN } from "@/utils/typeValueMap";
import { UIDtitles } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";

interface CharacterRelicProps {
  stats: Relic;
  reviewRecommanded: RecommendedStats[] | undefined;
  reviewMainStat: MainStats[] | undefined;
  equipmentIndex: number;
  statsTranslate: Array<any>;
  totalCoef: number;
  lang: keyof TranslateSection | undefined;
}

const CharacterRelic: React.FC<CharacterRelicProps> = ({
  stats,
  reviewRecommanded,
  reviewMainStat,
  equipmentIndex,
  statsTranslate,
  lang,
}) => {
  const { rarity, level, icon, main_affix, sub_affix } = stats;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [requiredMainStat, setRequiredMainStat] = useState<any[]>([]);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [relicNotation, setRelicNotation] = useState<string>("");
  const [isGood, setIsGood] = useState<boolean>(false);

  const goodRelic = ["SSS", "SS+", "SS", "S+", "S"];
  const okRelic = ["A+", "A"];
  const badRelic = ["B+", "B", "C+", "C", "D+", "D"];

  useEffect(() => {
    let equipment: string = "";

    switch (equipmentIndex) {
      case 2:
        equipment = "body";
        break;
      case 3:
        equipment = "feet";
        break;
      case 4:
        equipment = "planar_sphere";
        break;
      case 5:
        equipment = "link_rope";
        break;
    }
    const verifMainStat = () => {
      if (reviewMainStat) {
        const recommendedObject =
          reviewMainStat.filter((el) => el.piece === equipment) || [];

        const recommendedTranslate = recommendedObject.map((item) => {
          const correspondingTranslate = statsTranslate.find(
            (translateItem) => translateItem.type === item.type
          );

          if (correspondingTranslate) {
            return { ...item, name: correspondingTranslate.name };
          }
          return item;
        });
        const isGood = recommendedObject.some(
          (objet) => objet.type === main_affix.type
        );

        const MainStatArray = recommendedTranslate.map((el: any) => {
          let name;
          if (typeValueMap[el.type] && (lang === "fr" || lang === undefined))
            name = typeValueMap[el.type];
          else if (typeValueMapEN[el.type] && lang === "en")
            name = typeValueMapEN[el.type];
          else {
            let reviewType = reviewMainStat.find(
              (translateItem) => translateItem.type === el.type
            );
            name = statsTranslate.find(
              (stat) => stat.type === reviewType?.type
            );
            name = name?.name || "";
          }
          return {
            name: name,
          };
        });
        setRequiredMainStat(MainStatArray);
        setIsGood(isGood);
        return null;
      }
      setIsGood(true);
    };

    const recommandedMainAffix =
      reviewRecommanded?.find((el) => el.type === main_affix.type)
        ?.importance || 0;

    if (Array.isArray(reviewRecommanded) && reviewRecommanded.length > 0) {
      const value = calculateRelic(
        reviewRecommanded,
        sub_affix,
        recommandedMainAffix
      );
      setRelicNotation(value);
    }

    verifMainStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    let displayVal;
    if (lang === "fr" || lang === undefined)
      displayVal = typeValueMap[main_affix.type] || main_affix.name;
    else displayVal = typeValueMapEN[main_affix.type] || main_affix.name;
    setDisplayValue(displayVal);
  }, [lang, main_affix.name, main_affix.type]);

  if (displayValue === "") {
    return <div>Chargement...</div>;
  }

  return (
    <div
      className="grid grid-cols-[125px_1fr] w-full bg-black/50 text-white font-bold px-5 py-1"
      style={
        window.innerWidth >= 1350
          ? {
              maskImage: `url(${CDN2}/img/relicMask.png)`,
              maskSize: "100% 100%",
            }
          : {}
      }
    >
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className={`text-sm text-center relative my-auto${
          equipmentIndex >= 2 && !isGood ? " text-red" : ""
        }`}
      >
        {isTooltipVisible &&
          requiredMainStat.length > 0 &&
          equipmentIndex >= 2 && (
            <div className="absolute z-10 p-2 bg-background rounded-xl w-auto text-white text-left">
              <div className="font-bold">
                {UIDtitles[lang ?? "fr"].Recommended}
              </div>
              {requiredMainStat.map((el: any, i: number) => (
                <div
                  className="italic font-normal"
                  key={`mainStat+${el.name}+${i}`}
                >
                  - {el.name}
                </div>
              ))}
            </div>
          )}

        <img
          src={`${CDN}/${icon}`}
          alt={displayValue}
          className="mx-auto"
          width={80}
          height={80}
        />
        <p>{displayValue}</p>
        <p>{main_affix.display}</p>
        <p
          className={`absolute top-0 right-5 py-1 px-2 rounded-full text-xs ${
            level < 15 ? "text-red bg-background" : "text-white bg-gray"
          }`}
        >{`+${level}`}</p>
      </div>
      <div className="flex flex-col relative w-full h-full justify-center text-white">
        <div className="absolute flex right-20 min-w-[87px] text-gray/50 text-[62px] -mt-3">
          {goodRelic.includes(relicNotation) && (
            <span className="text-darkGreen/50">{relicNotation}</span>
          )}
          {okRelic.includes(relicNotation) && (
            <span className="text-blue/50">{relicNotation}</span>
          )}
          {badRelic.includes(relicNotation) && (
            <span className="text-red/35">{relicNotation}</span>
          )}
        </div>
        {sub_affix.map((affix, i) => {
          let subDisplayValue;
          if (lang === "fr" || lang === undefined)
            subDisplayValue = typeValueMap[affix.type] || affix.name;
          else subDisplayValue = affix.name;

          return (
            <div
              key={`characterRelic${affix.type}${i}`}
              className="grid grid-cols-[32px_1fr_50px_20px] items-center z-[1]"
            >
              <img
                src={`${CDN}/${affix.icon}`}
                alt={`Piece N°${equipmentIndex}`}
                width={28}
                height={28}
              />
              <span>{subDisplayValue}</span>
              <span className="text-right mr-2">{affix.display}</span>
              <span className="bg-green rounded-full text-center text-black">
                {affix.count - 1 > 0 && affix.count - 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterRelic;
