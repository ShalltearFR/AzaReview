import React, { useState } from "react";
import LoadingSpin from "@/components/LoadingSpin"; // Assurez-vous d'importer correctement le composant LoadingSpin
import { UIDtitles } from "@/utils/dictionnary"; // Assurez-vous d'importer correctement UIDtitles

interface CharacterButtonsProps {
  disableDownloadButton: boolean;
  disableShareButton: boolean;
  lang?: string;
  handleConvertImage: (
    type: string,
    disableButton: (value: boolean) => void
  ) => void;
  setDisableDownloadButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableShareButton: React.Dispatch<React.SetStateAction<boolean>>;
  shareButtonText: string;
  UIDtitles: any;
}

const CharacterButtons: React.FC<CharacterButtonsProps> = ({
  disableDownloadButton,
  disableShareButton,
  lang,
  handleConvertImage,
  setDisableDownloadButton,
  setDisableShareButton,
  shareButtonText,
  UIDtitles,
}) => {
  return (
    <div className="flex justify-center gap-10">
      <button
        disabled={disableDownloadButton}
        className="flex px-5 py-2 mt-10 rounded-full bg-green text-xl font-bold mb-10 xl:mb-0 disabled:bg-gray"
        onClick={() => handleConvertImage("save", setDisableDownloadButton)}
      >
        {disableDownloadButton ? (
          <div className="flex gap-2">
            <span>{UIDtitles[lang ?? "fr"].Downloading}</span>
            <LoadingSpin width="w-6" height="h-6" />
          </div>
        ) : (
          UIDtitles[lang ?? "fr"].DownloadImage
        )}
      </button>

      <button
        disabled={disableShareButton}
        className="flex px-5 py-2 mt-10 rounded-full bg-green text-xl font-bold mb-10 xl:mb-0 disabled:bg-gray"
        onClick={() => handleConvertImage("share", setDisableShareButton)}
      >
        {disableShareButton ? (
          <div className="flex gap-2">
            <span>{shareButtonText}</span>
            <LoadingSpin width="w-6" height="h-6" />
          </div>
        ) : (
          UIDtitles[lang ?? "fr"].shareImage
        )}
      </button>
    </div>
  );
};

export default CharacterButtons;
