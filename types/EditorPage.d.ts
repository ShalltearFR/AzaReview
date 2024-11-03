// Partie Edit
interface Option {
  value: string;
  label: string;
  num?: number;
  id?: string;
}

interface LightConeOption {
  value: any;
  recommended: boolean;
  label: string;
  id: string;
  uid?: string;
}

interface RelicSetOption {
  value: any;
  recommended: boolean;
  label: string;
  num: number;
  id: string;
  uid?: string;
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

// Partie Multi Edit

interface CharacterMultiEdit {
  id: string;
  preview: string;
  buildsChecked: boolean[];
  buildsName: string[];
}

interface MultiEditData {
  action: "add" | "delete";
  Characters: CharacterMultiEdit[];
  lightCones: LightConeOption[];
  relics_set: RelicSetOption[];
  ornaments_set: RelicSetOption[];
}

export type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
  MultiEditData,
  CharacterMultiEdit,
};
