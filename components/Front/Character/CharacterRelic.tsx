"use client";
import { CDN, CDN2 } from "@/utils/cdn";
import { Relic } from "@/types/jsonUid";
import { MainStats, RecommendedStats } from "@/types/CharacterModel";
import calculateRelic from "@/utils/calculateRelic";
import { useEffect, useRef, useState } from "react";

interface CharacterRelicProps {
  stats: Relic;
  reviewRecommanded: RecommendedStats[] | undefined;
  reviewMainStat: MainStats[] | undefined;
  equipmentIndex: number;
  statsTranslate: Array<any>;
  totalCoef: number;
}

const typeValueMap: any = {
  PhysicalAddedRatio: "DGT Physique",
  QuantumAddedRatio: "DGT Quantique",
  ImaginaryAddedRatio: "DGT Imaginaire",
  WindAddedRatio: "DGT Vent",
  LightningAddedRatio: "DGT Foudre",
  FireAddedRatio: "DGT Feu",
  IceAddedRatio: "DGT Glace",
  SPRatioBase: "Régén. d'énergie",
  StatusProbabilityBase: "App. des effets",
  CriticalChanceBase: "Chances Crit.",
  CriticalDamageBase: "DGT Crit.",
  HealRatioBase: "Augm. des soins",
};

const CharacterRelic: React.FC<CharacterRelicProps> = ({
  stats,
  reviewRecommanded,
  reviewMainStat,
  equipmentIndex,
  statsTranslate,
  totalCoef,
}) => {
  const { rarity, level, icon, main_affix, sub_affix } = stats;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  let requiredMainStat: any = [];
  let displayValue: string = "";
  let relicNotation: string = "";

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

      requiredMainStat = recommendedTranslate;
      return isGood;
    }
    return true;
  };

  displayValue = typeValueMap[main_affix.type] || main_affix.name;
  if (Array.isArray(reviewRecommanded) && reviewRecommanded.length > 0) {
    const value = calculateRelic(reviewRecommanded, sub_affix, totalCoef);
    relicNotation = value;
  }

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
          equipmentIndex >= 2 && !verifMainStat() ? " text-red" : ""
        }`}
      >
        {isTooltipVisible && equipmentIndex >= 2 && !verifMainStat() && (
          <div className="absolute z-10 p-2 bg-background rounded-xl w-auto">
            <div className="font-bold">Recommandé :</div>
            {requiredMainStat?.map((el: any) => (
              <div className="italic font-normal" key={el.type}>
                {el.name}
              </div>
            ))}
          </div>
        )}

        <img src={`${CDN}/${icon}`} className="w-20 mx-auto" />
        <p>{displayValue}</p>
        <p>{main_affix.display}</p>
        <p className="absolute top-0 right-5 py-1 px-2 bg-gray rounded-full text-xs text-white">{`+${level}`}</p>
      </div>
      <div className="flex flex-col relative w-full h-full justify-center text-white">
        <div className="absolute flex right-20 min-w-[87px] text-gray/50 text-[62px] -mt-3">
          {relicNotation}
        </div>
        {sub_affix.map((affix, i) => {
          const subDisplayValue =
            typeValueMap[affix.type as keyof typeof typeValueMap] || affix.name;

          return (
            <div
              key={`characterRelic${affix.type}${i}`}
              className="grid grid-cols-[32px_1fr_50px_20px] items-center z-10"
            >
              <img src={`${CDN}/${affix.icon}`} className="w-7" />
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
