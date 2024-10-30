import parser from "bbcode-to-react";

const translateBBCode = (text: string) => {
  if (!text) return "";
  if (text.includes("\n")) {
    const slicedText = text.split("\n");
    return slicedText.map((textSliced) => {
      return <p key={crypto.randomUUID()}>{parser.toReact(textSliced)}</p>;
    });
  }
  return parser.toReact(text);
};

export default translateBBCode;
