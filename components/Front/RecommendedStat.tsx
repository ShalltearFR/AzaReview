import { RecommendedStats } from "@/types/CharacterModel";
import { findLabel } from "@/utils/statsOption";

interface recommendedStatProps {
  data: RecommendedStats[];
}

const recommendedStat: React.FC<recommendedStatProps> = ({ data }) => {
  console.log("recommendedData", data);
  return (
    <div className="w-1/2 mx-auto text-white font-bold">
      <div className="mt-2 ">
        {data ? (
          <div>
            {data.map((stat: RecommendedStats, index: number) => {
              if (!stat.value) return null;

              const statType = stat.type;
              const value = [
                "CriticalChanceBase",
                "CriticalDamageBase",
                "break_dmg",
                "effect_res",
                "effect_hit",
              ].includes(statType)
                ? `${Math.floor(stat.value * 100)} %`
                : stat.value;

              return (
                <p className="flex" key={`stat${index}`}>
                  <span>{findLabel(stat.type)}</span>
                  <span className="ml-auto">{value}</span>
                </p>
              );
            })}
          </div>
        ) : (
          <p>Disponible prochainement</p>
        )}
      </div>
    </div>
  );
};

export default recommendedStat;
