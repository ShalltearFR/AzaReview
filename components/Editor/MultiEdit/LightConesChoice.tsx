"use client";
import { LightConeOption } from "@/types/EditorPage";
import { useEffect, useState } from "react";
import light_conesFR from "@/static/light_conesFR.json";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CDN } from "@/utils/cdn";
import AddSelect from "../Add/AddSelect";
import { SingleValue } from "react-select";

interface LightConesChoiceProps {
  lightCones: LightConeOption[];
  setLightCones: React.Dispatch<React.SetStateAction<LightConeOption[]>>;
}

interface Option {
  value: string;
  label: string;
  icon: string;
}

const lightConesOptions: Option[] = light_conesFR.map((lightCone) => {
  return {
    value: lightCone.id,
    label: lightCone.name,
    icon: lightCone.icon,
  };
});

const LightConesChoice: React.FC<LightConesChoiceProps> = ({
  lightCones,
  setLightCones,
}) => {
  const [openLightConesMenu, setOpenLightConesMenu] = useState(false);
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  const handleAddLightCone = (isRecommended: boolean) => {
    const newLightCones = [...lightCones];

    newLightCones.push({
      id: "0",
      value: "0",
      label: "",
      recommended: isRecommended,
      uid: crypto.randomUUID(),
    });
    newLightCones.sort((a, b) => {
      return a.recommended === b.recommended ? 0 : a.recommended ? 1 : -1;
    });
    setLightCones(newLightCones);
  };

  const handleChange = (
    option: Option,
    index: number,
    isRecommended: boolean
  ) => {
    const newLightCones = [...lightCones];
    newLightCones[index].id = option.value;
    newLightCones[index].label = option.label;
    newLightCones[index].recommended = isRecommended;

    setLightCones(newLightCones);
  };

  const deleteLightCone = (uid: string) => {
    const newLightCones = [...lightCones];
    const indextoDelete = newLightCones.findIndex((el) => el.uid === uid);
    newLightCones.splice(indextoDelete, 1);
    setLightCones(newLightCones);
  };

  return (
    <div className="bg-black/50 select-none">
      <div className="bg-gray-800 p-4 text-white">
        {/* Barre supérieure du menu avec le bouton */}
        <button
          className="flex w-full justify-between items-center border-b border-gray-600 pb-2"
          onClick={() => setOpenLightConesMenu(!openLightConesMenu)}
        >
          <h2 className="text-xl font-bold">Cones de lumière</h2>
          <p className="text-lg focus:outline-none">
            {openLightConesMenu ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </p>
        </button>

        {/* Contenu du menu déroulant */}
        <div
          className={`${
            openLightConesMenu
              ? "min-h-96 max-h-full"
              : "min-h-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="grid grid-cols-[1fr_2px_1fr] justify-center mt-5 gap-x-5">
            <div className="flex flex-col">
              <button
                className="p-2 h-10 bg-green rounded-full text-black font-semibold"
                onClick={() => handleAddLightCone(false)}
              >
                Ajouter un cone
              </button>
              <div>
                {lightCones.map((lightCone, index) =>
                  !lightCone.recommended ? (
                    <div
                      key={`lightConeCard+${lightCone.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="lightCone"
                        value={lightCone}
                        onChange={(option: any) =>
                          handleChange(option, index, false)
                        }
                      />
                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() =>
                            deleteLightCone(lightCone.uid as string)
                          }
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
                onClick={() => handleAddLightCone(true)}
              >
                Ajouter un cone recommandé
              </button>
              <div>
                {lightCones.map((lightCone, index) =>
                  lightCone.recommended ? (
                    <div
                      key={`lightConeCardRecommended+${lightCone.id}+${index}`}
                      className="flex justify-center items-center border-b border-gray py-2"
                    >
                      <AddSelect
                        index={index}
                        className="w-64"
                        type="lightCone"
                        value={lightCone}
                        onChange={(option: any) =>
                          handleChange(option, index, true)
                        }
                      />
                      <div className="flex justify-center items-center h-[38px] w-12 bg-red rounded-r-full">
                        <TrashIcon
                          className="h-6 cursor-pointer"
                          onClick={() =>
                            deleteLightCone(lightCone.uid as string)
                          }
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

export default LightConesChoice;
