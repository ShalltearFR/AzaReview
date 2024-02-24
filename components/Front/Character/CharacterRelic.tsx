import { CDN, CDN2 } from "@/utils/cdn";
import { Relic } from "@/types/jsonUid";

interface CharacterRelicProps {
  stats: Relic;
}

interface MainAffix {
  type:
    | "PhysicalAddedRatio"
    | "QuantumAddedRatio"
    | "ImaginaryAddedRatio"
    | "WindAddedRatio"
    | "LightningAddedRatio"
    | "FireAddedRatio"
    | "IceAddedRatio"
    | "SPRatioBase"
    | "StatusProbabilityBase"
    | "CriticalChanceBase"
    | "CriticalDamageBase"
    | "HealRatioBase";
}

const CharacterRelic: React.FC<CharacterRelicProps> = ({ stats }) => {
  const { rarity, level, icon, main_affix, sub_affix } = stats;

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
      <div className="text-sm text-center relative my-auto">
        <img src={`${CDN}/${icon}`} className="w-20 mx-auto" />
        <p>{displayValue}</p>
        <p>{main_affix.display}</p>
        <p className="absolute top-0 right-5 py-1 px-2 bg-gray rounded-full text-xs">{`+${level}`}</p>
      </div>
      <div className="flex flex-col justify-center text-white !leading-0">
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
