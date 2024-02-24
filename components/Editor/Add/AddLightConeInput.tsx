import React from "react";
import Select, { SingleValue } from "react-select";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Option {
  value: string;
  label: string;
}

interface AddLightConeSelectProps {
  value: any;
  index: number;
  recommanded?: boolean;
  options: Option[];
  onChange: (
    option: SingleValue<Option>,
    index: number,
    isRecommanded: boolean
  ) => void;
  onDelete: (index: number) => void;
}

const AddLightConeSelect: React.FC<AddLightConeSelectProps> = ({
  value,
  index,
  recommanded = false,
  options,
  onChange,
  onDelete,
}) => {
  const handleSelectChange = (option: SingleValue<Option>) => {
    onChange(option, index, recommanded);
  };
  return (
    <div className="flex items-center gap-3">
      <Select
        options={options}
        value={value}
        styles={{
          control: (base) => ({
            ...base,
            border: "0",
            borderRadius: "0",
            backgroundColor: "white",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "white",
            color: "black",
          }),
          singleValue: (base) => ({
            ...base,
            color: "black",
          }),
        }}
        className="w-64"
        onChange={handleSelectChange}
      />
      <button onClick={() => onDelete(index)}>
        <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
      </button>
    </div>
  );
};

export default AddLightConeSelect;
