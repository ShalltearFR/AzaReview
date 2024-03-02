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
  sub_affix: RelicSubAffix[]
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
  if (result >= 0 && result < 1.5) resultLetter = "D";
  if (result >= 1.5 && result < 2.5) resultLetter = "D+";
  if (result >= 2.5 && result < 3.5) resultLetter = "C";
  if (result >= 3.5 && result < 4) resultLetter = "C+";
  if (result >= 4 && result < 4.5) resultLetter = "B";
  if (result >= 4.5 && result < 5) resultLetter = "B+";
  if (result >= 5 && result < 5.5) resultLetter = "A";
  if (result >= 5.5 && result < 6) resultLetter = "A+";
  if (result >= 6 && result < 6.5) resultLetter = "S";
  if (result >= 6.5 && result < 7) resultLetter = "S+";
  if (result >= 7 && result < 7.5) resultLetter = "SS";
  if (result >= 7.5 && result < 8) resultLetter = "SS+";
  if (result >= 8) resultLetter = "SSS";

  return resultLetter;
};

export default calculateRelic;
