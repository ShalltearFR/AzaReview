// Format prévu pour les descriptions de reliques/ornements
const formatValue = (
  valueR1: number,
  valueR5: number,
  type: string
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
      // Conversion ratio => pourcentage
      return valueR1 < 1
        ? `${format(valueR1 * 100, 2)}/${format(valueR5 * 100, 2)}`
        : // Si même valeur, n'en affiche qu'une seule
        valueR1 === valueR5
        ? format(valueR1, 0)
        : `${format(valueR1, 0)}/${format(valueR5, 0)}`;
  }
};

const generateText = (
  template: string,
  values: Array<Array<number>>
): string => {
  let text = template;
  for (let i = 0; i < values[0].length; i++) {
    const regex = new RegExp(`#${i + 1}\\[([a-zA-Z0-9]+)\\]`, "g");
    text = text.replace(regex, (match, type) =>
      formatValue(values[0][i], values[4][i], type)
    );
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

export { formatValue, generateText, splitAndKeepDelimiters };
