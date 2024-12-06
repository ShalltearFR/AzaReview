interface UserOptionsProps {
  // Reliques
  showNotation: boolean;
  showRelicProc: boolean;
  // Stats
  showRecommandedStats: boolean;
  showRecommandedStatsCom: boolean;
  // Autres
  showRedstats: boolean;
  showInformations: boolean;
  // Image BG
  imageBG: string;
}

const DefaultUserOptions: UserOptionsProps = {
  showNotation: true,
  showRelicProc: true,
  showRecommandedStats: true,
  showRecommandedStatsCom: true,
  showRedstats: true,
  showInformations: true,
  imageBG: "",
};

export { DefaultUserOptions };
export type { UserOptionsProps };
