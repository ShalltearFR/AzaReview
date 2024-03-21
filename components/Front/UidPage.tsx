"use client";
import CharacterDetails from "@/components/Front/Character/CharacterDetails";
import CharacterList from "@/components/Front/CharactersList";
import NavBar from "@/components/Front/NavBar";
import { CharacterType } from "@/types/CharacterModel";
import type { jsonUID } from "@/types/jsonUid";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import ReactSelect from "react-select";
import { CDN2 } from "@/utils/cdn";
import Aos from "aos";
import { notFound } from "next/navigation";

interface Option {
  value: string;
  label: string;
  desc?: string;
}

interface ReviewData {
  data: CharacterType[];
}

interface UidPageProps {
  jsonUid: jsonUID;
  jsonReview: ReviewData;
  statsTranslate: Array<any>;
  relicsSetTranslate: Array<any>;
  lightconesTranslate: Array<any>;
  RelicsList: Array<any>;
  eidolonsList: Array<any>;
}

const UidPage: React.FC<UidPageProps> = ({
  jsonUid,
  jsonReview,
  statsTranslate,
  relicsSetTranslate,
  lightconesTranslate,
  RelicsList,
  eidolonsList,
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
  const [exportImgUrl, setExportImgUrl] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [review, setReview] = useState<any>();

  useEffect(() => {
    Aos.init();
    const transformCharacterQuery = () => {
      if (isNaN(Number(characterQuery))) {
        window.history.pushState({}, "", window.location.pathname);
        setCharacterIndex(0);
        return null;
      }
      if (Number(characterQuery) > jsonUid.characters.length) {
        window.history.pushState({}, "", window.location.pathname);
        setCharacterIndex(0);
        return null;
      }
      setCharacterIndex(Number(characterQuery));
    };

    if (jsonUid.characters) {
      transformCharacterQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const htmlToImageConvert = useCallback(() => {
    setDisableButton(true);
    if (characterDetailsRef.current === null) {
      return;
    }

    toPng(characterDetailsRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setExportImgUrl(dataUrl);
        setDisableButton(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [characterDetailsRef]);

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

    const jsonUid = uidData as jsonUID;
    if (uidData.status === 200) {
      const sortedReviewData = sortReviewDataByUidData(
        jsonReview.data,
        jsonUid.characters
      );
      setReview(sortedReviewData);
      setIsLoading(false);
    }
  }, [jsonReview, uidData]);

  useEffect(() => {
    if (jsonUid.characters?.length > 0) {
      const orderOfType = ["HEAD", "HAND", "BODY", "FOOT", "NECK", "OBJECT"];

      const customSort = (a: any, b: any) => {
        const typeA = RelicsList.find((item) => item.id === a.id)?.type;
        const typeB = RelicsList.find((item) => item.id === b.id)?.type;

        // Utiliser l'ordre défini pour trier
        const indexA = orderOfType.indexOf(typeA);
        const indexB = orderOfType.indexOf(typeB);

        return indexA - indexB;
      };

      const charactersList = jsonUid.characters.map((character, index) => {
        if (character.relics) {
          if (character.relics.length === 0) return character;

          // Create a sorted copy of the relics array
          const data = jsonUid.characters[index];
          data.relics = [...character.relics].sort(customSort);
          return data;
        }
        return character;
      });
      const Uid = { ...jsonUid };
      Uid.characters = charactersList;

      setUidData(Uid);
    } else {
      setUidData({
        status: jsonUid.status,
      });
    }
  }, [RelicsList, jsonUid]);

  useEffect(() => {
    if (
      uidData.status === 200 &&
      review &&
      review[characterIndex] &&
      review[characterIndex].data
    ) {
      const options: Option[] = review[characterIndex].data.map(
        (el: any, i: any) => ({
          label: el.buildName,
          value: `${i}`,
          desc: el.buildDesc,
        })
      );
      setCharacterOptions(options);
    } else {
      setCharacterOptions([
        {
          value: "0",
          label: "",
        },
      ]);
    }
    setCharacterBuild(0);
  }, [uidData.status, review, characterIndex]);

  if (uidData.status === 404) {
    return notFound();
  }

  if (uidData.status === 400) {
    return notFound();
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
            //backgroundImage: `url("${CDN2}/img/homepage/kuruKuru.gif")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        ></div>
        <NavBar setData={setUidData} />

        <section data-aos="fade-down">
          <CharacterList
            uidData={uidData as jsonUID}
            setIndex={setCharacterIndex}
            index={characterIndex}
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
            <p className="px-5 mt-2 text-center xl:px-0 xl:ml-0 xl:mt-0 xl:text-left">
              {(characterOptions[characterBuild] &&
                characterOptions[characterBuild].desc &&
                characterOptions[characterBuild].desc) ||
                "Disponible prochainement"}
            </p>
          </div>
          <div className="flex justify-center w-full">
            <div ref={characterDetailsRef} className=" w-full max-w-[1450px]">
              <CharacterDetails
                uidData={uidData as jsonUID}
                buildIndex={characterBuild}
                reviewData={review}
                index={characterIndex}
                statsTranslate={statsTranslate}
                relicsSetTranslate={relicsSetTranslate}
                lightconesTranslate={lightconesTranslate}
                eidolonsList={eidolonsList}
              />
            </div>
          </div>
          <div>
            <button
              disabled={disableButton}
              className="flex px-5 py-2 mt-10 rounded-full bg-green mx-auto text-xl font-bold mb-10 xl:mb-0 disabled:bg-gray"
              onClick={htmlToImageConvert}
            >
              {disableButton ? (
                <div className="flex gap-2">
                  <span>Exportation en cours...</span>
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
                "Exporter l'image"
              )}
            </button>
            {exportImgUrl && (
              <img
                className="flex mt-10 mb-10 mx-auto"
                src={exportImgUrl}
                alt="Export image url"
              />
            )}
          </div>
        </section>
      </div>
    );
  }
};

export default UidPage;
