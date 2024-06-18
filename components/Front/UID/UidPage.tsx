"use client";
import CharacterDetails from "@/components/Front/UID/CharacterDetails";
import CharacterList from "@/components/Front/UID/CharactersList";
import NavBar from "@/components/Front/NavBar";
import { CharacterType } from "@/types/CharacterModel";
import type { jsonUID } from "@/types/jsonUid";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toBlob, toJpeg, toPng } from "html-to-image";
import ReactSelect from "react-select";
import { CDN, CDN2 } from "@/utils/cdn";
import Aos from "aos";
import { notFound } from "next/navigation";
import translateBBCode from "@/utils/translateBBCode";
import { UIDtitles } from "@/utils/dictionnary";
import characterEN from "@/utils/charactersEN";
import StarBGAnimation from "../StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";

import { CharacterBuild as CharacterBuildType } from "@/types/charactersEN";
import { TranslateSection } from "@/types/homepageDictionnary";

interface Option {
  value: string;
  label: string;
  desc?: string;
}

interface ReviewData {
  data: CharacterType[];
}

interface UidPageProps {
  jsonUid: jsonUID | { status: number };
  jsonReview: ReviewData;
  statsTranslate: Array<any>;
  relicsSetTranslate: Array<any>;
  lightconesTranslate: Array<any>;
  RelicsList: Array<any>;
  eidolonsList: Array<any>;
  lang: keyof TranslateSection | undefined;
  error504?: boolean;
}

