"use client";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { CDN } from "@/utils/cdn";
import { useEffect, useState } from "react";

interface TopLightConesProps {
  dataStats: CharacterStatsType;
  lightConesList: any;
}

interface TopLightConesType {
  data: TopLightConesData[];
  length: number;
}

interface TopLightConesData {
  id: string;
  count: number;
  percent: number;
}

const TopLightCones: React.FC<TopLightConesProps> = ({
  dataStats,
  lightConesList,
}) => {
  const [top5_LightCones, setTop5_LightCones] = useState<TopLightConesType>();

  useEffect(() => {
    const top5 = getTop5LightCones(dataStats.data);
    setTop5_LightCones(top5);
  }, []);

  if (top5_LightCones)
    return (
      <div className="flex flex-col mt-10 justify-center mx-auto p-5 bg-white/15 rounded-3xl lg:w-1/2">
        <h2 className="font-bold text-2xl underline text-orange text-center w-auto">
          Top Cones de lumière
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
          {top5_LightCones.data.map((cone) => {
            const lightconesInfo = lightConesList.find(
              (info: any) => info.id === cone.id
            );
            return (
              <div
                key={`lightcone${cone.id}`}
                className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
              >
                {lightconesInfo.rarity && (
                  <div
                    className={`absolute w-full h-full rounded-t-3xl z-10 right-0 -top-2 ${
                      lightconesInfo.rarity === 5
                        ? "bg-radial-5Star"
                        : "bg-radial-4Star"
                    }`}
                  />
                )}
                <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                  {cone.percent}%
                </p>

                <img
                  src={`${CDN}/${lightconesInfo.icon}`}
                  alt={lightconesInfo.name}
                  width={112}
                  height={112}
                  className="w-28 m-auto z-10"
                  fetchPriority="high"
                />
                <p className="absolute bottom-0 text-center text-sm bg-black w-full z-20">
                  {lightconesInfo.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
};

function getTop5LightCones(data: CharacterStatsType["data"]) {
  if (!data) return undefined;
  const arrayData: any = data.map((item) => item.lightCones);

  const countMap = arrayData.reduce((acc: any, id: any) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // Convertit l'objet en tableau de { id, count }
  const resultArray = Object.keys(countMap).map((id) => ({
    id: id,
    count: countMap[id],
  }));

  // Calcule le pourcentage et filtre les éléments avec percent > 5%
  const totalCount = arrayData.length;
  const filteredResult = resultArray
    .map((item) => ({
      ...item,
      percent: parseFloat(((item.count / totalCount) * 100).toFixed(2)), // Convertit en nombre
    }))
    .filter((item) => item.percent > 5)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    data: filteredResult,
    length: totalCount,
  };
}

export default TopLightCones;
