import parser from "bbcode-to-react";

const translateBBCode = (text: string) => {
  if (!text) return "";
  return parser.toReact(text);
};

export default translateBBCode;
