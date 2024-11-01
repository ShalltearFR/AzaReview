"use client";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { CDN } from "@/utils/cdn";
import light_conesFR from "@/static/light_conesFR.json";
import relic_setsFR from "@/static/relic_setsFR.json";
import {
  mainStatOptions,
  equipments,
  recommendedStatsOptions,
} from "@/utils/statsOption";

interface Option {
  value: string;
  label: string;
  id?: string;
}

interface AddSelectProps {
  type?:
    | "lightCone"
    | "relicSet"
    | "num"
    | "typeStat"
    | "equipments"
    | "ormanentSet"
    | "recommendedStats";
  value: Option | null;
  index: number;
  recommended?: boolean;
  className?: string;
  onChange: (
    option: SingleValue<Option>,
    index: number,
    isRecommended: boolean
  ) => void;
}

const AddSelect: React.FC<AddSelectProps> = ({
  type,
  value,
  index,
  recommended = false,
  className,
  onChange,
}) => {
  const handleSelectChange = (option: SingleValue<Option>) => {
    onChange(option, index, recommended);
  };

  const [image, setImage] = useState<string>("");
  const [options, setOptions] = useState<Option[]>();

  useEffect(() => {
    if (type === "lightCone") {
      const cone = light_conesFR.find((cone) => cone.id === value?.id);
      setImage(cone?.icon ?? "");
    }
    if (type === "relicSet" || type === "ormanentSet") {
      const relic = relic_setsFR.find((relic) => relic.id === value?.id);
      setImage(relic?.icon ?? "");
    }
  }, [value]);

  useEffect(() => {
    if (type === "lightCone") {
      const options = light_conesFR.map((el) => ({
        value: el.id,
        id: el.id,
        label: el.name,
      }));
      setOptions(options);
    }
    if (type === "relicSet") {
      const options = relic_setsFR
        .map((el) => {
          if (Number(el.id) > 300) return null;
          return {
            value: el.id,
            id: el.id,
            label: el.name,
          };
        })
        .filter((el) => el !== null);

      setOptions(options);
    }

    if (type === "ormanentSet") {
      const options = relic_setsFR
        .map((el) => {
          if (Number(el.id) < 300) return null;
          return {
            value: el.id,
            id: el.id,
            label: el.name,
          };
        })
        .filter((el) => el !== null);

      setOptions(options);
    }
    if (type === "num") {
      const numOptions = [
        {
          value: "2",
          label: "2",
          id: "2,",
        },
        {
          value: "4",
          label: "4",
          id: "4,",
        },
      ];
      setOptions(numOptions);
    }
    if (type === "typeStat") {
      const options = mainStatOptions.map((el) => ({
        value: el.value,
        label: el.label,
      }));
      setOptions(options);
    }
    if (type === "equipments") {
      const options = equipments.map((el) => ({
        value: el.value,
        label: el.label,
      }));
      setOptions(options);
    }
    if (type === "recommendedStats") {
      const options = recommendedStatsOptions.map((el) => ({
        value: el.value,
        label: el.label,
      }));
      setOptions(options);
    }
  }, []);

  return (
    <label
      className={`flex items-center gap-3 h-14 ${type === "num" && "w-20"}`}
    >
      {/* Affiche l'image même lorsque le sélecteur n'est pas actif */}
      {(type === "lightCone" ||
        type === "relicSet" ||
        type === "ormanentSet") && (
        <img src={`${CDN}/${image}`} className="h-12" height={48} />
      )}

      <Select
        options={options}
        value={value}
        styles={{
          control: (base: any) => ({
            ...base,
            border: "0",
            borderRadius: "0",
            backgroundColor: "white",
          }),
          menu: (base: any) => ({
            ...base,
            backgroundColor: "white",
            color: "black",
          }),
          singleValue: (base: any) => ({
            ...base,
            color: "black",
          }),
        }}
        className={className}
        onChange={handleSelectChange}
      />
    </label>
  );
};

export default AddSelect;
