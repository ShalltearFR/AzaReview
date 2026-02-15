import parser from "bbcode-to-react";

const translateBBCode = (text: string, isUIDPage? : boolean) => {
  if (!text) return "";
  if (text.includes("\n")) {
    const slicedText = text.split("\n");
    return slicedText.map((textSliced,i) => {
      return (
        <p key={isUIDPage ? `UIDComment+${i}`: textSliced.substring(0, 10)}>{parser.toReact(textSliced)}</p>
      );
    });
  }
  return parser.toReact(text);
};

export default translateBBCode;
