import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import { equipments, mainStatOptions } from "@/utils/statsOption";

interface Option {
  value: string;
  label: string;
  num?: number;
}

interface MainStatsOption {
  equipment: Option;
  typeStat: Option;
}

interface GlobalMainStatsProps {
  addMainStats: any;
  mainStatsSetup: any;
  handleEquipmentChange: any;
  handleTypeStatChange: any;
  deleteMainStats: any;
}

const GlobalMainStats: React.FC<GlobalMainStatsProps> = ({
  addMainStats,
  mainStatsSetup,
  handleEquipmentChange,
  handleTypeStatChange,
  deleteMainStats,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addMainStats()}
      >
        <span>Ajouter une main stat</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {mainStatsSetup.map((mainStat: MainStatsOption, index: number) => {
          return (
            <div key={`mainStatsSetup${index}`} className="flex gap-3">
              <AddSelect
                options={equipments}
                value={mainStat.equipment}
                onChange={(option) => handleEquipmentChange(option, index)}
                index={index}
                className="w-32"
              />
              <AddSelect
                options={mainStatOptions}
                value={mainStat.typeStat}
                onChange={(option) => handleTypeStatChange(option, index)}
                index={index}
                className="w-48"
              />
              <button onClick={() => deleteMainStats(index)}>
                <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalMainStats;
