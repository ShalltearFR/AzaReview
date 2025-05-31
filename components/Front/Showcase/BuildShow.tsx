import { Data } from "@/types/CharacterModel";
import translateBBCode from "@/utils/translateBBCode";
import ItemShow from "./ItemShow";
import MainStats from "./MainStats";
import { findLabel } from "@/utils/statsOption";
import { filterLightconeID, filterRelicID } from "@/utils/sorts&Filter";
import { useMemo } from "react";

interface BuildShowProps {
  build: Data;
  i: number;
  characterID: string;
  lightCones: any;
  lightconesRanks: any;
  properties: any;
  relicsSet: any;
}

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
  lightCones,
  lightconesRanks,
  properties,
  relicsSet,
}) => {
  const recommendedStatsFilter = build.recommended_stats.filter(
    (relic) => relic.value !== null && relic.value !== 0
  );
  const lightConeFilter = useMemo(
    () => filterLightconeID(build.lightCones),
    [build.lightCones]
  );
  const relicsSetFilter = useMemo(
    () => filterRelicID(build.relics_set),
    [build.relics_set]
  );

  const getMainStats = (piece: string) => {
    return (
      <ul className="list-disc">
        {build?.main_stats
          .filter((el) => el.piece === piece)
          .map((el, i) => {
            const translated = properties.find(
              (stat: any) => stat.type === el.type
            );
            return (
              <li
                key={`mainStat-${piece}+${i}+${characterID}`}
                className="ml-7"
              >
                {translated?.name || el.type}
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <div className="px-2 xl:px-5 text-center">
      <div className="font-bold text-2xl">
        {translateBBCode(build.buildName)}
      </div>
      <div>{translateBBCode(build.buildDesc)}</div>
      {/* Cone de lumière */}
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">
          Cône de lumière
        </p>

        <div className="mt-2 flex flex-col lg:flex-row gap-10 justify-center">
          {lightConeFilter.find((el) => !el.recommended) && (
            <div className="p-5 bg-white/15 rounded-3xl">
              <p className="text-lg font-bold mb-2">Recommandés</p>
              <div className="flex flex-wrap gap-5 justify-center">
                {lightConeFilter.map((lightcone, i) => {
                  if (!lightcone.recommended)
                    return (
                      <div
                        key={`recommendedCone+${lightcone.id}+${characterID}`}
                      >
                        <ItemShow
                          type={lightCones}
                          id={lightcone.id}
                          className="h-36 w-36"
                          lightconesRanks={lightconesRanks}
                        />
                      </div>
                    );
                  return null;
                })}
              </div>
            </div>
          )}

          {lightConeFilter.find((el) => el.recommended) && (
            <div className="p-5 bg-white/15 rounded-3xl">
              <p className="text-lg font-bold mb-2">
                Recommandés F2P/Accessibles
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                {lightConeFilter.map((lightcone, i) => {
                  if (lightcone.recommended)
                    return (
                      <div key={`recommendeF2P+${lightcone.id}+${characterID}`}>
                        <ItemShow
                          type={lightCones}
                          id={lightcone.id}
                          className="h-36 w-36"
                          lightconesRanks={lightconesRanks}
                        />
                      </div>
                    );
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main stats */}
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">Main stats</p>
        <div className="flex flex-wrap gap-5 p-5 justify-center text-start bg-white/15 rounded-3xl mt-2">
          <MainStats type={getMainStats("body")} name={"Torse"} />
          <MainStats type={getMainStats("feet")} name={"Bottes"} />
          <MainStats
            type={getMainStats("planar_sphere")}
            name={"Spheres planaires"}
          />
          <MainStats type={getMainStats("link_rope")} name={"Cordes"} />
        </div>
      </div>

      {/* Sets de reliques */}
      <div className="mt-14">
        <p className="font-bold text-xl underline text-orange">
          Sets de Reliques + Ornements
        </p>

        <div className="mt-2 flex flex-col lg:flex-row gap-10 justify-center">
          <div className="p-5 bg-white/15 rounded-3xl">
            <p className="text-lg font-bold mb-2">Top</p>
            <div className="flex flex-wrap gap-5 justify-center">
              {build.relics_set.map((relic, i) => {
                if (relic.recommended)
                  return (
                    <div
                      key={`recommendedOrnaments+${relic.id}+${characterID}+${i}`}
                    >
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
            <p className="text-lg font-bold mb-2">Autres bons choix</p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-5 justify-center">
                {relicsSetFilter.map((relic, i) => {
                  if (Number(relic.id) < 300) {
                    return (
                      <div key={`relicsSet+${relic.id}+${characterID}+${i}`}>
                        <ItemShow
                          type={relicsSet}
                          id={relic.id}
                          className="h-36 w-36"
                          relicSet={relic}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="flex flex-wrap gap-5 justify-center">
                {relicsSetFilter.map((relic, i) => {
                  if (Number(relic.id) > 300) {
                    return (
                      <div key={`ornaments+${relic.id}+${characterID}+${i}`}>
                        <ItemShow
                          type={relicsSet}
                          id={relic.id}
                          className="h-36 w-36"
                          relicSet={relic}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques recommandées */}
      <div className="my-10 xl:mb-0">
        <p className="font-bold text-xl underline text-orange">
          Statistiques recommandées
        </p>
        <div className="flex flex-col justify-center text-start">
          <ul className="list-disc mx-auto">
            {recommendedStatsFilter.map((stat, i) => (
              <li
                className="ml-5"
                key={`recommendedStat${build.buildName}+${stat.type}+${characterID}+${i}`}
              >
                <span>{findLabel(stat.type)}</span>{" "}
                <span>
                  {percentStats.includes(stat.type)
                    ? `${parseFloat((stat.value * 100).toFixed(1))}%`
                    : stat.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 mx-auto">
            {translateBBCode(build.recommended_comment)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildShow;
