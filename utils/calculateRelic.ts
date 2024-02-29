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

export default averageProc;
