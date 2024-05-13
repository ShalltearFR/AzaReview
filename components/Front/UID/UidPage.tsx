"use client";
import CharacterDetails from "@/components/Front/UID/CharacterDetails";
import CharacterList from "@/components/Front/Homepage/CharactersList";
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
import React from "react";
import { TitlesByLanguage, UIDtitles } from "@/utils/dictionnary";
import characterEN, { CharacterBuild } from "@/utils/charactersEN";

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
  lang: string | undefined;
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
  const [exportImg, setExportImg] = useState<any>("");
  const [disableDownloadButton, setDisableDownloadButton] =
    useState<boolean>(false);
  const [disableShareButton, setDisableShareButton] = useState<boolean>(false);
  const [shareButtonText, setShareButtonText] = useState<string>("");

  const [review, setReview] = useState<any>();
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  useEffect(() => {
    if (isFirefox)
      // Desactive le temps de fixer la fonctionnalité de presse papier
      Aos.init({
        disable: true,
      });
    else Aos.init({ disable: window.innerWidth <= 1450 });

    const uidDataCopy = { ...uidData } as jsonUID;
    const transformCharacterQuery = () => {
      if (isNaN(Number(characterQuery))) {
        window.history.pushState({}, "", window.location.pathname);
        setCharacterIndex(0);
        return null;
      }
      if (Number(characterQuery) > uidDataCopy.characters.length) {
        window.history.pushState({}, "", window.location.pathname);
        setCharacterIndex(0);
        return null;
      }
      setCharacterIndex(Number(characterQuery));
    };

    if (uidDataCopy.characters) {
      transformCharacterQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setShareButtonText(
        UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].Saving
      );

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
          if (isFirefox) {
            setExportImg(<img src={dataImage} />);
            disableButton(false);
            return;
          }

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
                    setShareButtonText(
                      UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                        .ImageCopied
                    );
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
        ].map((build: CharacterBuild, i: number) => ({
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
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <NavBar setData={setUidData} />
        {error504 && (
          <div className="text-3xl text-white font-bold mt-10 text-center">
            {/* {"L'API reçoit trop de requetes, veuillez relancer plus tard"} */}
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
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <NavBar setData={setUidData} />
        <div
          className="flex justify-center items-center mt-10"
          data-aos="fade-down"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-gray animate-spin  fill-orange"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>
    );

  if (!isloading && uidData.status === 200 && review) {
    return (
      <div className="overflow-hidden min-h-[calc(100vh-270px)]">
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
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
                UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                  .AvailableSoon}
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
              {!isFirefox && (
                <button
                  disabled={disableDownloadButton}
                  className="flex px-5 py-2 mt-10 rounded-full bg-green text-xl font-bold mb-10 xl:mb-0 disabled:bg-gray"
                  onClick={() =>
                    handleConvertImage("save", setDisableDownloadButton)
                  }
                >
                  {disableDownloadButton ? (
                    <div className="flex gap-2">
                      <span>
                        {
                          UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                            .Downloading
                        }
                      </span>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray animate-spin  fill-orange"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                      .DownloadImage
                  )}
                </button>
              )}

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
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray animate-spin  fill-orange"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].shareImage
                )}
              </button>
            </div>

            <div id="exportFirefox">
              {exportImg && (
                <div className="mt-10 mx-auto flex justify-center">
                  <div className="w-full max-w-[1450px]">{exportImg}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default UidPage;
