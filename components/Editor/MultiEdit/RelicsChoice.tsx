"use client";
import { LightConeOption, RelicSetOption } from "@/types/EditorPage";
import { useEffect, useState } from "react";
import relic_setsFR from "@/static/relic_setsFR.json";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CDN } from "@/utils/cdn";
import AddSelect from "../Add/AddSelect";

interface RelicsChoiceProps {
  relics: RelicSetOption[];
  setRelics: React.Dispatch<React.SetStateAction<RelicSetOption[]>>;
}

interface Option {
  value: string;
  label: string;
  icon: string;
  num?: number;
}

const RelicsChoice: React.FC<RelicsChoiceProps> = ({ relics, setRelics }) => {
  const [openRelicsMenu, setOpenRelicsMenu] = useState(false);
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  const handleAddRelic = (isRecommended: boolean) => {
    const newRelics = [...relics];

    newRelics.push({
      id: "0",
      value: "0",
      label: "",
      recommended: isRecommended,
      num: 2,
      uid: crypto.randomUUID(),
    });
    newRelics.sort((a, b) => {
      return a.recommended === b.recommended ? 0 : a.recommended ? 1 : -1;
    });
    setRelics(newRelics);
  };

  const handleRelicChange = (option: Option, index: number) => {
    const newRelics = [...relics];
    newRelics[index].id = option.value;
    newRelics[index].value = option.value;
    newRelics[index].label = option.label;
    setRelics(newRelics);
  };

  const handleRelicNumChange = (option: any, index: number) => {
    const newRelics = [...relics];
    newRelics[index].num = Number(option.value);

    setRelics(newRelics);
  };

  const deleteRelic = (uid: string) => {
    const newRelics = [...relics];
    const indextoDelete = newRelics.findIndex((el) => el.uid === uid);
    newRelics.splice(indextoDelete, 1);
    setRelics(newRelics);
  };

  return (
    <div className="bg-black/50 select-none">
      <div className="bg-gray-800 p-4 text-white">
        {/* Barre supérieure du menu avec le bouton */}
        <button
          className="flex w-full justify-between items-center border-b border-gray-600 pb-2"
          onClick={() => setOpenRelicsMenu(!openRelicsMenu)}
        >
          <h2 className="text-xl font-bold">Set de Reliques</h2>
          <p className="text-lg focus:outline-none">
            {openRelicsMenu ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </p>
        </button>

        {/* Contenu du menu déroulant */}
        <div
          className={`${
            openRelicsMenu
              ? "min-h-96 max-h-full"
              : "min-h-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="grid grid-cols-[1fr_2px_1fr] justify-center mt-5 gap-x-5">
            <div className="flex flex-col">
              <button
                className="p-2 h-10 bg-green rounded-full text-black font-semibold"
                onClick={() => handleAddRelic(false)}
              >
                Ajouter un set de reliques
              </button>
              <div>
                {relics.map((relic, index) =>
                  !relic.recommended ? (
                    <div
                      key={`relicCard+${relic.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="relicSet"
                        value={relic}
                        onChange={(option: any) =>
                          handleRelicChange(option, index)
                        }
                      />
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="num"
                        value={{
                          value: `${relic.num}` || "2",
                          label: `${relic.num || "2"} P`,
                        }}
                        onChange={(option: any) =>
                          handleRelicNumChange(option, index)
                        }
                      />
                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() => deleteRelic(relic.uid as string)}
                        />
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className="border-l-2 border-gray-800"></div>
            <div className="flex flex-col">
              <button
                className="p-2 h-10 bg-green rounded-full text-black font-semibold"
                onClick={() => handleAddRelic(true)}
              >
                Ajouter un set de reliques recommandé
              </button>
              <div>
                {relics.map((relic, index) =>
                  relic.recommended ? (
                    <div
                      key={`relicCardRecommended+${relic.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="relicSet"
                        value={relic}
                        onChange={(option: any) =>
                          handleRelicChange(option, index)
                        }
                      />
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="num"
                        value={{
                          value: `${relic.num}` || "2",
                          label: `${relic.num || "2"} P`,
                        }}
                        onChange={(option: any) =>
                          handleRelicNumChange(option, index)
                        }
                      />
                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() => deleteRelic(relic.uid as string)}
                        />
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelicsChoice;
