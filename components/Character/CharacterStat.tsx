import React from "react";
import CDN from "@/utils/cdn";
import { Addition, Attribute } from "@/utils/jsonUid";

interface CharacterStatProps {
  attributes: Attribute[];
  additions: Addition[];
  type: string;
  key: string;
}

const getDefaultValue = (type: string) => {
  switch (type) {
    case "sp_rate":
      return {
        img: "/icon/property/IconEnergyRecovery.png",
        name: "Taux de régénération d'énergie",
        value: 100,
        isPercent: true,
      };
    case "effect_res":
      return {
        img: "/icon/property/IconStatusResistance.png",
        name: "RÉS aux effets",
        value: 0,
        isPercent: true,
      };
    case "effect_hit":
      return {
        img: "icon/property/IconStatusProbability.png",
        name: "Chances d'app. des effets",
        value: 0,
        isPercent: true,
      };
    case "break_dmg":
      return {
        img: "icon/property/IconBreakUp.png",
        name: "Effet de Rupture",
        value: 0,
        isPercent: true,
      };
    default:
      return {
        img: "",
        name: "",
        value: 0,
        isPercent: false,
      };
  }
};

const CharacterStat: React.FC<CharacterStatProps> = ({
  attributes,
  additions,
  type,
  key,
}) => {
  const attributeIndex = attributes.findIndex(
    (attribute) => attribute.field === type
  );
  const additionIndex = additions.findIndex(
    (addition) => addition.field === type
  );

  let { img, name, value, isPercent } = getDefaultValue(type);

  if (attributeIndex !== -1) {
    img = attributes[attributeIndex].icon;
    name = attributes[attributeIndex].name;

    if (additionIndex !== -1) {
      value +=
        additions[additionIndex].value + attributes[attributeIndex].value;
    } else {
      value += attributes[attributeIndex].value;
    }
    if (attributes[attributeIndex].percent) {
      value = Math.floor(value * 1000) / 10;
      isPercent = true;
    } else {
      value = Math.floor(value);
    }
  } else if (additionIndex !== -1) {
    img = additions[additionIndex].icon;
    name = additions[additionIndex].name;
    value = additions[additionIndex].value;

    if (additions[additionIndex].percent) {
      value = Math.floor(value * 1000) / 10;
      if (type === "sp_rate") value += 100;
      isPercent = true;
    } else {
      value = Math.floor(value);
    }
  }

  return (
    <div key={key} className="flex text-white items-center text-xl">
      <img src={`${CDN}/${img}`} className="w-8" alt={name} />
      <span className="ml-1">{name}</span>
      <span className="ml-auto ">{`${value}${isPercent ? " %" : ""}`}</span>
    </div>
  );
};

export default CharacterStat;
