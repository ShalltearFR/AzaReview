import React from "react";
import { CDN } from "@/utils/cdn";
import { Addition, Attribute } from "@/types/jsonUid";
import { RecommendedStats } from "@/types/CharacterModel";
import { fieldToType } from "@/utils/calculateStat";

interface CharacterStatProps {
  attributes: Attribute[];
  additions: Addition[];
  field: string;
  review: RecommendedStats[];
}

const getDefaultValue = (field: string) => {
  switch (field) {
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
  field,
  review,
}) => {
  const attributeIndex = attributes.findIndex(
    (attribute) => attribute.field === field
  );
  const additionIndex = additions.findIndex(
    (addition) => addition.field === field
  );

  let { img, name, value, isPercent } = getDefaultValue(field);

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
      if (field === "sp_rate") value += 100;
      isPercent = true;
    } else {
      value = Math.floor(value);
    }
  }

  // Verifie si la stat est bonne
  const isGoodValue = () => {
    const recommendedObject =
      review && review.find((el) => el.type === fieldToType(field));
    const recommendedType = recommendedObject?.type || "";
    let recommendedValue = recommendedObject?.value || 0;

    const allowedTypes = [
      "CriticalChanceBase",
      "CriticalDamageBase",
      "BreakDamageAddedRatioBase",
      "StatusProbabilityBase",
      "StatusResistanceBase",
      "SPRatioBase",
    ];
    if (allowedTypes.includes(recommendedType)) {
      recommendedValue = recommendedValue * 100;
    }

    if (value >= recommendedValue) return true;
    return false;
  };

  return (
    <div key={`stat${field}`} className="flex text-white items-center text-xl">
      <img src={`${CDN}/${img}`} className="w-8" alt={name} />
      <span className="ml-1">{name}</span>
      <span
        className={`ml-auto text-right ${!isGoodValue() ? "text-red" : ""}`}
      >{`${value.toLocaleString("fr")}${isPercent ? "%" : ""}`}</span>
    </div>
  );
};

export default CharacterStat;
