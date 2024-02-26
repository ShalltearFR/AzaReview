"use client";
import { CharacterType } from "@/types/CharacterModel";
import { CDN } from "@/utils/cdn";
import { useEffect, useState } from "react";
import { LightCone as LightConeType } from "@/types/LightCone";
import { SingleValue } from "react-select";
import GlobalLightCone from "@/components/Editor/Global/GlobalLightCone";
import GlobalRelicsSet from "@/components/Editor/Global/GlobalRelicsSet";
import GlobalMainStats from "@/components/Editor/Global/GlobalMainStats";
import GlobalRecommandedStats from "@/components/Editor/Global/GlobalRecommandedStats";

interface Option {
  value: string;
  label: string;
  num?: number;
}

interface LightConeOption {
  value: any;
  recommanded: boolean;
  label: string;
  id: string;
}

interface RelicSetOption {
  value: any;
  recommanded: boolean;
  label: string;
  num: number;
  id: string;
}

interface MainStatsOption {
  equipment: Option;
  typeStat: Option;
}

interface RecommandedStatsOption {
  type: Option;
  value: string;
  importance: string;
}

function Page({ params }: { params: { id: number } }) {
  const [characterData, setCharacterData] = useState<
    CharacterType | "Loading" | { error: true }
  >("Loading");

  const [buildNameInput, setBuildNameInput] = useState<string>("");

  const [lightConeOptions, setLightConeOptions] = useState<Option[]>([]);
  const [lightConesSetup, setLightConesSetup] = useState<LightConeOption[]>([]);

  const [relicsSetOptions, setRelicsSetOptions] = useState<Option[]>([]);
  const [relicsSetSetup, setRelicsSetSetup] = useState<RelicSetOption[]>([]);

  const [mainStatsSetup, setMainStatsSetup] = useState<MainStatsOption[]>([]);

  const [recommandedStatsSetup, setRecommandedStatsSetup] = useState<
    RecommandedStatsOption[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/character/${params.id}`);
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
          const response = await fetch(`${CDN}/index_min/fr/light_cones.json`);
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
          const response = await fetch(`${CDN}/index_min/fr/relic_sets.json`);
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

  // FONCTIONS LIGHTCONES
  const handleLightConeChange = (
    option: SingleValue<Option>,
    index: number,
    isRecommanded: boolean
  ) => {
    setLightConesSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup[index] = {
        recommanded: isRecommanded,
        value: option?.label || "",
        label: option?.label || "",
        id: option?.value || "",
      };
      return newSetup;
    });
  };

  const deleteLightCone = (index: number) => {
    setLightConesSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  };

  const addLightCone = (isRecommanded: boolean) => {
    setLightConesSetup((prevLightConesSetup) => [
      ...prevLightConesSetup,
      { id: "", recommanded: isRecommanded, value: "", label: "" },
    ]);
  };

  // FONCTIONS SETS DE RELIQUES
  const handleRelicsSetChange = (
    option: SingleValue<Option>,
    index: number,
    isRecommanded: boolean
  ) => {
    setRelicsSetSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup[index].recommanded = isRecommanded;
      newSetup[index].id = option?.value || "";
      newSetup[index].value = option?.value || "";
      newSetup[index].label = option?.label || "";
      return newSetup;
    });
  };

  const handleRelicsNumChange = (value: number, index: number) => {
    setRelicsSetSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup[index].num = value;
      return newSetup;
    });
  };

  const deleteRelicsSet = (index: number) => {
    setRelicsSetSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  };

  const addRelicsSet = (isRecommanded: boolean) => {
    setRelicsSetSetup((prevRelicsSetSetup) => [
      ...prevRelicsSetSetup,
      { id: "", recommanded: isRecommanded, value: "", label: "", num: 2 },
    ]);
  };

  // FONCTIONS MAINS STATS
  const handleEquipmentChange = (
    option: SingleValue<Option>,
    index: number
  ) => {
    setMainStatsSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup[index].equipment.value = option?.value || "";
      newSetup[index].equipment.label = option?.label || "";
      return newSetup;
    });
  };

  const handleTypeStatChange = (option: SingleValue<Option>, index: number) => {
    setMainStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup[index].typeStat.value = option?.value || "";
      newSetup[index].typeStat.label = option?.label || "";
      return newSetup;
    });
  };

  const deleteMainStats = (index: number) => {
    setMainStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  };

  const addMainStats = () => {
    const object: MainStatsOption = {
      equipment: { value: "", label: "" },
      typeStat: { value: "", label: "" },
    };

    setMainStatsSetup((prevRelicsSetSetup) => [...prevRelicsSetSetup, object]);
  };

  // FONCTIONS STATS RECOMMANDÉES
  const handleRecommandedTypeStatChange = (
    option: SingleValue<Option>,
    index: number
  ) => {
    setRecommandedStatsSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup[index].type.value = option?.value || "";
      newSetup[index].type.label = option?.label || "";
      return newSetup;
    });
  };

  const handleRecommandedValueChange = (value: string, index: number) => {
    setRecommandedStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup[index].value = value || "";
      return newSetup;
    });
  };

  const handleRecommandedImportanceChange = (value: string, index: number) => {
    setRecommandedStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup[index].importance = value || "";
      return newSetup;
    });
  };

  const deleteRecommandedStat = (index: number) => {
    setRecommandedStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  };

  const addRecommandedStat = () => {
    const object: RecommandedStatsOption = {
      type: { value: "", label: "" },
      importance: "",
      value: "",
    };

    setRecommandedStatsSetup((prevRelicsSetSetup) => [
      ...prevRelicsSetSetup,
      object,
    ]);
  };

  const isLoading = characterData === "Loading";
  const isError = typeof characterData === "object" && "error" in characterData;

  if (isLoading) {
    return <div className="text-white">Page chargement</div>;
  }

  if (isError) {
    return <div className="text-white">Personnage non existant</div>;
  }

  return (
    <div>
      <div className="relative">
        <img
          src={`${CDN}/${characterData.portrait}`}
          className="grayscale opacity-50 absolute -z-10"
        />
        <p className="text-white text-center text-4xl my-5">
          {characterData.name}
        </p>
        {/* BUILD */}
        <div className="mx-5 p-5 text-white border border-white">
          <label>
            <span className="text-2xl">Nom du build : </span>
            <input
              className="px-2 text-black"
              value={buildNameInput}
              onChange={(e) => setBuildNameInput(e.target.value)}
            />
          </label>

          {/* CONES DE LUMIERE */}
          <div className="border border-white p-5 mx-5 mt-10 bg-black/75 shadow-gray rounded-xl shadow-lg">
            <div className="flex">
              <span className="text-2xl mx-auto font-bold mb-5">
                Cones de lumière
              </span>
            </div>

            {/* SEPARATION CONE ET RECOMMANDÉ */}
            <div className="grid grid-cols-[1fr_1fr]">
              <GlobalLightCone
                lightConeOptions={lightConeOptions}
                lightConesSetup={lightConesSetup}
                handleChange={handleLightConeChange}
                addLightCone={addLightCone}
                deleteLightCone={deleteLightCone}
                addButtonText={"Ajouter un cone"}
                isRecommanded={false}
              />

              <div className="col-span-1 border-l">
                <GlobalLightCone
                  lightConeOptions={lightConeOptions}
                  lightConesSetup={lightConesSetup}
                  handleChange={handleLightConeChange}
                  addLightCone={addLightCone}
                  deleteLightCone={deleteLightCone}
                  addButtonText={"Ajouter un cone recommandé"}
                  isRecommanded={true}
                />
              </div>
            </div>
          </div>

          {/* SET DE RELIQUES ET ORNEMENTS */}
          <div className="border border-white p-5 mx-5 mt-10 bg-black/75 shadow-gray rounded-xl shadow-lg">
            <div className="flex">
              <span className="text-2xl mx-auto font-bold mb-5">
                Sets de reliques/Ornements
              </span>
            </div>
            {/* SEPARATION RELIQUES/ORNEMENTS RECOMMANDÉ */}
            <div className="grid grid-cols-2">
              <GlobalRelicsSet
                relicsSetOptions={relicsSetOptions}
                relicsSetSetup={relicsSetSetup}
                handleRelicsSetChange={handleRelicsSetChange}
                handleRelicsNumChange={handleRelicsNumChange}
                addRelicSet={addRelicsSet}
                deleteRelicsSet={deleteRelicsSet}
                addButtonText={"Ajouter un set"}
                isRecommanded={false}
              />

              <div className="border-l">
                <GlobalRelicsSet
                  relicsSetOptions={relicsSetOptions}
                  relicsSetSetup={relicsSetSetup}
                  handleRelicsSetChange={handleRelicsSetChange}
                  handleRelicsNumChange={handleRelicsNumChange}
                  addRelicSet={addRelicsSet}
                  deleteRelicsSet={deleteRelicsSet}
                  addButtonText={"Ajouter un set recommandé"}
                  isRecommanded={true}
                />
              </div>
            </div>
          </div>

          {/* MAIN STATS */}
          <div className="border border-white p-5 mx-5 mt-10 bg-black/75 shadow-gray rounded-xl shadow-lg">
            <div className="flex">
              <span className="text-2xl mx-auto font-bold mb-5">
                Main Stats
              </span>
            </div>
            <GlobalMainStats
              mainStatsSetup={mainStatsSetup}
              handleEquipmentChange={handleEquipmentChange}
              handleTypeStatChange={handleTypeStatChange}
              deleteMainStats={deleteMainStats}
              addMainStats={addMainStats}
            />
          </div>

          {/* STATS RECOMMANDÉS */}
          <div className="border border-white p-5 mx-5 mt-10 bg-black/75 shadow-gray rounded-xl shadow-lg">
            <div className="flex">
              <span className="text-2xl mx-auto font-bold mb-5">
                Statistiques recommandés
              </span>
            </div>
            <GlobalRecommandedStats
              recommandedStatsSetup={recommandedStatsSetup}
              handleImportanceChange={handleRecommandedImportanceChange}
              handleTypeStatChange={handleRecommandedTypeStatChange}
              handleValueChange={handleRecommandedValueChange}
              addRecommandedStats={addRecommandedStat}
              deleteRecommandedStat={deleteRecommandedStat}
            />
          </div>
        </div>
        <button
          className="flex w-3/4 bg-green p-2 rounded-full mx-auto justify-center mt-20 text-xl font-bold border"
          onClick={() => {
            console.log("lightConesSetup", lightConesSetup);
            console.log("relicsSetSetup", relicsSetSetup);
            console.log("mainStatsSetup", mainStatsSetup);
            console.log("recommandedStatsSetup", recommandedStatsSetup);

            const lightConesArray = lightConesSetup.map((lightcone) => ({
              id: lightcone.id,
              recommanded: lightcone.recommanded,
            }));

            const relicsSetArray = relicsSetSetup.map((relic) => ({
              id: relic.id,
              num: relic.num,
              recommanded: relic.recommanded,
            }));

            const mainStatsSetupArray = mainStatsSetup.map((mainStat) => ({
              piece: mainStat.equipment.value,
              type: mainStat.typeStat.value,
            }));

            const recommandedStatsSetupArray = recommandedStatsSetup.map(
              (recommandedStat) => ({
                type: recommandedStat.type.value,
                value: recommandedStat.value,
                importance: recommandedStat.importance,
              })
            );

            const dataToDB = {
              characterId: characterData.id,
              data: [
                {
                  buildName: buildNameInput,
                  lightCones: lightConesArray,
                  relics_set: relicsSetArray,
                  main_stats: mainStatsSetupArray,
                  recommanded_stats: recommandedStatsSetupArray,
                },
              ],
            };

            console.log("dataToDB", dataToDB);

            fetch("/api/character", {
              method: "PUT",
              cache: "no-cache",
              body: JSON.stringify(dataToDB),
            }).then((data: any) => {
              console.log("data envoyé", data);
            });
          }}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default Page;
