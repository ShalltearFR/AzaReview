const fieldAndType = [
  {
    field: "hp",
    type: "HPDelta",
  },
  {
    field: "atk",
    type: "AttackDelta",
  },
  {
    field: "def",
    type: "DefenseDelta",
  },
  {
    field: "spd",
    type: "SpeedDelta",
  },
  {
    field: "crit_rate",
    type: "CriticalChanceBase",
  },
  {
    field: "crit_dmg",
    type: "CriticalDamageBase",
  },
  {
    field: "break_dmg",
    type: "BreakDamageAddedRatioBase",
  },
  {
    field: "effect_hit",
    type: "StatusProbabilityBase",
  },
  {
    field: "effect_res",
    type: "StatusResistanceBase",
  },
  {
    field: "sp_rate",
    type: "SPRatioBase",
  },
];

const fieldToType = (field: string) => {
  const converter = fieldAndType.find((el) => el.field === field);
  return converter?.type;
};

export { fieldToType };
