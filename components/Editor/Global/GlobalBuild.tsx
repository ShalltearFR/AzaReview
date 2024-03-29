"use client";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import GlobalLightCone from "./GlobalLightCone";
import GlobalRelicsSet from "./GlobalRelicsSet";
import GlobalMainStats from "./GlobalMainStats";
import GlobalRecommendedStats from "./GlobalRecommendedStats";
import { TrashIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
} from "@/types/EditorPage";
import { SingleValue } from "react-select";
import { useSpring, animated } from "react-spring";
import AddInput from "../Add/AddInput";
import AddTextArea from "../Add/AddTextArea";
import translateBBCode from "@/utils/translateBBCode";

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
  const [buildDescriptionInput, setBuildDescriptionInput] =
    useState<string>("");
  const [recommendedCommentInput, setRecommendedCommentInput] =
    useState<string>("");
  const [lightConesSetup, setLightConesSetup] = useState<LightConeOption[]>([]);
  const [relicsSetSetup, setRelicsSetSetup] = useState<RelicSetOption[]>([]);
  const [mainStatsSetup, setMainStatsSetup] = useState<MainStatsOption[]>([]);
  const [recommendedStatsSetup, setRecommendedStatsSetup] = useState<
    recommendedStatsOption[]
  >([]);

  // const [showBuildDesc, setShowBuildDesc] = useState<boolean>(false);
  const [showRecommendedBuildDescPrev, setShowRecommendedBuildDescPrev] =
    useState<boolean>(false);
  const [showBuildDescPrev, setShowBuildDescPrev] = useState<boolean>(false);
  const [showBuild, setShowBuild] = useState<boolean>(false);
  const { transform } = useSpring({
    transform: `translateX(${showBuild ? "0%" : "-120%"})`,
    config: { tension: 300, friction: 26 },
  });

  // INIT DES VALEURS
  useEffect(() => {
    setBuildNameInput(data.buildName);
    setBuildDescriptionInput(data.buildDesc);
    setLightConesSetup(data.lightCones);
    setRelicsSetSetup(data.relics_set);
    setMainStatsSetup(data.main_stats);
    setRecommendedStatsSetup(data.recommended_stats);
    setRecommendedCommentInput(data.recommended_comment);
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
      {
        id: "",
        recommended: isrecommended,
        value: "",
        label: "",
        num: 2,
        ornament: false,
      },
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
    const dataSaved = {
      buildName: buildNameInput,
      buildDesc: buildDescriptionInput,
      lightCones: lightConesSetup,
      relics_set: relicsSetSetup,
      main_stats: mainStatsSetup,
      recommended_stats: recommendedStatsSetup,
      recommended_comment: recommendedCommentInput,
    };

    onChange(dataSaved, index);
  };

  const debounced = useDebouncedCallback(() => {
    updateData();
  }, 250);

  return (
    <div className="mx-5 p-5 text-white border border-white">
      <div className="">
        <div className="flex items-center">
          <label className="flex items-center">
            <span className="text-2xl ml-5 h-9 mr-2">Nom du build : </span>
            <AddInput
              value={buildNameInput}
              className="px-2 text-black rounded-full h-10 mt-auto self-center"
              onChange={(value) => {
                setBuildNameInput(value);
                debounced();
              }}
            />
          </label>
          <button
            className="flex gap-2 ml-5 font-bold p-2 rounded-xl bg-red select-none"
            onClick={(e) => {
              deleteBuild();
            }}
          >
            SUPPRIMER LE BUILD
            <TrashIcon className="h-6 " />
          </button>
          <button
            className=" flex gap-2 ml-auto font-bold bg-gray p-2 rounded-xl select-none"
            onClick={() => setShowBuild(!showBuild)}
          >
            {showBuild ? "Masquer le build" : "Afficher le build"}

            <ArrowsUpDownIcon className="h-6" />
          </button>
        </div>
        <label className="flex items-center mt-5 relative">
          <span className="text-2xl ml-5 h-9 mr-2 w-72 flex flex-col items-center">
            Description du build :
          </span>
          <AddTextArea
            value={buildDescriptionInput}
            className={`px-2 text-black rounded-2xl h-10 mt-auto self-center w-full`}
            onChange={(value) => {
              setBuildDescriptionInput(value);
              debounced();
            }}
          />
          <div
            onMouseOver={() => setShowBuildDescPrev(true)}
            onMouseLeave={() => setShowBuildDescPrev(false)}
          >
            <span className="underline text-light-blue2 ml-5">Aperçu</span>

            <div
              className={`absolute bg-black p-2 border border-white rounded-2xl z-20 right-16 top-0 font-bold ${
                showBuildDescPrev ? "" : "hidden"
              }`}
            >
              <p className="text">Desktop :</p>
              <div className="w-[1450px] bg-light-blue">
                {translateBBCode(buildDescriptionInput)}
              </div>
              <p className="mt-5 text-">Mobile :</p>
              <div className="w-[500px] bg-light-blue">
                {translateBBCode(buildDescriptionInput)}
              </div>
            </div>
          </div>
        </label>
      </div>
      <animated.div
        style={{
          transform,
          height: showBuild ? "auto" : "0",
        }}
      >
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
              Statistiques recommandées
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
          <div className="flex w-full items-center relative">
            <label className="flex items-center mt-5 w-full">
              <span className="text-xl ml-5 h-9 mr-2 w-40">Commentaire :</span>
              <AddTextArea
                value={recommendedCommentInput}
                className="px-2 text-black rounded-2xl h-10 mt-auto self-center w-full"
                onChange={(value) => {
                  setRecommendedCommentInput(value);
                  debounced();
                }}
              />
            </label>
            <div
              onMouseOver={() => setShowRecommendedBuildDescPrev(true)}
              onMouseLeave={() => setShowRecommendedBuildDescPrev(false)}
            >
              <span className="underline text-light-blue2 ml-5">Aperçu</span>

              <div
                className={`absolute bg-black p-2 border border-white rounded-2xl z-20 right-16 top-0 font-bold ${
                  showRecommendedBuildDescPrev ? "" : "hidden"
                }`}
              >
                <p className="text">Desktop :</p>
                <div className="w-[445px] bg-light-blue text-orange2 text-center">
                  {translateBBCode(recommendedCommentInput)}
                </div>
                <p className="mt-5 text-">Mobile :</p>
                <div className="w-[400px] bg-light-blue text-orange2 text-center">
                  {translateBBCode(recommendedCommentInput)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default GlobalBuild;
