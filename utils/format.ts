// Format prévu pour les descriptions de reliques/ornements
const formatValue = (
  valueR1: number,
  valueR5: number,
  type: string,
  hasPercent: boolean
): string => {
  const format = (value: number, precision: number) => {
    const formattedValue = value.toFixed(precision);
    return formattedValue.endsWith(".00")
      ? formattedValue.replace(".00", "")
      : formattedValue;
  };

  switch (type) {
    // Converti à la dixieme de décimale
    case "f":
      return `${format(valueR1 * 100, 1)}/${format(valueR5 * 100, 1)}`;

    default:
      if (hasPercent && valueR1 === valueR5) return format(valueR1 * 100, 0)
      if (hasPercent) return `${format(valueR1 * 100, 2)}/${format(valueR5 * 100, 2)}`
      if (valueR1 === valueR5) return format(valueR1, 0)

      return `${format(valueR1, 0)}/${format(valueR5, 0)}`
  }
};

const generateText = (
  template: string,
  values: Array<Array<number>>
): string => {
  let text = template;
  for (let i = 0; i < values[0].length; i++) {
    const regex = new RegExp(`#${i + 1}\\[([a-zA-Z0-9]+)\\]`, "g");
    text = text.replace(regex, (match, type, offset) => {
      // offset = position du match dans text
      // vérifier si juste après le match il y a un %
      const nextChar = text[offset + match.length];
      const hasPercent = nextChar === "%";
      return formatValue(values[0][i], values[4][i], type, hasPercent);
    });
  }
  return text;
};


const splitAndKeepDelimiters = (text: string, delimiter: string): string[] => {
  // Permet de spliter tout en gardant le delimiteur
  const tempDelimiter = delimiter + "|||";
  const parts = text
    .replace(new RegExp(`\\${delimiter}`, "g"), tempDelimiter)
    .split("|||");

  return parts.map((part) => part.trim());
};

// Fonction pour supprimer les _id des objets
function removeIdsFromArrays(data: any): any {
  if (Array.isArray(data)) {
    return data.map(removeIdsFromArrays);
  } else if (data && typeof data === "object") {
    const { _id, createdAt, updatedAt, ...rest } = data; // Ne pas supprimer createdAt et updatedAt
    for (const key in rest) {
      rest[key] = removeIdsFromArrays(rest[key]);
    }
    return { createdAt, updatedAt, ...rest }; // Retourner également createdAt et updatedAt
  }
  return data;
}

export {
  formatValue,
  generateText,
  splitAndKeepDelimiters,
  removeIdsFromArrays,
};
