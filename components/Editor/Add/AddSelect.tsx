import React from "react";
import Select, { SingleValue } from "react-select";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Option {
  value: string;
  label: string;
}

interface AddSelectProps {
  value: any;
  index: number;
  recommanded?: boolean;
  options: Option[];
  className?: string;
  onChange: (
    option: SingleValue<Option>,
    index: number,
    isRecommanded: boolean
  ) => void;
}

const AddSelect: React.FC<AddSelectProps> = ({
  value,
  index,
  recommanded = false,
  options,
  className,
  onChange,
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
        className={className}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default AddSelect;
