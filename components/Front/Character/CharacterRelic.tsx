"use client";
import { CDN, CDN2 } from "@/utils/cdn";
import { Relic } from "@/types/jsonUid";
import { MainStats, RecommendedStats } from "@/types/CharacterModel";
import calculateRelic from "@/utils/calculateRelic";

interface CharacterRelicProps {
  stats: Relic;
  reviewRecommanded: RecommendedStats[];
  reviewMainStat: MainStats[];
  equipmentIndex: number;
}

const CharacterRelic: React.FC<CharacterRelicProps> = ({
  stats,
  reviewRecommanded,
  reviewMainStat,
  equipmentIndex,
}) => {
  const { rarity, level, icon, main_affix, sub_affix } = stats;
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

  const isGoodEquipment = () => {
    if (reviewMainStat) {
      const recommendedObject =
        reviewMainStat.filter((el) => el.piece === equipment) || [];
      const isGood = recommendedObject.some(
        (objet) => objet.type === main_affix.type
      );
      console.log("recommendedObject", recommendedObject);
      console.log("mainAffix", main_affix);
      console.log("auMoinsUnObjetAvecValeur", isGood);
      return isGood;
    }
    return true;
  };

  console.log("reviewMainStat", reviewMainStat);
  const typeValueMap = {
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

  const displayValue =
    typeValueMap[main_affix.type as keyof typeof typeValueMap] ||
    main_affix.name;

  let result: string = "";
  if (Array.isArray(reviewRecommanded) && reviewRecommanded.length > 0) {
    result = calculateRelic(reviewRecommanded, sub_affix);
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
        className={`text-sm text-center relative my-auto${
          equipmentIndex >= 2 ? (!isGoodEquipment() ? " text-red" : "") : ""
        }`}
      >
        <img src={`${CDN}/${icon}`} className="w-20 mx-auto" />
        <p>{displayValue}</p>
        <p>{main_affix.display}</p>
        <p className="absolute top-0 right-5 py-1 px-2 bg-gray rounded-full text-xs text-white">{`+${level}`}</p>
      </div>
      <div className="flex flex-col relative w-full h-full justify-center text-white">
        <span className="absolute flex right-20 min-w-[87px] text-gray/50 text-[62px] -mt-3 -z-10">
          {result}
        </span>
        {sub_affix.map((affix) => {
          const subDisplayValue =
            typeValueMap[affix.type as keyof typeof typeValueMap] || affix.name;

          return (
            <div
              key={crypto.randomUUID()}
              className="grid grid-cols-[32px_1fr_50px_20px] items-center "
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
