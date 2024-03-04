import { ChangeEvent, useEffect, useState } from "react";

interface AddToggleButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}

const AddToggleButton: React.FC<AddToggleButtonProps> = ({
  onChange,
  value,
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
      <label className="relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1 text-black">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e)}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? "text-primary bg-gray/60" : "text-body-color"
          }`}
        >
          Reliques
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? "text-primary bg-gray/60" : "text-body-color"
          }`}
        >
          Ornements
        </span>
      </label>
    </>
  );
};

export default AddToggleButton;
