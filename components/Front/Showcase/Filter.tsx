import { Icon } from "@/types/Icon";
import { ElementIcon } from "./ElementIcon";
import { PathIcon } from "./PathIcon";
import { FilterListProps } from "@/types/Filter";
import { Dispatch, SetStateAction } from "react";

interface FilterProps {
  setData: Dispatch<SetStateAction<FilterListProps>>;
  data: FilterListProps;
}

const Filter: React.FC<FilterProps> = ({ setData, data }) => {
  const handleElement = (element: Icon["Element"]) => {
    const newData = {
      ...data,
      element: {
        ...data.element,
        [element]: !data.element[element],
      },
    };
    setData(newData);
  };

  const handlePath = (path: Icon["Path"]) => {
    const newData = {
      ...data,
      path: {
        ...data.path,
        [path]: !data.path[path],
      },
    };
    setData(newData);
  };

  return (
    <div className="flex mt-5 gap-2 justify-center flex-wrap text-white">
      <div className="flex gap-1">
        {[
          "Fire",
          "Ice",
          "Imaginary",
          "Physical",
          "Quantum",
          "Thunder",
          "Wind",
        ].map((element: string) => (
          <button
            key={`filter${element}`}
            className={`bg-black/50 p-1 rounded-full z-[49] ${
              data.element[element as Icon["Element"]]
                ? "bg-darkGreen2/75 outline-dashed outline-1 outline-red-500"
                : "bg-black/50"
            }`}
            onClick={() => handleElement(element as Icon["Element"])}
          >
            <ElementIcon type={element as Icon["Element"]} />
          </button>
        ))}
      </div>

      <div className="hidden smd:block border-l border-gray" />

      <div className="flex gap-1">
        {[
          "Warlock",
          "Warrior",
          "Shaman",
          "Rogue",
          "Mage",
          "Knight",
          "Priest",
          "Memory",
          "Elation",
        ].map((path: string) => (
          <button
            key={`filter${path}`}
            className={`p-1 rounded-full z-[49] ${
              data.path[path as Icon["Path"]]
                ? "bg-darkGreen2/75 outline-dashed outline-1 outline-red-500"
                : "bg-black/50"
            }`}
            onClick={() => handlePath(path as Icon["Path"])}
          >
            <PathIcon type={path as Icon["Path"]} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
