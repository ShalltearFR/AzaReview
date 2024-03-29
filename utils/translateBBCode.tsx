import parser from "bbcode-to-react";

const translateBBCode = (text: string) => {
  const textArray = text.split("\n");
  const result = textArray.map((el) => (
    <p key={crypto.randomUUID()}>{parser.toReact(el)}</p>
  ));
  return result;
};

export default translateBBCode;
