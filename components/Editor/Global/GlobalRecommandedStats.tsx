import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import { typesStat } from "@/utils/statsOption";

interface Option {
  value: string;
  label: string;
}

interface RecommandedStatsOption {
  type: Option;
  value: string;
  importance: string;
}

interface GlobalRecommandedStatsProps {
  addRecommandedStats: any;
  recommandedStatsSetup: any;
  handleTypeStatChange: any;
  handleValueChange: any;
  handleImportanceChange: any;
  deleteRecommandedStat: any;
}

const GlobalRecommandedStats: React.FC<GlobalRecommandedStatsProps> = ({
  addRecommandedStats,
  recommandedStatsSetup,
  handleTypeStatChange,
  handleValueChange,
  handleImportanceChange,
  deleteRecommandedStat,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addRecommandedStats()}
      >
        <span>Ajouter une stat recommandée</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {recommandedStatsSetup.map(
          (mainStat: RecommandedStatsOption, index: number) => {
            return (
              <div key={crypto.randomUUID()} className="flex gap-3">
                <AddSelect
                  options={typesStat}
                  value={mainStat.type}
                  onChange={(option) => handleTypeStatChange(option, index)}
                  index={index}
                  className="w-48"
                />
                <input
                  value={mainStat.value}
                  onChange={(e) => handleValueChange(e.target.value, index)}
                  className="text-black px-2"
                  placeholder="Valeur"
                />
                <input
                  value={mainStat.importance}
                  onChange={(e) =>
                    handleImportanceChange(e.target.value, index)
                  }
                  className="text-black px-2"
                  placeholder="Importance"
                />
                <button onClick={() => deleteRecommandedStat(index)}>
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

export default GlobalRecommandedStats;
