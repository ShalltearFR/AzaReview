const getFRDefaultValue = (field: string) => {
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

export {
  getFRDefaultValue,
};
