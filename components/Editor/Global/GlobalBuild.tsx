"use client";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import GlobalLightCone from "./GlobalLightCone";
import GlobalRelicsSet from "./GlobalRelicsSet";
import GlobalMainStats from "./GlobalMainStats";
import GlobalRecommendedStats from "./GlobalRecommendedStats";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
} from "@/types/EditorPage";
import { SingleValue } from "react-select";

interface GlobalBuildProps {
  data: any;
  index: number;
  lightConeOptions: LightConeOption;
  relicsSetOptions: RelicSetOption;
  onChange: (value: any, index: number) => void;
  onDelete: (index: number) => void;
}

const GlobalBuild: React.FC<GlobalBuildProps> = ({
  data,
  index,
  lightConeOptions,
  relicsSetOptions,
  onChange,
  onDelete,
}) => {
  const [buildNameInput, setBuildNameInput] = useState<string>("");
  const [lightConesSetup, setLightConesSetup] = useState<LightConeOption[]>([]);
  const [relicsSetSetup, setRelicsSetSetup] = useState<RelicSetOption[]>([]);
  const [mainStatsSetup, setMainStatsSetup] = useState<MainStatsOption[]>([]);
  const [recommendedStatsSetup, setRecommendedStatsSetup] = useState<
    recommendedStatsOption[]
  >([]);

  // INIT DES VALEURS
  useEffect(() => {
    setBuildNameInput(data.buildName);
    setLightConesSetup(data.lightCones);
    setRelicsSetSetup(data.relics_set);
    setMainStatsSetup(data.main_stats);
    setRecommendedStatsSetup(data.recommended_stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SUPPRESSION DU BUILD
  const deleteBuild = useCallback(() => {
    onDelete(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FONCTIONS LIGHTCONES
  const handleLightConeChange = useCallback(
    (option: SingleValue<Option>, index: number, isrecommended: boolean) => {
      setLightConesSetup((prevLightConesSetup) => {
        const newSetup = [...prevLightConesSetup];
        newSetup[index] = {
          recommended: isrecommended,
          value: option?.label || "",
          label: option?.label || "",
          id: option?.value || "",
        };
        return newSetup;
      });
    },
    []
  );

  const deleteLightCone = useCallback((index: number) => {
    setLightConesSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  }, []);

  const addLightCone = useCallback((isrecommended: boolean) => {
    setLightConesSetup((prevLightConesSetup) => [
      ...prevLightConesSetup,
      { id: "", recommended: isrecommended, value: "", label: "" },
    ]);
  }, []);

  // FONCTIONS SETS DE RELIQUES
  const handleRelicsSetChange = useCallback(
    (option: SingleValue<Option>, index: number, isrecommended: boolean) => {
      setRelicsSetSetup((prevLightConesSetup) => {
        const newSetup = [...prevLightConesSetup];
        newSetup[index].recommended = isrecommended;
        newSetup[index].id = option?.value || "";
        newSetup[index].value = option?.value || "";
        newSetup[index].label = option?.label || "";
        return newSetup;
      });
    },
    []
  );

  const handleRelicsNumChange = useCallback((value: number, index: number) => {
    setRelicsSetSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup[index].num = value;
      return newSetup;
    });
  }, []);

  const deleteRelicsSet = useCallback((index: number) => {
    setRelicsSetSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  }, []);

  const addRelicsSet = useCallback((isrecommended: boolean) => {
    setRelicsSetSetup((prevRelicsSetSetup) => [
      ...prevRelicsSetSetup,
      { id: "", recommended: isrecommended, value: "", label: "", num: 2 },
    ]);
  }, []);

  // FONCTIONS MAINS STATS
  const handleEquipmentChange = useCallback(
    (option: SingleValue<Option>, index: number) => {
      setMainStatsSetup((prevLightConesSetup) => {
        const newSetup = [...prevLightConesSetup];
        newSetup[index].equipment.value = option?.value || "";
        newSetup[index].equipment.label = option?.label || "";
        return newSetup;
      });
    },
    []
  );

  const handleTypeStatChange = useCallback(
    (option: SingleValue<Option>, index: number) => {
      setMainStatsSetup((prevRelicsSetSetup) => {
        const newSetup = [...prevRelicsSetSetup];
        newSetup[index].typeStat.value = option?.value || "";
        newSetup[index].typeStat.label = option?.label || "";
        return newSetup;
      });
    },
    []
  );

  const deleteMainStats = useCallback((index: number) => {
    setMainStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  }, []);

  const addMainStats = useCallback(() => {
    const object: MainStatsOption = {
      equipment: { value: "", label: "" },
      typeStat: { value: "", label: "" },
    };

    setMainStatsSetup((prevRelicsSetSetup) => [...prevRelicsSetSetup, object]);
  }, []);

  // FONCTIONS STATS RECOMMANDÉES
  const handleRecommendedTypeStatChange = useCallback(
    (option: SingleValue<Option>, index: number) => {
      setRecommendedStatsSetup((prevLightConesSetup) => {
        const newSetup = [...prevLightConesSetup];
        newSetup[index].type.value = option?.value || "";
        newSetup[index].type.label = option?.label || "";
        return newSetup;
      });
    },
    []
  );

  const handleRecommendedValueChange = useCallback(
    (value: string, index: number) => {
      setRecommendedStatsSetup((prevRelicsSetSetup) => {
        const newSetup = [...prevRelicsSetSetup];
        newSetup[index].value = value || "";
        return newSetup;
      });
    },
    []
  );

  const handleRecommendedImportanceChange = useCallback(
    (value: string, index: number) => {
      setRecommendedStatsSetup((prevRelicsSetSetup) => {
        const newSetup = [...prevRelicsSetSetup];
        newSetup[index].importance = value || "";
        return newSetup;
      });
    },
    []
  );

  const deleteRecommendedStat = useCallback((index: number) => {
    setRecommendedStatsSetup((prevRelicsSetSetup) => {
      const newSetup = [...prevRelicsSetSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  }, []);

  const addRecommendedStat = useCallback(() => {
    const object: recommendedStatsOption = {
      type: { value: "", label: "" },
      importance: "",
      value: "",
    };
    setRecommendedStatsSetup((prevRelicsSetSetup) => [
      ...prevRelicsSetSetup,
      object,
    ]);
  }, []);

  // MET A JOURS LES DONNEES
  const updateData = () => {
    console.log("update");
    const dataSaved = {
      buildName: buildNameInput,
      lightCones: lightConesSetup,
      relics_set: relicsSetSetup,
      main_stats: mainStatsSetup,
      recommended_stats: recommendedStatsSetup,
    };

    onChange(dataSaved, index);
  };

  const debounced = useDebouncedCallback(() => {
    updateData();
  }, 250);

  return (
    <div className="mx-5 p-5 text-white border border-white">
      <div className="relative">
        <button
          className="flex gap-2 font-bold absolute right-5 p-2 rounded-full bg-red"
          onClick={deleteBuild}
        >
          SUPPRIMER LE BUILD
          <TrashIcon className="h-6 " />
        </button>
        <label>
          <span className="text-2xl">Nom du build : </span>
          <input
            className="px-2 text-black"
            value={buildNameInput || data.buildName}
            onChange={(e) => {
              setBuildNameInput(e.target.value);
              debounced();
            }}
          />
        </label>
      </div>
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
            lightConesSetup={lightConesSetup || data.lightCones}
            handleChange={(
              option: any,
              index: number,
              isRecommended: boolean
            ) => {
              handleLightConeChange(option, index, isRecommended);
              debounced();
            }}
            addLightCone={addLightCone}
            deleteLightCone={(index: number) => {
              deleteLightCone(index);
              debounced();
            }}
            addButtonText={"Ajouter un cone"}
            isRecommended={false}
          />

          <div className="col-span-1 border-l">
            <GlobalLightCone
              lightConeOptions={lightConeOptions}
              lightConesSetup={lightConesSetup || data.lightCones}
              handleChange={(
                option: SingleValue<Option>,
                index: number,
                isRecommended: boolean
              ) => {
                handleLightConeChange(option, index, isRecommended);
                debounced();
              }}
              addLightCone={addLightCone}
              deleteLightCone={(index: number) => {
                deleteLightCone(index);
                debounced();
              }}
              addButtonText={"Ajouter un cone recommandé"}
              isRecommended={true}
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
            relicsSetSetup={relicsSetSetup || data.relic_sets}
            handleRelicsSetChange={(
              option: SingleValue<Option>,
              index: number,
              isRecommended: boolean
            ) => {
              handleRelicsSetChange(option, index, isRecommended);
              debounced();
            }}
            handleRelicsNumChange={(value: number, index: number) => {
              handleRelicsNumChange(value, index);
              debounced();
            }}
            addRelicSet={addRelicsSet}
            deleteRelicsSet={(index: number) => {
              deleteRelicsSet(index);
              debounced();
            }}
            addButtonText={"Ajouter un set"}
            isrecommended={false}
          />

          <div className="border-l">
            <GlobalRelicsSet
              relicsSetOptions={relicsSetOptions}
              relicsSetSetup={relicsSetSetup || data.relic_sets}
              handleRelicsSetChange={(
                option: SingleValue<Option>,
                index: number,
                isRecommended: boolean
              ) => {
                handleRelicsSetChange(option, index, isRecommended);
                debounced();
              }}
              handleRelicsNumChange={(value: number, index: number) => {
                handleRelicsNumChange(value, index);
                debounced();
              }}
              addRelicSet={addRelicsSet}
              deleteRelicsSet={(index: number) => {
                deleteRelicsSet(index);
                debounced();
              }}
              addButtonText={"Ajouter un set recommandé"}
              isrecommended={true}
            />
          </div>
        </div>
      </div>
      {/* MAIN STATS */}
      <div className="border border-white p-5 mx-5 mt-10 bg-black/75 shadow-gray rounded-xl shadow-lg">
        <div className="flex">
          <span className="text-2xl mx-auto font-bold mb-5">Main Stats</span>
        </div>
        <GlobalMainStats
          mainStatsSetup={mainStatsSetup || data.main_stats}
          handleEquipmentChange={(
            option: SingleValue<Option>,
            index: number
          ) => {
            handleEquipmentChange(option, index);
            debounced();
          }}
          handleTypeStatChange={(
            option: SingleValue<Option>,
            index: number
          ) => {
            handleTypeStatChange(option, index);
            debounced();
          }}
          deleteMainStats={(index: number) => {
            deleteMainStats(index);
            debounced();
          }}
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
        <GlobalRecommendedStats
          recommendedStatsSetup={
            recommendedStatsSetup || data.recommended_stats
          }
          handleImportanceChange={(value: string, index: number) => {
            handleRecommendedImportanceChange(value, index);
            debounced();
          }}
          handleTypeStatChange={(
            option: SingleValue<Option>,
            index: number
          ) => {
            handleRecommendedTypeStatChange(option, index);
            debounced();
          }}
          handleValueChange={(value: string, index: number) => {
            handleRecommendedValueChange(value, index);
            debounced();
          }}
          addRecommendedStats={addRecommendedStat}
          deleteRecommendedStat={(index: number) => {
            deleteRecommendedStat(index);
            debounced();
          }}
        />
      </div>
    </div>
  );
};

export default GlobalBuild;
