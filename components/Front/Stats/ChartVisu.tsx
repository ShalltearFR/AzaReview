"use client";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { TranslateSection } from "@/types/homepageDictionnary";
import { StatsTranslate } from "@/utils/statsDictionnary";
import React, { useEffect } from "react";
import RadarChart from "./RadarChart";

type DefaultKeys =
  | "HPAddedRatio"
  | "HPDelta"
  | "AttackDelta"
  | "AttackAddedRatio"
  | "DefenceDelta"
  | "DefenceAddedRatio"
  | "StatusProbabilityBase"
  | "CriticalChanceBase"
  | "CriticalDamageBase"
  | "StatusResistanceBase"
  | "BreakDamageAddedRatioBase"
  | "SpeedDelta";

interface Result {
  totalProcs: number;
  data: {
    [key in DefaultKeys]: number;
  };
}

interface ChartVisuProps {
  dataStats: CharacterStatsType;
  lang: keyof TranslateSection | undefined;
}

const ChartVisu: React.FC<ChartVisuProps> = ({ dataStats, lang }) => {
  const [maxValue, setMaxValue] = React.useState<number>(0);
  const [dataRadarChart, setDataRadarChart] = React.useState<any>();

  useEffect(() => {
    const { procsResult, maxValue } = getProcsArray(dataStats.data);

    const chart = {
      labels: [
        StatsTranslate[lang ?? "fr"][6],
        StatsTranslate[lang ?? "fr"][7],
        StatsTranslate[lang ?? "fr"][8],
        StatsTranslate[lang ?? "fr"][9],
        StatsTranslate[lang ?? "fr"][10],
        StatsTranslate[lang ?? "fr"][11],
        StatsTranslate[lang ?? "fr"][12],
        StatsTranslate[lang ?? "fr"][13],
        StatsTranslate[lang ?? "fr"][14],
      ],
      datasets: [
        {
          data: [
            procsResult.hp,
            procsResult.atk,
            procsResult.def,
            procsResult.spd,
            procsResult.crit_rate,
            procsResult.crit_dmg,
            procsResult.break_dmg,
            procsResult.effect_hit,
            procsResult.effect_res,
          ],

          backgroundColor: "rgba(255, 99, 132, 0.3)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 1,
        },
      ],
    };

    setMaxValue(maxValue ?? 0);
    setDataRadarChart(chart);
  }, [lang]);

  if (dataRadarChart)
    return (
      <RadarChart
        data={dataRadarChart}
        width={500}
        height={350}
        maxPercent={maxValue}
      />
    );

  return (
    <div className="text-white">
      {lang === "en" ? "Loading..." : "Chargement..."}
    </div>
  );
};

function getProcsArray(data: CharacterStatsType["data"]) {
  const defaultKeys: DefaultKeys[] = [
    "HPAddedRatio",
    "HPDelta",
    "AttackDelta",
    "AttackAddedRatio",
    "DefenceDelta",
    "DefenceAddedRatio",
    "StatusProbabilityBase",
    "CriticalChanceBase",
    "CriticalDamageBase",
    "StatusResistanceBase",
    "BreakDamageAddedRatioBase",
    "SpeedDelta",
  ];

  const result: Result = {
    totalProcs: 0,
    data: defaultKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as Result["data"]),
  };

  data.forEach((character) => {
    character.relicsProcs.forEach((proc) => {
      for (const key in proc as any) {
        if (key in result.data) {
          const value = proc[key as keyof typeof proc];

          if (value !== undefined) {
            if (
              key === "HPDelta" ||
              key === "AttackDelta" ||
              key === "DefenceDelta"
            ) {
              result.totalProcs += 0.33; // Ajouter 0.33 si la clé est HPDelta, AttackDelta ou DefenceDelta
              result.data[key as DefaultKeys] += value / 3;
            } else {
              result.data[key as DefaultKeys] += value;
              result.totalProcs += 1; // Ajouter 1 pour les autres clés
            }
          }
        }
      }
    });
  });

  const procsResult = {
    totalProcs: Number(result.totalProcs.toFixed(4)),
    hp: Number((result.data.HPDelta + result.data.HPAddedRatio).toFixed(4)),
    atk: Number(
      (result.data.AttackDelta + result.data.AttackAddedRatio).toFixed(4)
    ),
    def: Number(
      (result.data.DefenceDelta + result.data.DefenceAddedRatio).toFixed(4)
    ),
    spd: result.data.SpeedDelta,
    crit_rate: result.data.CriticalChanceBase,
    crit_dmg: result.data.CriticalDamageBase,
    break_dmg: result.data.BreakDamageAddedRatioBase,
    effect_hit: result.data.StatusProbabilityBase,
    effect_res: result.data.StatusResistanceBase,
  };

  const maxValue = Math.max(
    ...Object.entries(procsResult)
      .filter(([key]) => key !== "totalProcs") // Ignorer `totalProcs`
      .map(([, value]) => value)
  );

  return { procsResult, maxValue };
}

export default ChartVisu;
