import { jsonUID } from "@/types/jsonUid";

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

export { sortReviewDataByUidData, sortRelics };
