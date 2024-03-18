"use client";
import { CharacterType, Data } from "@/types/CharacterModel";
import { CDN } from "@/utils/cdn";
import { useEffect, useRef, useState } from "react";
import { LightCone as LightConeType } from "@/types/LightCone";
import {
  mainStatOptions,
  recommendedStatsOptions,
  equipments,
} from "@/utils/statsOption";
import { PlusIcon } from "@heroicons/react/24/outline";
import type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
} from "@/types/EditorPage";
import GlobalBuild from "@/components/Editor/Global/GlobalBuild";
import { ToastContainer, toast } from "react-toastify";

function Page({ params }: { params: { id: number } }) {
  const [characterData, setCharacterData] = useState<
    CharacterType | "Loading" | { error: true }
  >("Loading");

  const [lightConeOptions, setLightConeOptions] = useState<Option[]>([]);
  const [relicsSetOptions, setRelicsSetOptions] = useState<Option[]>([]);

  const [dataAfterLoading, setDataAfterLoading] = useState<Data[]>([]);
  const memorizedData = useRef<Data[] | []>([]);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/character/${params.id}`, {
          cache: "no-cache",
          next: { revalidate: 0 },
        });
        const data: CharacterType = await response.json();
        setCharacterData(data);
      } catch (error) {
        setCharacterData({ error: true });
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    if (
      characterData !== "Loading" &&
      typeof characterData === "object" &&
      (!("error" in characterData) || characterData.error !== true)
    ) {
      // FETCH CONES DE LUMIERES
      const fetchLightCones = async () => {
        try {
          const response = await fetch(`${CDN}/index_min/fr/light_cones.json`, {
            cache: "no-cache",
            next: { revalidate: 0 },
          });
          const data: any = await response.json();
          const toArray = Object.values(data).map((item) => item);
          const character = characterData as unknown as CharacterType;

          const filtered: LightConeType[] = toArray.filter(
            (obj): obj is LightConeType => {
              if (obj instanceof Object && "path" in obj) {
                return (
                  obj.path === (character.path as unknown as CharacterType)
                );
              }
              return false;
            }
          );

          const options = filtered.map((el) => ({
            value: el.id,
            label: el.name,
          }));
          setLightConeOptions(options);
        } catch (error) {
          console.error("Erreur de recuperation des cones de lumière", error);
        }
      };
      fetchLightCones();

      // FETCH SETS DE RELIQUES
      const fetchRelicsSet = async () => {
        try {
          const response = await fetch(`${CDN}/index_min/fr/relic_sets.json`, {
            cache: "no-cache",
            next: { revalidate: 0 },
          });
          const data: any = await response.json();
          const toArray: any = Object.values(data).map((item) => item);

          const options = toArray.map((el: { id: string; name: string }) => ({
            value: el.id,
            label: el.name,
          }));

          setRelicsSetOptions(options);
        } catch (error) {
          console.error("Erreur de recuperation des reliques", error);
        }
      };
      fetchRelicsSet();
    }
  }, [characterData]);

  useEffect(() => {
    if (lightConeOptions.length > 0 && relicsSetOptions.length > 0) {
      // RECUPERE L'ID DE L'ELEMENT ET RETOURNE SON NOM
      const findLabel = (id: string, array: Array<any>, type?: string) => {
        const foundElement = array.find((el) => el.value === id);
        if (foundElement) return foundElement.label;
        return "";
      };

      //FETCH DONNEES STOCKEES DANS LA DB
      const fetchDataFromDB = async () => {
        try {
          const character = characterData as CharacterType;
          const response = await fetch(`/api/character/${character.id}`, {
            cache: "no-cache",
            next: { revalidate: 0 },
          });
          const json: CharacterType = await response.json();

          const dataArray: any = json.data.map((singleData) => {
            // TRANSMETS DONNEES DES CONES
            const lightcones: LightConeOption[] = singleData.lightCones.map(
              (lightcone) => {
                const label: string = findLabel(lightcone.id, lightConeOptions);
                return {
                  id: lightcone.id,
                  value: lightcone.id,
                  recommended: lightcone.recommended,
                  label: label,
                };
              }
            );

            // TRANSMETS DONNEES DES SETS DE RELIQUES
            const relics: RelicSetOption[] = singleData.relics_set.map(
              (relic) => {
                const label = findLabel(relic.id, relicsSetOptions);
                return {
                  id: relic.id,
                  value: relic.id,
                  num: relic.num,
                  recommended: relic.recommended,
                  label: label,
                };
              }
            );

            // TRANSMETS DONNEES DES MAINS STATS
            const mainStats: MainStatsOption[] = singleData.main_stats.map(
              (mainStat) => {
                const labelType = findLabel(mainStat.type, mainStatOptions);
                const labelPiece = findLabel(mainStat.piece, equipments);
                return {
                  typeStat: {
                    label: labelType,
                    value: mainStat.type,
                  },
                  equipment: {
                    label: labelPiece,
                    value: mainStat.piece,
                  },
                };
              }
            );

            // TRANSMETS DONNEES DES STATS RECOMMANDES
            const recommendedStats: recommendedStatsOption[] =
              singleData.recommended_stats.map((recommendedStat: any) => {
                const labelType = findLabel(
                  recommendedStat.type,
                  recommendedStatsOptions
                );

                // Converti ratio vers %
                const statType = recommendedStat.type;
                const value = [
                  "CriticalChanceBase",
                  "CriticalDamageBase",
                  "BreakDamageAddedRatioBase",
                  "StatusProbabilityBase",
                  "StatusResistanceBase",
                  "SPRatioBase",
                ].includes(statType)
                  ? Math.floor(recommendedStat.value * 1000) / 10
                  : recommendedStat.value;

                return {
                  type: {
                    label: labelType,
                    value: recommendedStat.type,
                  },
                  value: value || "",
                  importance: recommendedStat.importance,
                };
              });

            return {
              buildName: singleData.buildName || "",
              buildDesc: singleData.buildDesc || "",
              lightCones: lightcones || [],
              relics_set: relics || [],
              main_stats: mainStats || [],
              recommended_stats: recommendedStats || [],
              recommended_comment: singleData.recommended_comment || "",
            };
          });

          if (dataArray.length === 0) {
            return null;
          }
          memorizedData.current = dataArray;
          setDataAfterLoading(dataArray);
        } catch (error) {
          console.error("Erreur de recuperation sur la base de donnée", error);
        }
      };
      fetchDataFromDB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightConeOptions, relicsSetOptions]);

  const updateAllData = (data: any, index: number) => {
    if (!memorizedData.current) {
      return memorizedData.current;
    }
    const prevData = [...memorizedData.current];
    prevData[index] = data;

    memorizedData.current = prevData;
  };

  const addBuild = () => {
    setDataAfterLoading((prevData) => {
      const data = [...prevData];
      data.push({
        buildName: "",
        buildDesc: "",
        lightCones: [],
        relics_set: [],
        main_stats: [],
        recommended_stats: [],
        recommended_comment: "",
        total_coef: 0,
      });
      return data;
    });
  };

  const deleteBuild = (index: number) => {
    const data = [...memorizedData.current];
    data.splice(index, 1);
    memorizedData.current = data;
    setDataAfterLoading(data);
  };

  const handleGoToDB = () => {
    setDisableSaveButton(true);
    const dataArraySaved = memorizedData.current.map((data: Data) => {
      const lightConesArray = data.lightCones.map((lightcone) => ({
        id: lightcone.id,
        recommended: lightcone.recommended,
      }));

      const relicsSetArray = data.relics_set.map((relic) => ({
        id: relic.id,
        num: relic.num,
        recommended: relic.recommended,
      }));

      const mainStatsSetupArray = data.main_stats.map((mainStat: any) => ({
        piece: mainStat.equipment.value,
        type: mainStat.typeStat.value,
      }));

      const recommendedStatsSetupArray = data.recommended_stats.map(
        (recommendedStat: any) => {
          // Converti ratio vers %
          const statType = recommendedStat.type.value;
          const value = [
            "CriticalChanceBase",
            "CriticalDamageBase",
            "BreakDamageAddedRatioBase",
            "StatusProbabilityBase",
            "StatusResistanceBase",
            "SPRatioBase",
          ].includes(statType)
            ? recommendedStat.value / 100
            : recommendedStat.value;
          return {
            type: recommendedStat.type.value,
            value: value,
            importance: recommendedStat.importance,
          };
        }
      );

      //Recupère total des coefs
      const totalCoef = recommendedStatsSetupArray.reduce(
        (acc, coef) => Number(acc) + Number(coef.importance),
        0
      );

      const dataSaved: Data = {
        buildName: data.buildName,
        buildDesc: data.buildDesc,
        lightCones: lightConesArray,
        relics_set: relicsSetArray,
        main_stats: mainStatsSetupArray,
        recommended_stats: recommendedStatsSetupArray,
        recommended_comment: data.recommended_comment,
        total_coef: totalCoef || 0,
      };

      return dataSaved;
    });

    const characterDataMemo = characterData as CharacterType;
    const dataToDB = {
      characterId: characterDataMemo.id,
      data: dataArraySaved,
    };

    fetch("/api/character", {
      method: "PUT",
      cache: "no-cache",
      next: { revalidate: 0 },
      body: JSON.stringify(dataToDB),
    }).then((data: any) => {
      if (data.status === 200) {
        toast.success("Sauvegarde terminé");
      } else {
        toast.error("Erreur de sauvegarde");
      }
      console.log("data envoyé", data);
      setDisableSaveButton(false);
    });
  };

  const isLoading = characterData === "Loading";
  const isError = typeof characterData === "object" && "error" in characterData;

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
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
    );
  }

  if (isError) {
    return (
      <div className="text-white font-bold text-center text-3xl mt-10">
        Personnage non existant
      </div>
    );
  }

  return (
    <>
      <div className="fixed flex -z-10 justify-center w-screen">
        <img
          src={`${CDN}/${characterData.portrait}`}
          className="grayscale opacity-50 object-contain h-[calc(100vh+150px)] -translate-y-16"
        />
      </div>
      <div className="relative">
        <button
          className="flex gap-2 font-bold absolute p-2 rounded-full right-5 bg-green"
          onClick={addBuild}
        >
          Ajouter un build
          <PlusIcon className="h-6" />
        </button>
        <div className="text-white text-center text-5xl font-bold my-5">
          {characterData.name}
        </div>
      </div>

      <div className="flex flex-col gap-y-28">
        {dataAfterLoading &&
          dataAfterLoading.map((singleData: Data, index: number) => (
            <div key={`globalBuild${index}`}>
              <GlobalBuild
                key={index}
                data={singleData}
                index={index}
                lightConeOptions={lightConeOptions as any}
                relicsSetOptions={relicsSetOptions as any}
                onChange={updateAllData}
                onDelete={deleteBuild}
              />
            </div>
          ))}
      </div>
      <button
        disabled={disableSaveButton}
        className="flex w-3/4 bg-green p-2 rounded-full mx-auto justify-center my-20 text-xl font-bold border disabled:bg-gray"
        onClick={handleGoToDB}
      >
        {disableSaveButton ? "Sauvegarde en cours..." : "Sauvegarder"}

        {disableSaveButton && (
          <div className="ml-2" role="status">
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
        )}
      </button>
    </>
  );
}

export default Page;
