import { Data } from "@/types/CharacterModel";
import characterEN from "@/utils/charactersEN";
import translateBBCode from "@/utils/translateBBCode";
import ItemShow from "./ItemShow";
import MainStats from "./MainStats";
import { findLabel, findLabelEN } from "@/utils/statsOption";
import relicsSetList from "@/utils/relicsSetList";
import { TranslateSection } from "@/types/homepageDictionnary";

interface BuildShowProps {
  build: Data;
  i: number;
  lang: keyof TranslateSection | undefined;
  characterID: string;
  lightCones: any;
  properties: any;
  relicsSet: any;
}

interface itemsProps {
  id: string;
  recommended: boolean;
  num?: number;
}

// Evite les doublons d'id entre les recommandés et non recommandés
const filterLightconeID = (items: itemsProps[]) => {
  const lightconesIdsData: { [id: string]: boolean } = {};
  const itemsFilter: any[] = [];
  for (const item of items) {
    if (!lightconesIdsData[item.id]) {
      lightconesIdsData[item.id] = true;
      itemsFilter.push(item);
    } else if (item.recommended) {
      const existingItem = itemsFilter.find(
        (existing) => existing.id === item.id
      );
      if (existingItem) {
        existingItem.recommended = true;
      }
    }
  }
  return itemsFilter;
};

// Evite les doublon d'id sur les relics
// Si 2P et 4P sur meme ID, renomage de num à 2.4 pour indiquer 2P et 4P
const filterRelicID = (items: itemsProps[]) => {
  const uniqueIDs = new Set();
  const result = [...items]
    .filter((relic) => relic.recommended === false)
    .filter((item) => {
      if (uniqueIDs.has(item.id)) {
        return false;
      }
      uniqueIDs.add(item.id);
      if (item.num === 4) {
        item.num = 2.4;
      }
      return true;
    });
  return result;
};

// Sépare les reliques et ornements
const separateRelics = (items: itemsProps[], isOrnament: boolean) => {
  const filteredItems = [...items].filter((item) =>
    relicsSetList.find(
      (relic) => relic.isOrnamant === isOrnament && item.id === relic.id
    )
  );
  return filteredItems;
};

const percentStats = [
  "CriticalChanceBase",
  "CriticalDamageBase",
  "SPRatioBase",
  "StatusProbabilityBase",
  "StatusResistanceBase",
  "BreakDamageAddedRatioBase",
];

const BuildShow: React.FC<BuildShowProps> = ({
  build,
  i,
  characterID,
  lang,
  lightCones,
  properties,
  relicsSet,
}) => {
  const recommendedStatsFilter = build.recommended_stats.filter(
    (relic) => relic.value !== null && relic.value !== 0
  );
  const lightConeFilter = filterLightconeID(build.lightCones);
  const relicsSetFilter = filterRelicID(build.relics_set);

  const relicsFilter = separateRelics(relicsSetFilter, false);
  const ornamentsFilter = separateRelics(relicsSetFilter, true);

  const getMainStats = (piece: string) => {
    const result = build?.main_stats
      .filter((el: any) => el.piece === piece)
      .map((el: any, i: number) => {
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
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">
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
                  );
                return null;
              })}
            </div>
          </div>

          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              {lang === "en"
                ? "Recommended F2P/Accessible"
                : "Recommandés F2P/Accessibles"}
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
                  );
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main stats */}
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">Main stats</p>
        <div className="flex flex-wrap gap-5 p-5 justify-center text-start bg-white/15 rounded-3xl mt-2">
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
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">
          {lang === "en"
            ? "Relics sets + Ornaments"
            : "Sets de reliques + Ornements"}
        </p>

        <div className="mt-2 flex flex-col lg:flex-row gap-10 justify-center">
          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">Top</p>
            <div className="flex flex-wrap gap-5 justify-center">
              {build.relics_set.map((relic) => {
                if (relic.recommended)
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={relicsSet}
                        id={relic.id}
                        className="h-36 w-36"
                        relicSet={relic}
                      />
                    </div>
                  );
                return null;
              })}
            </div>
          </div>

          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">
              {lang === "en" ? "Other good choices" : "Autres bons choix"}
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-5 justify-center">
                {relicsFilter.map((relic) => {
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={relicsSet}
                        id={relic.id}
                        className="h-36 w-36"
                        relicSet={relic}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-5 justify-center">
                {ornamentsFilter.map((relic) => {
                  return (
                    <div key={crypto.randomUUID()}>
                      <ItemShow
                        type={relicsSet}
                        id={relic.id}
                        className="h-36 w-36"
                        relicSet={relic}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques recommandées */}
      <div className="my-10 xl:mb-0">
        <p className="font-bold text-xl underline text-orange">
          {lang === "en"
            ? "Recommended Statistics"
            : "Statistiques recommandées"}
        </p>
        <div className="flex flex-col justify-center text-start">
          <ul className="list-disc mx-auto">
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
          <div className="mt-5 mx-auto">
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
