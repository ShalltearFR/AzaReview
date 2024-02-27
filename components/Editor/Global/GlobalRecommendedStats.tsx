import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import { typesStat } from "@/utils/statsOption";
import AddInput from "../Add/AddInput";

interface Option {
  value: string;
  label: string;
}

interface recommendedStatsOption {
  type: Option;
  value: string;
  importance: string;
}

interface GlobalrecommendedStatsProps {
  addRecommendedStats: any;
  recommendedStatsSetup: any;
  handleTypeStatChange: any;
  handleValueChange: any;
  handleImportanceChange: any;
  deleteRecommendedStat: any;
}

const GlobalrecommendedStats: React.FC<GlobalrecommendedStatsProps> = ({
  addRecommendedStats,
  recommendedStatsSetup,
  handleTypeStatChange,
  handleValueChange,
  handleImportanceChange,
  deleteRecommendedStat,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addRecommendedStats()}
      >
        <span>Ajouter une stat recommandée</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {recommendedStatsSetup.map(
          (mainStat: recommendedStatsOption, index: number) => {
            return (
              <div key={`recommendedStatsSetup${index}`} className="flex gap-3">
                <AddSelect
                  options={typesStat}
                  value={mainStat.type}
                  onChange={(option) => handleTypeStatChange(option, index)}
                  index={index}
                  className="w-48"
                />
                <AddInput
                  onChange={(value) => handleValueChange(value, index)}
                  value={mainStat.value}
                  className="text-black px-2"
                  placeholder="Valeur"
                />
                <AddInput
                  onChange={(value) => handleImportanceChange(value, index)}
                  value={mainStat.importance}
                  className="text-black px-2"
                  placeholder="Importance"
                />
                <button onClick={() => deleteRecommendedStat(index)}>
                  <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default GlobalrecommendedStats;
