"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface AddToggleButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  name: [string, string];
  className?: string;
}

const AddToggleButton: React.FC<AddToggleButtonProps> = ({
  onChange,
  value,
  name,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    onChange(e);
  };

  useEffect(() => {
    setIsChecked(value ?? false);
  }, [value]);

  return (
    <>
      <label
        className={`relative inline-flex cursor-pointer select-none items-center text-center justify-center rounded-md bg-white p-1 text-black ${
          className ? className : ""
        }`}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e)}
        />
        <span
          className={`absolute left-0 z-10 transition-transform duration-300 h-5/6 w-[48%] border border-gray rounded-lg ${
            isChecked
              ? "bg-green transform translate-x-full"
              : "bg-green transform translate-x-2"
          }`}
        />
        <span
          className={`flex justify-center items-center space-x-[6px] py-2 px-[18px] text-sm font-medium mx-auto w-[49%]`}
        >
          <span className="z-20">{name[0]}</span>
        </span>
        <span
          className={`flex justify-center items-center space-x-[6px] py-2 px-[18px] text-sm font-medium mx-auto w-[49%]`}
        >
          <span className="z-20">{name[1]}</span>
        </span>
      </label>
    </>
  );
};

export default AddToggleButton;
