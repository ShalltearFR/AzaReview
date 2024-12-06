import { toPng, toJpeg, toBlob } from "html-to-image";
import { UIDtitles } from "./dictionnary";
import { jsonUID } from "@/types/jsonUid";
import { TranslateSection } from "@/types/homepageDictionnary";

const waitForBackgroundImage = (
  element: HTMLElement,
  timeout = 5000
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const interval = 100; // Vérifie toutes les 100ms
    let elapsedTime = 0;

    const checkBackgroundImage = () => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      if (backgroundImage && backgroundImage !== "none") {
        resolve();
        return;
      }

      elapsedTime += interval;
      if (elapsedTime >= timeout) {
        reject(new Error("Timeout: L'image de fond n'a pas pu être chargée."));
        return;
      }

      setTimeout(checkBackgroundImage, interval);
    };

    checkBackgroundImage();
  });
};

export const convertImage = async (
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

  if (exportType === "share") {
    setShareButtonText(UIDtitles[lang ?? "fr"].Saving);
  }

  setTimeout(async () => {
    const child = characterDetailsRef.children[0]; // Remplacez `.child-class` par la classe réelle de l'enfant avec l'image de fond
    if (child && child instanceof HTMLElement) {
      await waitForBackgroundImage(child); // Attendez le chargement de l'image d'arrière-plan

      // Vérifiez que le style background-image est bien défini
      const backgroundImage = getComputedStyle(child).backgroundImage;
      if (!backgroundImage || backgroundImage === "none") {
        console.error(
          "Le style background-image n'est pas appliqué sur l'élément."
        );
        disableButton(false);
        return;
      }

      // Petit délai pour s'assurer que tout est bien chargé
      await new Promise((resolve) => setTimeout(resolve, 500));

      let conversionPromise;

      if (window.innerWidth >= 650) {
        // Tablette/Desktop
        conversionPromise = toPng(child);
      } else {
        // Mobile
        conversionPromise = toJpeg(child, {
          quality: 0.5,
        });
      }

      conversionPromise
        .then((dataImage) => {
          if (exportType === "save") {
            const link = document.createElement("a");
            link.download = `Review HSR`;
            link.href = dataImage;
            link.click();
            disableButton(false);
          } else if (exportType === "share") {
            toBlob(child).then((blob: any) => {
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
          disableButton(false);
        });
    } else {
      console.error(
        "Impossible de trouver un HTMLElement valide dans firstChild !"
      );
      disableButton(false);
    }
  }, 10000);
};
