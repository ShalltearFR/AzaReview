import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";

interface RelicsSetOption {
  value: any;
  id: string;
  recommended: boolean;
  label: string;
}

interface GlobalOrnamentsSetProps {
  addOrnamentsSet: any;
  ornamentsSetSetup: any;
  handleOrnamentsSetChange: any;
  deleteOrnamentsSet: any;
  isrecommended: boolean;
  addButtonText: string;
}

const GlobalOrnamentsSet: React.FC<GlobalOrnamentsSetProps> = ({
  addOrnamentsSet,
  ornamentsSetSetup,
  handleOrnamentsSetChange,
  deleteOrnamentsSet,
  isrecommended,
  addButtonText,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
        onClick={() => addOrnamentsSet(isrecommended)}
      >
        <span>{addButtonText}</span>
        <PlusIcon className="h-6 mt-1" />
      </button>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
        {ornamentsSetSetup.map((relic: RelicsSetOption, index: number) => {
          return (
            relic.recommended === isrecommended && (
              <div
                key={crypto.randomUUID()}
                className="flex gap-3 border border-gray px-3 rounded-lg"
              >
                <AddSelect
                  type="ormanentSet"
                  value={ornamentsSetSetup[index]}
                  onChange={(option) =>
                    handleOrnamentsSetChange(option, index, isrecommended)
                  }
                  index={index}
                  className="w-64"
                />

                <button onClick={() => deleteOrnamentsSet(index)}>
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

export default GlobalOrnamentsSet;
