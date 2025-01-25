import { toPng, toJpeg, toBlob } from "html-to-image";
import { UIDtitles } from "./dictionnary";
import { jsonUID } from "@/types/jsonUid";
import { RefObject } from "react";
import { TranslateSection } from "@/types/homepageDictionnary";

export const convertImage = (
  exportType: string,
  disableButton: (value: boolean) => void,
  setShareButtonText: (value: string) => void,
  characterDetailsRef: HTMLDivElement | null,
  lang: keyof TranslateSection | undefined,
  characterIndex: number,
  uidData: jsonUID
) => {
  if (characterDetailsRef === null) return;

  disableButton(true);

  if (exportType === "share")
    setShareButtonText(UIDtitles[lang ?? "fr"].Saving);

  setTimeout(() => {
    let conversionPromise;

    if (window.innerWidth >= 650) {
      // Tablette/Desktop
      conversionPromise = toPng(characterDetailsRef as HTMLDivElement);
    } else {
      // Mobile
      conversionPromise = toJpeg(characterDetailsRef as HTMLDivElement, {
        quality: 0.5,
      });
    }

    conversionPromise
      .then((dataImage) => {
        if (exportType === "save") {
          const uidDataCopy = { ...uidData } as jsonUID;
          const link = document.createElement("a");
          link.download = `Review HSR - ${uidDataCopy.characters[characterIndex].name}`;
          link.href = dataImage;
          link.click();
          disableButton(false);
        } else if (exportType === "share") {
          toBlob(characterDetailsRef as HTMLDivElement).then((blob: any) => {
            navigator.clipboard
              .write([
                new ClipboardItem({
                  "image/png": blob,
                }),
              ])
              .then(() => {
                setShareButtonText(UIDtitles[lang ?? "fr"].ImageCopied);
                setTimeout(() => disableButton(false), 1000);
              })
              .catch((err) => console.log("Erreur presse papier :", err));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);
};
