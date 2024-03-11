interface Option {
  value: string;
  label: string;
  num?: number;
}

interface LightConeOption {
  value: any;
  recommended: boolean;
  label: string;
  id: string;
}

interface RelicSetOption {
  value: any;
  recommended: boolean;
  label: string;
  num: number;
  id: string;
}

interface MainStatsOption {
  equipment: Option;
  typeStat: Option;
}

interface recommendedStatsOption {
  type: Option;
  value: string;
  importance: string;
}

export type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
};
