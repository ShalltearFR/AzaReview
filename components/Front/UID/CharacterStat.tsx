import React, { useMemo } from "react";
import { CDN } from "@/utils/cdn";
import { Addition, Attribute, Property } from "@/types/jsonUid";
import { RecommendedStats } from "@/types/CharacterModel";
import { fieldToType } from "@/utils/calculateStat";
import { getENDefaultValue, getFRDefaultValue } from "@/utils/dictionnary";
import { TranslateSection } from "@/types/homepageDictionnary";

interface CharacterStatProps {
  attributes: Attribute[];
  additions: Addition[];
  properties: Property[];
  field: string;
  review: RecommendedStats[];
  lang: keyof TranslateSection | undefined;
  showRedstats: boolean;
}

const CharacterStat: React.FC<CharacterStatProps> = ({
  attributes,
  additions,
  field,
  review,
  lang,
  showRedstats,
  properties,
}) => {
  // Memorise les noms des valeurs FR/EN
  const defaultValues = useMemo(() => {
    return lang === "fr" || lang === undefined
      ? getFRDefaultValue(field)
      : getENDefaultValue(field);
  }, [field, lang]);

  const { name, img, isPercent: defaultIsPercent } = defaultValues;

  // Memorise les calculs
  const [calculatedValue, isPercent] = useMemo(() => {
    const baseValue = 100; // baseValue pour gerer le cas sp_rate
    let totalValue = 0;
    let percent = defaultIsPercent;

    // Calculate total value based on attributes and additions
    const attribute = attributes.find((attr) => attr.field === field);
    const addition = additions.find((add) => add.field === field);

    console.log(addition);

    if (addition?.name === "VIT") {
      const detectBaseSpeed = properties.find((el) => el.type === "BaseSpeed"); // Detecte une vitesse supplémentaire par rapport au cone
      if (detectBaseSpeed) totalValue += detectBaseSpeed.value;
    }

    if (attribute) totalValue += attribute.value;

    if (addition) totalValue += addition.value;

    // Gère la partie sp_rate
    if (field === "sp_rate") {
      totalValue = Math.floor((baseValue + totalValue * 100) * 10) / 10;
      percent = true;
    } else if (attribute?.percent || addition?.percent) {
      // Si la valeur est un pourcentage
      totalValue = Math.floor(totalValue * 1000) / 10;
      percent = true;
    } else {
      // Si ce n'est pas un pourcentage
      totalValue = Math.floor(totalValue);
    }

    return [totalValue, percent];
  }, [field, attributes, additions, defaultIsPercent]);

  // Memorise la valeur
  const isGoodValue = useMemo(() => {
    // Si review n'est pas defini, arrete la fonction
    if (!review || review.length === 0) return true;

    // Va chercher l'objet de la stat recherché
    const recommendedObject = review.find(
      (el) => el.type === fieldToType(field)
    );

    // Obtient sa valeur
    const recommendedValue = recommendedObject?.value || 0;

    const allowedTypes = [
      "CriticalChanceBase",
      "CriticalDamageBase",
      "BreakDamageAddedRatioBase",
      "StatusProbabilityBase",
      "StatusResistanceBase",
      "SPRatioBase",
    ];

    // Si la valeur est de type pourcentage (qui est dans allowedTypes) => * 100 sinon retourne la valeur de base
    const isAllowedType =
      recommendedObject && allowedTypes.includes(recommendedObject.type);
    const adjustedRecommendedValue = isAllowedType
      ? recommendedValue * 100
      : recommendedValue;

    return calculatedValue >= adjustedRecommendedValue;
  }, [calculatedValue, field, review]);

  // Retrouve le nom et l'image de cette valeur
  const displayName =
    attributes.find((attr) => attr.field === field)?.name ||
    additions.find((add) => add.field === field)?.name ||
    name;
  const displayImg =
    attributes.find((attr) => attr.field === field)?.icon ||
    additions.find((add) => add.field === field)?.icon ||
    img;

  return (
    <div className="flex text-white items-center text-lg">
      <img
        src={`${CDN}/${displayImg}`}
        width={30}
        height={30}
        alt={displayName}
      />
      <span className="ml-1">{displayName}</span>
      <span
        className={`ml-auto text-right ${
          !isGoodValue && showRedstats ? "text-red" : ""
        }`}
      >
        {`${calculatedValue.toLocaleString("fr")}${isPercent ? "%" : ""}`}
      </span>
    </div>
  );
};

export default CharacterStat;
