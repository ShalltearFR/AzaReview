"use client";
import NavBar from "@/components/Front/NavBar";
import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { CDN, CDN2 } from "@/utils/cdn";
import Aos from "aos";
import { notFound } from "next/navigation";
import translateBBCode from "@/utils/translateBBCode";
import { UIDtitles } from "@/utils/dictionnary";
import characterEN from "@/utils/charactersEN";
import StarBGAnimation from "../StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import CharacterList from "./CharactersList";
import CharacterBuild from "./CharacterBuild";
import CharacterDetails from "./CharacterDetails";
import { convertImage } from "@/utils/imageConversion";
import ReviewHeader from "./ReviewHeader";
import { sortRelics, sortReviewDataByUidData } from "@/utils/sorts&Filter";

import type { CharacterBuild as CharacterBuildType } from "@/types/charactersEN";
import type { TranslateSection } from "@/types/homepageDictionnary";
import type { jsonUID } from "@/types/jsonUid";
import type { CharacterType } from "@/types/CharacterModel";
import CharacterButtons from "./CharacterButtons";

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
  const [isloading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });
  }, []);

  const handleConvertImage = useCallback(
    (exportType: string, disableButton: (value: boolean) => void) => {
      convertImage(
        exportType,
        disableButton,
        setShareButtonText,
        characterDetailsRef,
        lang,
        characterIndex,
        uidData as jsonUID
      );
    },
    [characterIndex]
  );

  useEffect(() => {
    const uidDataCopy = { ...uidData } as jsonUID;
    reviewHeaderRef.current = (
      <ReviewHeader CDN={CDN} CDN2={CDN2} uidDataCopy={uidDataCopy} />
    );
  }, [uidData]);

  useEffect(() => {
    if (uidData && jsonReview) {
      const jsonUidData = uidData as jsonUID;
      if (uidData.status === 200) {
        const sortedReviewData = sortReviewDataByUidData(
          jsonReview.data,
          jsonUidData.characters
        );
        setReview(sortedReviewData);
        setIsLoading(false);
      }
    }
  }, [jsonReview, uidData]);

  useEffect(() => {
    const uidDataCopy = { ...uidData } as jsonUID;
    if (uidDataCopy.characters?.length > 0)
      sortRelics(RelicsList, uidDataCopy, setUidData);
    else
      setUidData({
        status: uidData.status,
      });
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
  }, [lang]);

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
        <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
          <section data-aos="fade-down">
            <CharacterList
              uidData={uidData as jsonUID}
              setIndex={setCharacterIndex}
              index={characterIndex}
              lang={lang}
            />
            <div
              className={
                "grid xl:grid-cols-[390px_1fr] justify-center items-center text-white font-bold xl:rounded-t-xl bg-light-blue/75 w-full max-w-[1450px] mx-auto xl:gap-x-5 py-5"
              }
            >
              <CharacterBuild
                characterBuild={characterBuild}
                characterOptions={characterOptions}
                setCharacterBuild={setCharacterBuild}
              />
              <div className="px-5 mt-2 text-center xl:px-0 xl:ml-0 xl:mt-0 xl:text-left">
                {(characterOptions[characterBuild] &&
                  characterOptions[characterBuild].desc &&
                  translateBBCode(
                    characterOptions[characterBuild].desc ?? ""
                  )) ||
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

            <CharacterButtons
              disableDownloadButton={disableDownloadButton}
              disableShareButton={disableShareButton}
              lang={lang}
              handleConvertImage={handleConvertImage}
              setDisableDownloadButton={setDisableDownloadButton}
              setDisableShareButton={setDisableShareButton}
              shareButtonText={shareButtonText}
              UIDtitles={UIDtitles}
            />
          </section>
        </Suspense>
      </div>
    );
  }
};

export default UidPage;
