"use client";
import LoadingSpin from "@/components/LoadingSpin";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { TranslateSection } from "@/types/homepageDictionnary";
import { StatsTranslate } from "@/utils/statsDictionnary";
import { useEffect, useState } from "react";

interface StatsTableProps {
  dataStats: CharacterStatsType;
  lang: keyof TranslateSection | undefined;
}

interface attributeObject {
  min: number;
  avg: number;
  max: number;
}

interface attributesProps {
  hp: attributeObject;
  atk: attributeObject;
  def: attributeObject;
  spd: attributeObject;
  crit_rate: attributeObject;
  crit_dmg: attributeObject;
  break_dmg: attributeObject;
  effect_hit: attributeObject;
  effect_res: attributeObject;
  energy: attributeObject;
}

const StatsTable: React.FC<StatsTableProps> = ({ dataStats, lang }) => {
  const [attributes, setAttributes] = useState<attributesProps | undefined>(
    undefined
  );

  useEffect(() => {
    const defaultAttr: attributeObject = { min: 0, avg: 0, max: 0 };

    const hp = getStatsAttributes(dataStats.data, "hp", true) || defaultAttr;
    const atk = getStatsAttributes(dataStats.data, "atk", true) || defaultAttr;
    const def = getStatsAttributes(dataStats.data, "def", true) || defaultAttr;
    const spd = getStatsAttributes(dataStats.data, "spd", true) || defaultAttr;
    const crit_rate =
      getStatsAttributes(dataStats.data, "crit_rate") || defaultAttr;
    const crit_dmg =
      getStatsAttributes(dataStats.data, "crit_dmg") || defaultAttr;
    const break_dmg =
      getStatsAttributes(dataStats.data, "break_dmg") || defaultAttr;
    const effect_hit =
      getStatsAttributes(dataStats.data, "effect_hit") || defaultAttr;
    const effect_res =
      getStatsAttributes(dataStats.data, "effect_res") || defaultAttr;
    const energy = getStatsAttributes(dataStats.data, "energy") || defaultAttr;

    setAttributes({
      hp,
      atk,
      def,
      spd,
      crit_rate,
      crit_dmg,
      break_dmg,
      effect_hit,
      effect_res,
      energy,
    });
  }, [dataStats, lang]);

  if (attributes && Number.isFinite(attributes.hp.min) && attributes.hp.min > 0)
    return (
      <table className="border-collapse border-spacing-0 tg mx-auto">
        <thead>
          <tr>
            <th className="!border-0"></th>
            <th>Minimum</th>
            <th>{StatsTranslate[lang ?? "fr"][5]}</th>
            <th>Maximum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][6]}</td>
            <td className="!text-red">{attributes.hp?.min ?? "-"}</td>
            <td className="!text-blue">{attributes.hp?.avg ?? "-"}</td>
            <td className="!text-green">{attributes.hp?.max ?? "-"}</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][7]}</td>
            <td className="!text-red">{attributes.atk?.min ?? "-"}</td>
            <td className="!text-blue">{attributes.atk?.avg ?? "-"}</td>
            <td className="!text-green">{attributes.atk?.max ?? "-"}</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][8]}</td>
            <td className="!text-red">{attributes.def?.min ?? "-"}</td>
            <td className="!text-blue">{attributes.def?.avg ?? "-"}</td>
            <td className="!text-green">{attributes.def?.max ?? "-"}</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][9]}</td>
            <td className="!text-red">{attributes.spd?.min ?? "-"}</td>
            <td className="!text-blue">{attributes.spd?.avg ?? "-"}</td>
            <td className="!text-green">{attributes.spd?.max ?? "-"}</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][10]}</td>
            <td className="!text-red">{attributes.crit_rate?.min ?? "-"}%</td>
            <td className="!text-blue">{attributes.crit_rate?.avg ?? "-"}%</td>
            <td className="!text-green">{attributes.crit_rate?.max ?? "-"}%</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][11]}</td>
            <td className="!text-red">{attributes.crit_dmg?.min ?? "-"}%</td>
            <td className="!text-blue">{attributes.crit_dmg?.avg ?? "-"}%</td>
            <td className="!text-green">{attributes.crit_dmg?.max ?? "-"}%</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][12]}</td>
            <td className="!text-red">{attributes.break_dmg?.min ?? "-"}%</td>
            <td className="!text-blue">{attributes.break_dmg?.avg ?? "-"}%</td>
            <td className="!text-green">{attributes.break_dmg?.max ?? "-"}%</td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][13]}</td>
            <td className="!text-red">{attributes.effect_hit?.min ?? "-"}%</td>
            <td className="!text-blue">{attributes.effect_hit?.avg ?? "-"}%</td>
            <td className="!text-green">
              {attributes.effect_hit?.max ?? "-"}%
            </td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][14]}</td>
            <td className="!text-red">{attributes.effect_res?.min ?? "-"}%</td>
            <td className="!text-blue">{attributes.effect_res?.avg ?? "-"}%</td>
            <td className="!text-green">
              {attributes.effect_res?.max ?? "-"}%
            </td>
          </tr>
          <tr>
            <td>{StatsTranslate[lang ?? "fr"][15]}</td>
            <td className="!text-red">
              {attributes.energy ? attributes.energy.min + 100 : "-"}%
            </td>
            <td className="!text-blue">
              {attributes.energy ? attributes.energy.avg + 100 : "-"}%
            </td>
            <td className="!text-green">
              {attributes.energy ? attributes.energy.max + 100 : "-"}%
            </td>
          </tr>
        </tbody>
      </table>
    );

  if (attributes?.hp.min === 0 || attributes?.hp?.min === Infinity)
    return (
      <div className="text-center">
        {lang === "en"
          ? "There is not enough data"
          : "Il n'y a pas assez de données"}
      </div>
    );

  return (
    <div className="flex justify-center mt-10">
      <LoadingSpin width="w-10" height="h-10" />
    </div>
  );
};

function getStatsAttributes(
  data: CharacterStatsType["data"],
  attributes: string,
  rounded?: boolean
): attributeObject | undefined {
  if (!data || data.length === 1) return undefined;

  const propertiesArray = data.map((item: any) => item.properties[attributes]);

  const removeCount =
    propertiesArray.length > 1 ? Math.ceil(propertiesArray.length * 0.01) : 0;

  const filteredArray = propertiesArray
    .sort((a, b) => a - b)
    .slice(removeCount, propertiesArray.length - removeCount);

  const min = Math.round(Math.min(...filteredArray) * 10) / 10;
  const avg =
    Math.round(
      (filteredArray.reduce((a: number, b: number) => a + b, 0) /
        filteredArray.length) *
        10
    ) / 10;
  const max = Math.round(Math.max(...filteredArray) * 10) / 10;

  if (rounded) {
    return { min: Math.round(min), avg: Math.round(avg), max: Math.round(max) };
  }

  return { min, avg, max };
}

export default StatsTable;
