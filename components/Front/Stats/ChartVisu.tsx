"use client";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import React, { useEffect, useState } from "react";
import RadarChart from "./RadarChart";
import LoadingSpin from "@/components/LoadingSpin";

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
  data: Record<DefaultKeys, number>;
}

interface ChartVisuProps {
  dataStats: CharacterStatsType;
}

const ChartVisu: React.FC<ChartVisuProps> = ({ dataStats }) => {
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    const { procsResult, maxValue } = getProcsArray(dataStats.data);
    const labels = [
      "PV",
      "ATK",
      "DEF",
      "VIT",
      "Taux Crit.",
      "DGT Crit.",
      "Effet de Rupture",
      "App. des effets",
      "RÉS des Effets",
    ];

    setChartData({
      labels,
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
      maxPercent: maxValue,
    });
  }, [dataStats.data]);

  if (!chartData)
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpin width="w-10" height="h-10" />
      </div>
    );

  return (
    <RadarChart
      data={chartData}
      width={500}
      height={350}
      maxPercent={chartData.maxPercent}
    />
  );
};

function getProcsArray(data: CharacterStatsType["data"]) {
  const initialResult: Result = {
    totalProcs: 0,
    data: {
      HPAddedRatio: 0,
      HPDelta: 0,
      AttackDelta: 0,
      AttackAddedRatio: 0,
      DefenceDelta: 0,
      DefenceAddedRatio: 0,
      StatusProbabilityBase: 0,
      CriticalChanceBase: 0,
      CriticalDamageBase: 0,
      StatusResistanceBase: 0,
      BreakDamageAddedRatioBase: 0,
      SpeedDelta: 0,
    },
  };

  data.forEach((character) => {
    character.relicsProcs.forEach((proc) => {
      Object.keys(proc).forEach((key) => {
        if (key in initialResult.data) {
          const value = proc[key as DefaultKeys];
          if (value !== undefined) {
            if (["HPDelta", "AttackDelta", "DefenceDelta"].includes(key)) {
              initialResult.totalProcs += 0.33;
              initialResult.data[key as DefaultKeys] += value / 3;
            } else {
              initialResult.totalProcs += 1;
              initialResult.data[key as DefaultKeys] += value;
            }
          }
        }
      });
    });
  });

  const procsResult = {
    totalProcs: Number(initialResult.totalProcs.toFixed(4)),
    hp: Number(
      (initialResult.data.HPDelta + initialResult.data.HPAddedRatio).toFixed(4)
    ),
    atk: Number(
      (
        initialResult.data.AttackDelta + initialResult.data.AttackAddedRatio
      ).toFixed(4)
    ),
    def: Number(
      (
        initialResult.data.DefenceDelta + initialResult.data.DefenceAddedRatio
      ).toFixed(4)
    ),
    spd: initialResult.data.SpeedDelta,
    crit_rate: initialResult.data.CriticalChanceBase,
    crit_dmg: initialResult.data.CriticalDamageBase,
    break_dmg: initialResult.data.BreakDamageAddedRatioBase,
    effect_hit: initialResult.data.StatusProbabilityBase,
    effect_res: initialResult.data.StatusResistanceBase,
  };

  const maxValue = Math.max(
    ...Object.entries(procsResult)
      .filter(([key]) => key !== "totalProcs") // Ignorer `totalProcs`
      .map(([, value]) => value)
  );

  return { procsResult, maxValue };
}

export default ChartVisu;
