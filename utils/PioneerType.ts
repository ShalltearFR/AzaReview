import { CharacterType } from "@/types/CharacterModel";

interface PioneerTypeProps {
  id: string;
  nameFR: string;
  nameEN: string;
}

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    nameFR: "Caelius Destruction",
    nameEN: "Caelius Destruction",
  },
  {
    id: "8003",
    nameFR: "Caelius Preservation",
    nameEN: "Caelius Preservation",
  },
  {
    id: "8005",
    nameFR: "Caelius Harmonie",
    nameEN: "Caelius Harmony",
  },
];

const PioneerToRemove: Array<String> = ["8002", "8004", "8006"];

const replacePioneerName = (
  lang: string | undefined,
  charactersList: CharacterType[]
) => {
  if (lang === "en") {
    const filteredCharactersCopy = [...charactersList].map((character) => {
      if (character.id === "8001")
        return {
          ...character,
          name: "Caelius Destruction",
        };
      if (character.id === "8003")
        return {
          ...character,
          name: "Caelius Preservation",
        };
      if (character.id === "8005")
        return {
          ...character,
          name: "Caelius Harmony",
        };
      return character;
    });
    return filteredCharactersCopy;
  } else {
    const filteredCharactersCopy = [...charactersList].map((character) => {
      if (character.id === "8001")
        return {
          ...character,
          name: "Caelius Destruction",
        };
      if (character.id === "8003")
        return {
          ...character,
          name: "Caelius Preservation",
        };
      if (character.id === "8005")
        return {
          ...character,
          name: "Caelius Harmonie",
        };
      return character;
    });
    return filteredCharactersCopy;
  }
};

export { PioneerType, PioneerToRemove, replacePioneerName };
export type { PioneerTypeProps };
