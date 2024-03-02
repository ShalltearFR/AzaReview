import { RecommendedStats } from "@/types/CharacterModel";
import { RelicSubAffix } from "@/types/jsonUid";

interface AverageProc {
  type: string;
  value: number;
}

const averageProc: AverageProc[] = [
  {
    type: "AttackDelta",
    value: 19,
  },
  {
    type: "AttackAddedRatio",
    value: 0.0389,
  },
  {
    type: "DefenseDelta",
    value: 19,
  },
  {
    type: "DefenseAddedRatio",
    value: 0.0486,
  },
  {
    type: "HPDelta",
    value: 38,
  },
  {
    type: "HPAddedRatio",
    value: 0.0389,
  },
  {
    type: "StatusProbabilityBase",
    value: 0.0389,
  },
  {
    type: "CriticalChanceBase",
    value: 0.02917,
  },
  {
    type: "CriticalDamageBase",
    value: 0.05833,
  },
  {
    type: "StatusResistanceBase",
    value: 0.0389,
  },
  {
    type: "BreakDamageAddedRatioBase",
    value: 0.0583,
  },
  {
    type: "SpeedDelta",
    value: 2.3,
  },
];

const calculateRelic = (
  list: RecommendedStats[],
  sub_affix: RelicSubAffix[],
  totalCoef: number
) => {
  const arrayResult = sub_affix.map((subStat) => {
    const procValue =
      averageProc.find((el) => el.type === subStat.type)?.value ?? 0;
    const recommendedStat = list?.find((el) => el.type === subStat.type) ?? {
      value: 0,
      importance: 0,
    };
    //         3200       /    38      *          0.3
    return (subStat.value / procValue) * recommendedStat.importance || 0;
  });

  const result = arrayResult.reduce(
    (acc, valeur) => (acc ?? 0) + (valeur ?? 0),
    0
  );

  let resultLetter: string = "";
  if (result >= 0 && result < 0.25 * totalCoef) resultLetter = "D";
  if (result >= 0.25 * totalCoef && result < 0.4 * totalCoef)
    resultLetter = "D+";
  if (result >= 0.4 * totalCoef && result < 0.55 * totalCoef)
    resultLetter = "C";
  if (result >= 0.55 * totalCoef && result < 0.7 * totalCoef)
    resultLetter = "C+";
  if (result >= 0.7 * totalCoef && result < 0.78 * totalCoef)
    resultLetter = "B";
  if (result >= 0.78 * totalCoef && result < 0.86 * totalCoef)
    resultLetter = "B+";
  if (result >= 0.86 * totalCoef && result < 0.94 * totalCoef)
    resultLetter = "A";
  if (result >= 0.94 * totalCoef && result < 1.02 * totalCoef)
    resultLetter = "A+";
  if (result >= 1.02 * totalCoef && result < 1.1 * totalCoef)
    resultLetter = "S";
  if (result >= 1.1 * totalCoef && result < 1.18 * totalCoef)
    resultLetter = "S+";
  if (result >= 1.18 * totalCoef && result < 1.26 * totalCoef)
    resultLetter = "SS";
  if (result >= 1.26 * totalCoef && result < 1.34 * totalCoef)
    resultLetter = "SS+";
  if (result >= 1.34 * totalCoef) resultLetter = "SSS";

  return resultLetter;
};

export default calculateRelic;
