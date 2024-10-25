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
  recommended?: boolean;
  options: Option[];
  className?: string;
  onChange: (
    option: SingleValue<Option>,
    index: number,
    isrecommended: boolean
  ) => void;
}

const AddSelect: React.FC<AddSelectProps> = ({
  value,
  index,
  recommended = false,
  options,
  className,
  onChange,
}) => {
  const handleSelectChange = (option: SingleValue<Option>) => {
    onChange(option, index, recommended);
  };
  return (
    <div className="flex items-center gap-3">
      <Select
        options={options}
        value={value}
        styles={{
          control: (base: any) => ({
            ...base,
            border: "0",
            borderRadius: "0",
            backgroundColor: "white",
          }),
          menu: (base: any) => ({
            ...base,
            backgroundColor: "white",
            color: "black",
          }),
          singleValue: (base: any) => ({
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
