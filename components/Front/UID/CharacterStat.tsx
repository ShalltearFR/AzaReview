import React from "react";
import { CDN } from "@/utils/cdn";
import { Addition, Attribute } from "@/types/jsonUid";
import { RecommendedStats } from "@/types/CharacterModel";
import { fieldToType } from "@/utils/calculateStat";
import { getENDefaultValue, getFRDefaultValue } from "@/utils/dictionnary";

interface CharacterStatProps {
  attributes: Attribute[];
  additions: Addition[];
  field: string;
  review: RecommendedStats[];
  lang: string | undefined;
}

const CharacterStat: React.FC<CharacterStatProps> = ({
  attributes,
  additions,
  field,
  review,
  lang,
}) => {
  const attributeIndex = attributes.findIndex(
    (attribute) => attribute.field === field
  );
  const additionIndex = additions.findIndex(
    (addition) => addition.field === field
  );

  let value = 0;
  let img: string, name: string, isPercent: boolean;

  if (lang === "fr" || lang === undefined) {
    name = getFRDefaultValue(field).name;
    img = getFRDefaultValue(field).img;
    isPercent = getFRDefaultValue(field).isPercent;
  } else {
    name = getENDefaultValue(field).name;
    img = getENDefaultValue(field).img;
    isPercent = getENDefaultValue(field).isPercent;
  }

  if (field === "sp_rate") value = 100;

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
      if (field === "sp_rate") value = value + 1; // Permet d'avoir le 100% de base
      value = Math.floor(value * 1000) / 10;

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
    <div className="flex text-white items-center text-lg">
      <img src={`${CDN}/${img}`} className="w-[30px]" alt={name} />
      <span className="ml-1">{name}</span>
      <span
        className={`ml-auto text-right ${!isGoodValue() ? "text-red" : ""}`}
      >{`${value.toLocaleString("fr")}${isPercent ? "%" : ""}`}</span>
    </div>
  );
};

export default CharacterStat;
