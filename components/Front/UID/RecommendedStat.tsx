import { RecommendedStats } from "@/types/CharacterModel";
import { TranslateSection } from "@/types/homepageDictionnary";
import { UIDtitles } from "@/utils/dictionnary";
import { findLabel, findLabelEN } from "@/utils/statsOption";

interface recommendedStatProps {
  data: RecommendedStats[];
  lang: keyof TranslateSection | undefined;
}

const recommendedStat: React.FC<recommendedStatProps> = ({ data, lang }) => {
  if (data && data.length === 0) {
    return (
      <div className="mt-5 text-lg font-bold text-red text-center">
        <p>BUILD EN COURS DE CONSTRUCTION</p>
        <p>NE PAS TENIR COMPTE DES RECOMMANDATIONS</p>
      </div>
    );
  }

  return (
    <div className="w-1/2 mx-auto text-white font-bold text-[15px]">
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
                  <span>
                    {lang === "en"
                      ? findLabelEN(stat.type)
                      : findLabel(stat.type)}
                  </span>
                  <span className="ml-auto">{value}</span>
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-center">{UIDtitles[lang ?? "fr"].AvailableSoon}</p>
        )}
      </div>
    </div>
  );
};

export default recommendedStat;
