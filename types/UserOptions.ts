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
}

const DefaultUserOptions: UserOptionsProps = {
  showNotation: true,
  showRelicProc: true,
  showRecommandedStats: true,
  showRecommandedStatsCom: true,
  showRedstats: true,
  showInformations: true,
};

export { DefaultUserOptions };
export type { UserOptionsProps };
