import LoadingSpin from "@/components/LoadingSpin";
interface CharacterButtonsProps {
  disableDownloadButton: boolean;
  disableShareButton: boolean;
  handleConvertImage: (
    type: string,
    disableButton: (value: boolean) => void
  ) => void;
  setDisableDownloadButton: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableShareButton: React.Dispatch<React.SetStateAction<boolean>>;
  shareButtonText: string;
}

const CharacterButtons: React.FC<CharacterButtonsProps> = ({
  disableDownloadButton,
  disableShareButton,
  handleConvertImage,
  setDisableDownloadButton,
  setDisableShareButton,
  shareButtonText,
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
            <span>Telechargement en cours...</span>
            <LoadingSpin width="w-6" height="h-6" />
          </div>
        ) : (
          "Telecharger l'image"
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
          "Partager"
        )}
      </button>
    </div>
  );
};

export default CharacterButtons;
