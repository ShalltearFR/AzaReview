"use client";
import { CharacterType, Data } from "@/types/CharacterModel";
import { CDN } from "@/utils/cdn";
import { useEffect, useRef, useState } from "react";
import {
  mainStatOptions,
  recommendedStatsOptions,
  equipments,
} from "@/utils/statsOption";
import { PlusIcon } from "@heroicons/react/24/outline";
import type {
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
} from "@/types/EditorPage";
import GlobalBuild from "@/components/Editor/Global/GlobalBuild";
import { toast } from "react-toastify";
import LoadingSpin from "@/components/LoadingSpin";
import light_conesFR from "@/static/light_conesFR.json";
import relic_setsFR from "@/static/relic_setsFR.json";

interface EditPageProps {
  id: number;
}

export const EditPage: React.FC<EditPageProps> = ({ id }) => {
  const [characterData, setCharacterData] = useState<
    CharacterType | "Loading" | { error: true }
  >("Loading");

  const [dataAfterLoading, setDataAfterLoading] = useState<Data[]>([]);
  const memorizedData = useRef<Data[] | []>([]);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

  useEffect(() => {
    // RECUPERE L'ID DE L'ELEMENT ET RETOURNE SON NOM
    const findLabel = (id: string, array: Array<any>, type?: string) => {
      if (type === "mainStat") {
        const foundElement = array.find((el) => el.value === id);
        return foundElement.label;
      }

      const foundElement = array.find((el) => el.id === id);
      if (foundElement) return foundElement.name;
      return "";
    };

    //FETCH DONNEES STOCKEES DANS LA DB
    const fetchDataFromDB = async () => {
      try {
        const response = await fetch(`/api/character/${id}`, {
          cache: "no-cache",
          next: { revalidate: 0 },
        });
        const json: CharacterType | "Loading" | { error: true } =
          await response.json();

        setCharacterData(json);
        if (
          json &&
          "data" in (json as CharacterType) &&
          (json as CharacterType).data
        ) {
          console.log("oui");
          const dataArray: any = (json as CharacterType).data.map(
            (singleData) => {
              // TRANSMETS DONNEES DES CONES
              const lightcones: LightConeOption[] = singleData.lightCones.map(
                (lightcone) => {
                  const label: string = findLabel(lightcone.id, light_conesFR);
                  // console.log("label", label);
                  return {
                    id: lightcone.id,
                    value: lightcone.id,
                    recommended: lightcone.recommended,
                    label: label,
                  };
                }
              );

              // TRANSMETS DONNEES DES SETS DE RELIQUES
              const relics: RelicSetOption[] = singleData.relics_set
                .map((relic) => {
                  if (Number(relic.id) > 300) return null;
                  const label = findLabel(relic.id, relic_setsFR);
                  return {
                    id: relic.id,
                    value: relic.id,
                    num: relic.num,
                    recommended: relic.recommended,
                    label: label,
                  };
                })
                .filter((el) => el !== null);

              const ornamants: RelicSetOption[] = singleData.relics_set
                .map((relic) => {
                  if (Number(relic.id) < 300) return null;
                  const label = findLabel(relic.id, relic_setsFR);
                  return {
                    id: relic.id,
                    value: relic.id,
                    num: relic.num,
                    recommended: relic.recommended,
                    label: label,
                  };
                })
                .filter((el) => el !== null);

              // TRANSMETS DONNEES DES MAINS STATS
              const mainStats: MainStatsOption[] = singleData.main_stats.map(
                (mainStat) => {
                  const labelType = findLabel(
                    mainStat.type,
                    mainStatOptions,
                    "mainStat"
                  );
                  const labelPiece = findLabel(
                    mainStat.piece,
                    equipments,
                    "mainStat"
                  );

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
                    recommendedStatsOptions,
                    "mainStat"
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
                ornaments_set: ornamants || [],
                main_stats: mainStats || [],
                recommended_stats: recommendedStats || [],
                recommended_comment: singleData.recommended_comment || "",
              };
            }
          );

          if (dataArray.length === 0) {
            return null;
          }

          console.log("dataArray", dataArray);
          memorizedData.current = dataArray;
          setDataAfterLoading(dataArray);
        }
      } catch (error) {
        console.error("Erreur de recuperation sur la base de donnée", error);
        setCharacterData({ error: true });
      }
    };
    fetchDataFromDB();
  }, []);

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
        ornaments_set: [],
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

      const ornamentsSetArray = data.ornaments_set.map((relic) => ({
        id: relic.id,
        num: 2,
        recommended: relic.recommended,
      }));

      // const mergedArray = arrays.reduce((acc, curr) => acc.concat(curr), []);

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

      const dataSaved: any = {
        buildName: data.buildName,
        buildDesc: data.buildDesc,
        lightCones: lightConesArray,
        relics_set: [...relicsSetArray, ...ornamentsSetArray],
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
      setDisableSaveButton(false);
    });
  };

  const isLoading = characterData === "Loading";
  const isError = typeof characterData === "object" && "error" in characterData;

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <LoadingSpin />
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

  const date = new Date(characterData.updatedAt);

  return (
    <>
      <div className="fixed flex -z-10 justify-center w-screen">
        <img
          src={`${CDN}/${characterData.portrait}`}
          className="grayscale opacity-50 object-contain h-[calc(100vh+150px)] -translate-y-16"
        />
      </div>
      <div className="relative">
        <p className="flex gap-2 absolute right-5 top-3 items-center text-xl text-light-gray italic">
          Dernière modification : {date.toLocaleDateString()}
        </p>
        <div className="text-center text-5xl font-bold my-5 text-white">
          {characterData.name}
        </div>
        <button
          className="flex gap-2 font-bold absolute p-2 rounded-full right-5 bg-green "
          onClick={addBuild}
        >
          Ajouter un build
          <PlusIcon className="h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-y-28 mt-20">
        {dataAfterLoading &&
          dataAfterLoading.map((singleData: Data, index: number) => (
            <div key={`globalBuild${index}`}>
              <GlobalBuild
                data={singleData}
                index={index}
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

        {disableSaveButton && <LoadingSpin width="w-6" height="h-6" />}
      </button>
    </>
  );
};
