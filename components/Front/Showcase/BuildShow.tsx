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

interface itemsProps {
  id: string;
  recommended: boolean
}

const filterUniqueID = (items: itemsProps[]) => {
  const encounteredLightconeData: { [id: string]: boolean } = {};
  const itemsFilter: any[] = [];
  for (const item of items) {
    if (!encounteredLightconeData[item.id]) {
      encounteredLightconeData[item.id] = true;
      itemsFilter.push(item);
    } else if (item.recommended) {
      const existingItem = itemsFilter.find(existing => existing.id === item.id);
      if (existingItem) {
        existingItem.recommended = true;
      }
    }
  }
  return itemsFilter
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


  // const relicsSetFilter = build.relics_set.filter(
  //   (relic) => relic.recommended === false
  // );
  const recommendedStatsFilter = build.recommended_stats.filter(
    (relic) => relic.value !== null && relic.value !== 0
  );
  const lightConeFilter = filterUniqueID(build.lightCones)
  const relicsSetFilter = filterUniqueID(build.relics_set)

  console.log("buid", build.lightCones)
  console.log("filteredLightcone", lightConeFilter)
  //console.log("encounteredLightconeData", encounteredLightconeData)

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
    <div className="px-2 xl:px-5 text-center">
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
      {/* Cone de lumière */}
      <div className="mt-10">
        <p className="font-bold text-xl underline">
          {lang === "en" ? "Light Cones" : "Cônes de lumière"}
        </p>

        <div className="mt-2 flex flex-col lg:flex-row gap-10 justify-center">
          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              {lang === "en" ? "Recommended" : "Recommandés"}
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {lightConeFilter.map((lightcone) => {
                if (!lightcone.recommended)
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={lightCones}
                        id={lightcone.id}
                        className="h-36 w-36"
                      />
                    </div>
                  )
                return null
              }
              )}
            </div>
          </div>

          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              {lang === "en" ? "Recommended F2P/Accessible" : "Recommandés F2P/Accessibles"}
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {lightConeFilter.map((lightcone) => {
                if (lightcone.recommended)
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={lightCones}
                        id={lightcone.id}
                        className="h-36 w-36"
                      />
                    </div>
                  )
                return null
              }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main stats */}
      <div className="mt-10">
        <p className="font-bold text-xl underline">Main stats</p>
        <div className="flex flex-wrap gap-5 px-2 mt-2 justify-center text-start">
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

      {/* Sets de reliques */}
      <div className="mt-10">
        <p className="font-bold text-xl underline">
          {lang === "en" ? "Relics sets" : "Sets de reliques"}
        </p>

        <div className="mt-2 flex flex-col lg:flex-row gap-10 justify-center">
          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              Top
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {relicsSetFilter.map((relic) => {
                if (relic.recommended)
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={relicsSet}
                        id={relic.id}
                        className="h-36 w-36"
                      />
                    </div>
                  )
                return null
              }
              )}
            </div>
          </div>

          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              {lang === "en" ? "Other good choices" : "Autres bons choix"}
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {relicsSetFilter.map((relic) => {
                if (!relic.recommended)
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={relicsSet}
                        id={relic.id}
                        className="h-36 w-36"
                      />
                    </div>
                  )
                return null
              }
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 xl:mb-0">
        <p className="font-bold text-xl underline">
          {lang === "en"
            ? "Recommended Statistics"
            : "Statistiques recommandées"}
        </p>
        <div className="flex justify-center text-start">
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
                    ? `${parseFloat((stat.value * 100).toFixed(1))}%`
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
