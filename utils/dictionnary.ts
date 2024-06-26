interface TitlesByLanguage {
  fr: Titles;
  en: Titles;
}

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

const getENDefaultValue = (field: string) => {
  switch (field) {
    case "sp_rate":
      return {
        img: "/icon/property/IconEnergyRecovery.png",
        name: "Energy Regeneration Rate",
        value: 100,
        isPercent: true,
      };
    case "effect_res":
      return {
        img: "/icon/property/IconStatusResistance.png",
        name: "Effect RES",
        value: 0,
        isPercent: true,
      };
    case "effect_hit":
      return {
        img: "icon/property/IconStatusProbability.png",
        name: "Effect Hit Rate",
        value: 0,
        isPercent: true,
      };
    case "break_dmg":
      return {
        img: "icon/property/IconBreakUp.png",
        name: "Break Effect",
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

// PARTIE TRACES
const traces: Record<string, string[]> = {
  fr: ["Attaque", "Compétence", "Ultime", "Talent"],
  en: ["Attack", "Skill", "Ultimate", "Talent"],
};

// PARTIE TITRES et Mots page UID
interface Titles {
  stat: string;
  relicsSet: string;
  lightCone: string;
  lightCones: string;
  pioneer: string;
  search: string;
  searching: string;
  downloadImage: string;
  shareImage: string;
  levelMin: string;
  RecommendedF2P: string;
  RecommendedsF2P: string;
  RelicsOrnaments: string;
  OtherChoices: string;
  RecommendedStats: string;
  SortBy: string;
  Recommendeds: string;
  Recommended: string;
  emptyCone: string;
  emptyRelicSet: string;
  PossibleOrnaments: string;
  PossibleRelics: string;
  NoCompletlyRelics1: string;
  NoCompletlyRelics2: string;
  RecommendedChests: string;
  RecommendedBoots: string;
  RecommendedOrbs: string;
  RecommendedLinkRopes: string;
  AvailableSoon: string;
  Downloading: string;
  DownloadImage: string;
  Saving: string;
  ImageCopied: string;
  CreatedBy: string;
  ReviewBy: string;
  HomepageDesign: string;
  PayLess: string;
  HoyoCopyright: string;
  ENtranslate: string;
  CharacterSearch: string;
}

const UIDtitles: TitlesByLanguage = {
  fr: {
    stat: "Statistiques recommandées",
    relicsSet: "Sets équipés",
    lightCone: "Cône de lumière",
    lightCones: "Cône de lumières",
    pioneer: "Pionnier ",
    search: "Rechercher",
    searching: "Recherche",
    downloadImage: "Telecharger l'image",
    shareImage: "Partager",
    levelMin: "Niv. ",
    RecommendedF2P: "F2P recommandé :",
    RecommendedsF2P: "Recommandés F2P/Accessibles",
    RelicsOrnaments: "Sets de reliques + Ornements",
    OtherChoices: "Autres bons choix",
    RecommendedStats: "Statistiques recommandées",
    SortBy: "Trier par :",
    Recommendeds: "Recommandés",
    Recommended: "Recommandé :",
    emptyCone: "Aucun cône equipé",
    emptyRelicSet: "Pas de set équipé",
    PossibleOrnaments: "Ornements possibles :",
    PossibleRelics: "Reliques possibles :",
    NoCompletlyRelics1: "Relique(s) ou Ornement(s) manquant(s)",
    NoCompletlyRelics2:
      "Veuillez équiper [color=#FFCD6C]6 pièces[/color] pour aligner les Astres",
    RecommendedChests: "Torse recommandés :",
    RecommendedBoots: "Bottes recommandées :",
    RecommendedOrbs: "Orbe recommandées :",
    RecommendedLinkRopes: "Corde recommandées :",
    AvailableSoon: "Disponible prochainement",
    Downloading: "Telechargement en cours...",
    DownloadImage: "Telecharger l'image",
    Saving: "Sauvegarde en cours...",
    ImageCopied: "Image copiée avec succès",
    CreatedBy: "Création par ",
    ReviewBy: "Review par ",
    HomepageDesign: "Design page d'accueil par ",
    PayLess: "Payez moins cher avec ",
    HoyoCopyright:
      "Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du jeu sont des marques déposées et des droits d'auteur de Hoyoverse.",
    ENtranslate: `Traduction anglaise par `,
    CharacterSearch: "Rechercher un personnage",
  },
  en: {
    stat: "Recommended Statistics",
    relicsSet: "Equipped Sets",
    lightCone: "Light Cone",
    lightCones: "Light Cones",
    pioneer: "Pioneer ",
    search: "Search",
    searching: "Searching",
    downloadImage: "Download Image",
    shareImage: "Share",
    levelMin: "Lvl. ",
    RecommendedF2P: "Recommended F2P :",
    RecommendedsF2P: "Recommended F2P/Accessible",
    RelicsOrnaments: "Relics sets + Ornaments",
    OtherChoices: "Other good choices",
    RecommendedStats: "Recommended Statistics",
    SortBy: "Sort by",
    Recommendeds: "Recommended :",
    Recommended: "Recommended :",
    emptyCone: "No cone equipped",
    emptyRelicSet: "No set equipped",
    PossibleOrnaments: "Possible ornaments :",
    PossibleRelics: "Possible relics :",
    NoCompletlyRelics1: "Missing relic(s) or ornament(s)",
    NoCompletlyRelics2:
      "Please equip [color=#FFCD6C]6 pieces[/color] to align the Stars",
    RecommendedChests: "Recommended chest :",
    RecommendedBoots: "Recommended boots :",
    RecommendedOrbs: "Recommended orb :",
    RecommendedLinkRopes: "Recommended Link Rope :",
    AvailableSoon: "Available soon",
    Downloading: "Downloading..",
    DownloadImage: "Download image",
    Saving: "Saving...",
    ImageCopied: "Image copied successfully",
    CreatedBy: "Created by ",
    ReviewBy: "Review By ",
    HomepageDesign: "Homepage design by ",
    PayLess: "Pay less with ",
    HoyoCopyright:
      "This site is not affiliated with Hoyoverse and all game content and assets are trademarks and copyrights of Hoyoverse.",
    ENtranslate: "English translation by ",
    CharacterSearch: "Character search",
  },
};

export { getFRDefaultValue, getENDefaultValue, traces, UIDtitles };
export type { TitlesByLanguage };
