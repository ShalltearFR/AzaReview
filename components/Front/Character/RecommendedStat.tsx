import { RecommendedStats } from "@/types/CharacterModel";
import { findLabel } from "@/utils/statsOption";

interface recommendedStatProps {
  data: RecommendedStats[];
}

const recommendedStat: React.FC<recommendedStatProps> = ({ data }) => {
  if (data && data.length === 0) {
    return (
      <div className="mt-5 text-lg font-bold text-red text-center">
        <p>BUILD EN COURS DE CONSTRUCTION</p>
        <p>NE PAS TENIR COMPTE DES RECOMMANDATIONS</p>
      </div>
    );
  }

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
                "BreakDamageAddedRatioBase",
                "StatusProbabilityBase",
                "StatusResistanceBase",
                "SPRatioBase",
              ].includes(statType)
                ? (Math.floor(stat.value * 1000) / 10).toLocaleString("fr") +
                  "%"
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
