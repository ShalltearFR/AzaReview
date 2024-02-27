"use client";
import React from "react";
import Select, { SingleValue } from "react-select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";

interface Option {
  value: string;
  label: string;
}

interface LightConeOption {
  value: any;
  id: string;
  recommended: boolean;
  label: string;
}

interface GlobalLightConeProps {
  addLightCone: any;
  lightConesSetup: any;
  lightConeOptions: any;
  handleChange: any;
  deleteLightCone: any;
  isRecommended: boolean;
  addButtonText: string;
}

const GlobalLightCone: React.FC<GlobalLightConeProps> = ({
  addLightCone,
  lightConesSetup,
  lightConeOptions,
  handleChange,
  deleteLightCone,
  isRecommended,
  addButtonText,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addLightCone(isRecommended)}
      >
        <span>{addButtonText}</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {lightConesSetup.map((cone: LightConeOption, index: number) => {
          return (
            cone.recommended === isRecommended && (
              <div key={`lightConesSetup${index}`} className="flex gap-3">
                <AddSelect
                  options={lightConeOptions}
                  value={lightConesSetup[index]}
                  onChange={(option) =>
                    handleChange(option, index, isRecommended)
                  }
                  index={index}
                  className="w-64"
                />
                <button onClick={() => deleteLightCone(index)}>
                  <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default GlobalLightCone;
