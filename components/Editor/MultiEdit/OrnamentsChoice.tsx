"use client";
import { RelicSetOption } from "@/types/EditorPage";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";

interface OrnamentsChoiceProps {
  ornaments: RelicSetOption[];
  setOrnaments: React.Dispatch<React.SetStateAction<RelicSetOption[]>>;
}

interface Option {
  value: string;
  label: string;
  icon: string;
  num?: 2 | 4;
}

const OrnamentsChoice: React.FC<OrnamentsChoiceProps> = ({
  ornaments,
  setOrnaments,
}) => {
  const [openOrnamentsMenu, setOpenOrnamentsMenu] = useState(false);
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  const handleAddOrnament = (isRecommended: boolean) => {
    const newOrnaments = [...ornaments];

    newOrnaments.push({
      id: "0",
      value: "0",
      label: "",
      recommended: isRecommended,
      num: 2,
      uid: crypto.randomUUID(),
    });
    newOrnaments.sort((a, b) => {
      return a.recommended === b.recommended ? 0 : a.recommended ? 1 : -1;
    });
    setOrnaments(newOrnaments);
  };

  const handleOrnamentChange = (option: Option, index: number) => {
    const newOrnaments = [...ornaments];
    newOrnaments[index].id = option.value;
    newOrnaments[index].value = option.value;
    newOrnaments[index].label = option.label;
    setOrnaments(newOrnaments);
  };

  const deleteOrnament = (uid: string) => {
    const newRelics = [...ornaments];
    const indextoDelete = newRelics.findIndex((el) => el.uid === uid);
    newRelics.splice(indextoDelete, 1);
    setOrnaments(newRelics);
  };

  return (
    <div className="bg-black/50 select-none">
      <div className="bg-gray-800 p-4 text-white">
        {/* Barre supérieure du menu avec le bouton */}
        <button
          className="flex w-full justify-between items-center border-b border-gray-600 pb-2"
          onClick={() => setOpenOrnamentsMenu(!openOrnamentsMenu)}
        >
          <h2 className="text-xl font-bold">Set d'Ornements</h2>
          <p className="text-lg focus:outline-none">
            {openOrnamentsMenu ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </p>
        </button>

        {/* Contenu du menu déroulant */}
        <div
          className={`${
            openOrnamentsMenu
              ? "min-h-96 max-h-full"
              : "min-h-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="grid grid-cols-[1fr_2px_1fr] justify-center mt-5 gap-x-5">
            <div className="flex flex-col">
              <button
                className="p-2 h-10 bg-green rounded-full text-black font-semibold"
                onClick={() => handleAddOrnament(false)}
              >
                Ajouter un set d'ornements
              </button>
              <div>
                {ornaments.map((ornament, index) =>
                  !ornament.recommended ? (
                    <div
                      key={`ornamentCard+${ornament.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="ormanentSet"
                        value={ornament}
                        onChange={(option: any) =>
                          handleOrnamentChange(option, index)
                        }
                      />
                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() => deleteOrnament(ornament.uid as string)}
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
                onClick={() => handleAddOrnament(true)}
              >
                Ajouter un set d'ornements recommandé
              </button>
              <div>
                {ornaments.map((ornament, index) =>
                  ornament.recommended ? (
                    <div
                      key={`ornamentCardRecommended+${ornament.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="ormanentSet"
                        value={ornament}
                        onChange={(option: any) =>
                          handleOrnamentChange(option, index)
                        }
                      />

                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() => deleteOrnament(ornament.uid as string)}
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

export default OrnamentsChoice;