const UidPage: React.FC<UidPageProps> = ({
  jsonUid,
  jsonReview,
  statsTranslate,
  relicsSetTranslate,
  lightconesTranslate,
  RelicsList,
  eidolonsList,
  lang,
  error504,
}) => {
  const searchParams = useSearchParams();
  const characterQuery = searchParams.get("c");
  const [isloading, setIsLoading] = useState<Boolean>(true);
  const [uidData, setUidData] = useState<{ status: number } | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);
  const [characterBuild, setCharacterBuild] = useState<number>(0);
  const [characterOptions, setCharacterOptions] = useState<Option[]>([
    { value: "0", label: "" },
  ]);

  const characterDetailsRef = useRef<HTMLDivElement>(null);
  const reviewHeaderRef = useRef<any>(null);
  const [disableDownloadButton, setDisableDownloadButton] =
    useState<boolean>(false);
  const [disableShareButton, setDisableShareButton] = useState<boolean>(false);
  const [shareButtonText, setShareButtonText] = useState<string>("");

  const [review, setReview] = useState<any>();

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });
    const init = async () => {
      const uidDataCopy = { ...uidData } as jsonUID;
      const transformCharacterQuery = () => {
        if (isNaN(Number(characterQuery))) {
          window.history.pushState({}, "", window.location.pathname);
          return 0;
        }
        if (Number(characterQuery) > uidDataCopy.characters.length) {
          window.history.pushState({}, "", window.location.pathname);
          return 0;
        }
        return Number(characterQuery);
      };

      if (uidDataCopy.characters) transformCharacterQuery();
      return 0;
    };

    init().then((data: number) => setCharacterIndex(data));
  }, []);

  const handleConvertImage = (
    exportType: string,
    disableButton: (value: boolean) => void
  ) => {
    if (characterDetailsRef.current === null) {
      return;
    }
    disableButton(true);

    if (exportType === "share")
      setShareButtonText(UIDtitles[lang ?? "fr"].Saving);

    setTimeout(() => {
      //Leger timeout pour eviter le troncage d'image dû au rajout du header Image
      let conversionPromise;

      if (window.innerWidth >= 650) {
        // Tablette/Desktop
        conversionPromise = toPng(
          characterDetailsRef.current as HTMLDivElement
        );
      } else {
        // Mobile
        conversionPromise = toJpeg(
          characterDetailsRef.current as HTMLDivElement,
          {
            quality: 0.5,
          }
        );
      }

      conversionPromise
        .then((dataImage) => {
          if (exportType === "save") {
            // Bouton sauvegarder
            const uidDataCopy = { ...uidData } as jsonUID;
            const link = document.createElement("a");
            link.download = `Review HSR - ${uidDataCopy.characters[characterIndex].name}`;
            link.href = dataImage;
            link.click();
            disableButton(false);
          } else if (exportType === "share") {
            // Bouton Copier Presse Papier
            toBlob(characterDetailsRef.current as HTMLDivElement).then(
              (blob: any) => {
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
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  useEffect(() => {
    const uidDataCopy = { ...uidData } as jsonUID;
    reviewHeaderRef.current = (
      <div
        id="exportHTML"
        className="mx-auto w-full max-w-[1450px] border rounded-t-xl overflow-hidden"
        style={{
          backgroundImage: `url('${CDN2}/img/character_bg.avif')`,
          marginBlock: "auto",
          width: "100%",
          height: "96px",
        }}
      >
        <div className="flex items-center w-full h-24 text-white smd:text-xl bg-black/50">
          <img
            className="ml-2 smd:ml-5 h-20"
            src={`${CDN}/${uidDataCopy?.player?.avatar.icon}`}
          />
          <p className="ml-5 flex flex-col">
            <span className="font-bold">{uidDataCopy?.player?.nickname}</span>
            <span className="smd:text-base">
              UID : {uidDataCopy?.player?.uid}
            </span>
          </p>
          <img
            src={`${CDN2}/img/homepage/logo_min.png`}
            className="ml-auto hidden smd:block mr-2 smd:mr-5 h-10 smd:h-14"
          />
          <p className="ml-auto smd:ml-0 mr-5 font-bold">
            review-hsr.vercel.app
          </p>
        </div>
      </div>
    );
  }, [uidData]);

  useEffect(() => {
    function sortReviewDataByUidData(reviewData: any, uidData: any) {
      const sortedArray = uidData.map((uidItem: any) => {
        const matchingItem = reviewData.find(
          (reviewItem: any) => reviewItem.id === uidItem.id
        );
        return matchingItem ? matchingItem : { value: "NC" };
      });

      return sortedArray;
    }

    const jsonUidData = uidData as jsonUID;
    if (uidData.status === 200) {
      const sortedReviewData = sortReviewDataByUidData(
        jsonReview.data,
        jsonUidData.characters
      );
      setReview(sortedReviewData);
      setIsLoading(false);
    }
  }, [jsonReview, uidData]);

  useEffect(() => {
    const uidDataCopy = { ...uidData } as jsonUID;
    if (uidDataCopy.characters?.length > 0) {
      const orderOfType = ["HEAD", "HAND", "BODY", "FOOT", "NECK", "OBJECT"];

      const customSort = (a: any, b: any) => {
        const typeA = RelicsList.find((item) => item.id === a.id)?.type;
        const typeB = RelicsList.find((item) => item.id === b.id)?.type;

        // Utiliser l'ordre défini pour trier
        const indexA = orderOfType.indexOf(typeA);
        const indexB = orderOfType.indexOf(typeB);

        return indexA - indexB;
      };

      const charactersList = uidDataCopy.characters.map((character, index) => {
        if (character.relics) {
          if (character.relics.length === 0) return character;

          // Create a sorted copy of the relics array
          const data = uidDataCopy.characters[index];
          data.relics = [...character.relics].sort(customSort);
          return data;
        }
        return character;
      });
      uidDataCopy.characters = charactersList;

      setUidData(uidDataCopy);
    } else {
      setUidData({
        status: uidData.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RelicsList, jsonUid]);

  useEffect(() => {
    if (
      uidData.status === 200 &&
      review &&
      review[characterIndex] &&
      review[characterIndex].data
    ) {
      if (
        lang === "en" &&
        characterEN[(uidData as any).characters[characterIndex].id]
      ) {
        const options: Option[] = characterEN[
          (uidData as any).characters[characterIndex].id
        ].map((build: CharacterBuildType, i: number) => ({
          label: build.name,
          value: `${i}`,
          desc: build.desc,
        }));
        setCharacterOptions(options);
      } else {
        const options: Option[] = review[characterIndex].data.map(
          (el: any, i: any) => ({
            label: el.buildName,
            value: `${i}`,
            desc: el.buildDesc,
          })
        );
        setCharacterOptions(options);
      }
    } else {
      setCharacterOptions([
        {
          value: "0",
          label: "",
        },
      ]);
    }
    setCharacterBuild(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uidData.status, review, characterIndex, lang]);

  useEffect(() => {
    if (!error504) {
      setUidData(jsonUid);
      const jsonToStorage = { ...jsonUid };
      jsonToStorage.status = 200;
      localStorage.setItem("dataUID", JSON.stringify(jsonToStorage));
    } else {
      const dataStorage = localStorage.getItem("dataUID");
      if (dataStorage) setUidData(JSON.parse(dataStorage));
      else setUidData({ status: 504 });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  if (uidData.status === 404 || uidData.status === 400) {
    return notFound();
  }
  if (uidData.status === 504) {
    return (
      <div className="min-h-[calc(100vh-230px)] overflow-hidden">
        <StarBGAnimation />
        <NavBar setData={setUidData} />
        {error504 && (
          <div className="text-3xl text-white font-bold mt-10 text-center">
            {lang === "en"
              ? "The API is receiving too many requests, please restart later"
              : "L'API reçoit trop de requetes, veuillez relancer plus tard"}
          </div>
        )}
      </div>
    );
  }

  if (isloading)
    return (
      <div className="min-h-[calc(100vh-230px)] overflow-hidden">
        <StarBGAnimation />
        <NavBar setData={setUidData} />
        <div
          className="flex justify-center items-center mt-10"
          data-aos="fade-down"
        >
          <LoadingSpin width="w-24" height="h-24" />
        </div>
      </div>
    );

  if (!isloading && uidData.status === 200 && review) {
    return (
      <div className="overflow-hidden min-h-[calc(100vh-270px)]">
        <StarBGAnimation />
        <NavBar setData={setUidData} />

        {error504 && (
          <div className="text-3xl text-white font-bold mt-10 text-center">
            {lang === "en"
              ? "The API receives too many requests, the update could not be done"
              : "L'API reçoit trop de requetes, l'actualisation n'a pas pu se faire"}
          </div>
        )}
        <section data-aos="fade-down">
          <CharacterList
            uidData={uidData as jsonUID}
            setIndex={setCharacterIndex}
            index={characterIndex}
            lang={lang}
          />
          <div className="grid xl:grid-cols-[390px_1fr] justify-center items-center text-white font-bold xl:rounded-t-xl bg-light-blue/75 w-full max-w-[1450px] mx-auto xl:gap-x-5 py-5">
            <label className="flex items-center gap-2 ml-5 px-2">
              <span className="text-xl w-20">Build :</span>
              <ReactSelect
                options={characterOptions}
                isSearchable={false}
                styles={{
                  menu: (base) => ({
                    ...base,
                    color: "black",
                  }),
                }}
                onChange={(e) => setCharacterBuild(Number(e?.value))}
                value={characterOptions[characterBuild]}
                className="w-full xl:w-72 z-30"
              />
            </label>
            <div className="px-5 mt-2 text-center xl:px-0 xl:ml-0 xl:mt-0 xl:text-left">
              {(characterOptions[characterBuild] &&
                characterOptions[characterBuild].desc &&
                translateBBCode(characterOptions[characterBuild].desc ?? "")) ||
                UIDtitles[lang ?? "fr"].AvailableSoon}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div
              ref={characterDetailsRef}
              className="w-full max-w-[1450px] h-full"
            >
              {disableDownloadButton || disableShareButton
                ? reviewHeaderRef.current
                : null}
              <CharacterDetails
                uidData={uidData as jsonUID}
                buildIndex={characterBuild}
                reviewData={review}
                index={characterIndex}
                statsTranslate={statsTranslate}
                relicsSetTranslate={relicsSetTranslate}
                lightconesTranslate={lightconesTranslate}
                eidolonsList={eidolonsList}
                lang={lang}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-center gap-10">
              <button
                disabled={disableDownloadButton}
                className="flex px-5 py-2 mt-10 rounded-full bg-green text-xl font-bold mb-10 xl:mb-0 disabled:bg-gray"
                onClick={() =>
                  handleConvertImage("save", setDisableDownloadButton)
                }
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
                onClick={() =>
                  handleConvertImage("share", setDisableShareButton)
                }
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
          </div>
        </section>
      </div>
    );
  }
};

export default UidPage;
