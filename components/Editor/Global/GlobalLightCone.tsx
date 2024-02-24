import React from "react";
import Select, { SingleValue } from "react-select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddLightConeInput from "../Add/AddLightConeInput";

interface Option {
  value: string;
  label: string;
}

interface LightConeOption {
  value: any;
  id: string;
  recommanded: boolean;
  label: string;
}

interface GlobalLightConeProps {
  addLightCone: any;
  lightConesSetup: any;
  lightConeOptions: any;
  handleChange: any;
  deleteLightCone: any;
  isRecommanded: boolean;
  addButtonText: string;
}

const GlobalLightCone: React.FC<GlobalLightConeProps> = ({
  addLightCone,
  lightConesSetup,
  lightConeOptions,
  handleChange,
  deleteLightCone,
  isRecommanded,
  addButtonText,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addLightCone(isRecommanded)}
      >
        <span>{addButtonText}</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 border-r mt-5">
        {lightConesSetup.map((cone: LightConeOption, index: number) => {
          return (
            cone.recommanded === isRecommanded && (
              <div key={crypto.randomUUID()}>
                <AddLightConeInput
                  options={lightConeOptions}
                  value={lightConesSetup[index]}
                  onChange={(option) =>
                    handleChange(option, index, isRecommanded)
                  }
                  onDelete={() => deleteLightCone(index)}
                  index={index}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default GlobalLightCone;
