import { Data } from "@/types/CharacterModel";
import characterEN from "@/utils/charactersEN";
import translateBBCode from "@/utils/translateBBCode";
import ItemShow from "./ItemShow";
import MainStats from "./MainStats";
import { findLabel, findLabelEN } from "@/utils/statsOption";

interface BuildShowProps {
  build: Data;
  i: number;
  lang: string | undefined;
  characterID: string;
  lightCones: any;
  properties: any;
  relicsSet: any;
}
const BuildShow: React.FC<BuildShowProps> = ({
  build,
  i,
  characterID,
  lang,
  lightCones,
  properties,
  relicsSet,
}) => {
  const lightConeFilter = build.lightCones.filter(
    (cone) => cone.recommended === false
  );
  const relicsSetFilter = build.relics_set.filter(
    (relic) => relic.recommended === false
  );
  const recommendedStatsFilter = build.recommended_stats.filter(
    (relic) => relic.value !== null && relic.value !== 0
  );

  const percentStats = [
    "CriticalChanceBase",
    "CriticalDamageBase",
    "SPRatioBase",
    "StatusProbabilityBase",
    "StatusResistanceBase",
    "BreakDamageAddedRatioBase",
  ];

  const getMainStats = (piece: string) => {
    const result = build?.main_stats
      .filter((el: any) => el.piece === piece)
      .map((el: any, i: number) => {
        // statsTranslate
        const translated = properties.find(
          (stat: any) => stat.type === el.type
        );
        return (
          <li className="ml-7" key={`${build.buildName}+${i}+${piece}`}>
            {translated.name}
          </li>
        );
      });
    return <ul className="list-disc">{result}</ul>;
  };

  return (
    <div className="px-2 xl:px-5">
      <div className="font-bold text-2xl">
        {lang === "en" && characterEN[characterID as any]
          ? translateBBCode(characterEN[characterID as any][i]?.name ?? "")
          : translateBBCode(build.buildName)}
      </div>
      <div>
        {lang === "en" && characterEN[characterID as any]
          ? translateBBCode(characterEN[characterID as any][i]?.desc ?? "")
          : translateBBCode(build.buildDesc)}
      </div>
      <div className="mt-10">
        {/* Cone de lumière */}
        <p className="font-bold text-lg underline">
          {lang === "en" ? "Light Cones" : "Cônes de lumière"}
        </p>
        <div className="flex flex-wrap gap-5 justify-center xl:justify-start mt-2">
          {lightConeFilter.map((lightcone) => (
            <div key={crypto.randomUUID()}>
              <ItemShow
                type={lightCones}
                id={lightcone.id}
                className="h-36 w-36"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {/* Main stats */}
        <p className="font-bold text-lg underline">Main stats</p>
        <div className="flex flex-wrap gap-5 px-2 mt-2 justify-center xl:justify-start">
          <MainStats
            lang={lang}
            type={getMainStats("body")}
            name={{
              en: "Body",
              fr: "Torse",
            }}
          />

          <MainStats
            lang={lang}
            type={getMainStats("feet")}
            name={{
              en: "Feet",
              fr: "Bottes",
            }}
          />

          <MainStats
            lang={lang}
            type={getMainStats("planar_sphere")}
            name={{
              en: "Planar sphere",
              fr: "Spheres planaires",
            }}
          />

          <MainStats
            lang={lang}
            type={getMainStats("link_rope")}
            name={{
              en: "Link rope",
              fr: "Cordes",
            }}
          />
        </div>
      </div>

      <div className="mt-10">
        {/* Sets de reliques */}
        <p className="font-bold text-lg underline">
          {lang === "en" ? "Relics sets" : "Sets de reliques"}
        </p>
        <div className="flex flex-wrap gap-5 justify-center xl:justify-start mt-2">
          {relicsSetFilter.map((relic) => (
            <div key={crypto.randomUUID()}>
              <ItemShow
                className="h-36 w-36"
                type={relicsSet}
                id={relic.id}
                relicSet={relic}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 xl:mb-0">
        <p className="font-bold text-lg underline">
          {lang === "en"
            ? "Recommended Statistics"
            : "Statistiques recommandées"}
        </p>
        <div>
          <ul className="list-disc">
            {recommendedStatsFilter.map((stat) => (
              <li className="ml-5" key={crypto.randomUUID()}>
                <span>
                  {lang === "en"
                    ? findLabelEN(stat.type)
                    : findLabel(stat.type)}
                </span>{" "}
                <span>
                  {percentStats.includes(stat.type)
                    ? `${stat.value * 100}%`
                    : stat.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            {lang === "en" && characterEN[characterID as any]
              ? translateBBCode(
                  characterEN[characterID as any][i]?.comment ?? ""
                )
              : translateBBCode(build.recommended_comment)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildShow;
