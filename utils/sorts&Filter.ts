import { jsonUID } from "@/types/jsonUid";

interface itemsProps {
  id: string;
  recommended: boolean;
  num?: number;
}

const sortReviewDataByUidData = (reviewData: any, uidData: any) => {
  const sortedArray = uidData.map((uidItem: any) => {
    const matchingItem = reviewData.find(
      (reviewItem: any) => reviewItem.id === uidItem.id
    );
    return matchingItem ? matchingItem : { value: "NC" };
  });

  return sortedArray;
};

const sortRelics = (
  RelicsList: Array<any>,
  uidDataCopy: jsonUID,
  setUidData: (value: { status: number } | jsonUID) => void
) => {
  const orderOfType = ["HEAD", "HAND", "BODY", "FOOT", "NECK", "OBJECT"];

  const customSort = (a: any, b: any) => {
    const typeA = RelicsList.find((item) => item.id === a.id)?.type;
    const typeB = RelicsList.find((item) => item.id === b.id)?.type;

    // Utiliser l'ordre défini pour trier
    const indexA = orderOfType.indexOf(typeA);
    const indexB = orderOfType.indexOf(typeB);

    return indexA - indexB;
  };

  const charactersList = uidDataCopy.characters.map((character, index) => {
    if (character.relics) {
      if (character.relics.length === 0) return character;

      // Create a sorted copy of the relics array
      const data = uidDataCopy.characters[index];
      data.relics = [...character.relics].sort(customSort);
      return data;
    }
    return character;
  });
  uidDataCopy.characters = charactersList;

  setUidData(uidDataCopy);
};

// Evite les doublons d'id entre les recommandés et non recommandés
const filterLightconeID = (items: itemsProps[]) => {
  const lightconesIdsData: { [id: string]: boolean } = {};
  const itemsFilter: any[] = [];
  for (const item of items) {
    if (!lightconesIdsData[item.id]) {
      lightconesIdsData[item.id] = true;
      itemsFilter.push(item);
    } else if (item.recommended) {
      const existingItem = itemsFilter.find(
        (existing) => existing.id === item.id
      );
      if (existingItem) {
        existingItem.recommended = true;
      }
    }
  }
  return itemsFilter;
};

// Sépare les reliques et ornements
// const separateRelics = (items: itemsProps[], isOrnament: boolean) => {
//   const filteredItems = [...items].filter((item) =>
//     relicsSetList.find(
//       (relic) => relic.isOrnamant === isOrnament && item.id === relic.id
//     )
//   );
//   return filteredItems;
// };

// Evite les doublon d'id sur les relics
// Si 2P et 4P sur meme ID, renomage de num à 2.4 pour indiquer 2P et 4P
const filterRelicID = (items: itemsProps[]) => {
  const uniqueIDs = new Set();
  const result = [...items]
    .filter((relic) => relic.recommended === false)
    .filter((item) => {
      if (uniqueIDs.has(item.id)) {
        return false;
      }
      uniqueIDs.add(item.id);
      if (item.num === 4) {
        item.num = 2.4;
      }
      return true;
    });
  return result;
};

export {
  sortReviewDataByUidData,
  sortRelics,
  filterLightconeID,
  filterRelicID,
};
