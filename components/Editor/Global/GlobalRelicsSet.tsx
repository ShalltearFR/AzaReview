import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";

interface RelicsSetOption {
  value: any;
  id: string;
  recommended: boolean;
  label: string;
}

interface GlobalRelicsSetProps {
  addRelicSet: any;
  relicsSetSetup: any;
  relicsSetOptions: any;
  handleRelicsSetChange: any;
  handleRelicsNumChange: any;
  deleteRelicsSet: any;
  isrecommended: boolean;
  addButtonText: string;
}

const GlobalRelicsSet: React.FC<GlobalRelicsSetProps> = ({
  addRelicSet,
  relicsSetSetup,
  relicsSetOptions,
  handleRelicsSetChange,
  handleRelicsNumChange,
  deleteRelicsSet,
  isrecommended,
  addButtonText,
}) => {
  const numOptions = [
    {
      value: "2",
      label: "2",
    },
    {
      value: "4",
      label: "4",
    },
  ];

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addRelicSet(isrecommended)}
      >
        <span>{addButtonText}</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {relicsSetSetup.map((relic: RelicsSetOption, index: number) => {
          return (
            relic.recommended === isrecommended && (
              <div key={crypto.randomUUID()} className="flex gap-3">
                <AddSelect
                  options={relicsSetOptions}
                  value={relicsSetSetup[index]}
                  onChange={(option) =>
                    handleRelicsSetChange(option, index, isrecommended)
                  }
                  index={index}
                  className="w-64"
                />
                <AddSelect
                  options={numOptions}
                  value={{
                    value: `${relicsSetSetup[index].num}` || "2",
                    label: `${relicsSetSetup[index].num || "2"} Pieces`,
                  }}
                  onChange={(option) =>
                    handleRelicsNumChange(Number(option?.value), index)
                  }
                  index={index}
                  className="w-32"
                />
                <button onClick={() => deleteRelicsSet(index)}>
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

export default GlobalRelicsSet;
