import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface AddInputProps {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const AddInput: React.FC<AddInputProps> = ({
  value = "",
  className,
  placeholder = "",
  onChange,
}) => {
  const [textInput, setTextInput] = useState<string>("");

  const debounced = useDebouncedCallback((value) => {
    onChange(value);
  }, 250);

  return (
    <input
      className={`${className} flex items-center gap-3 h-12`}
      value={textInput || value}
      onChange={(e) => {
        setTextInput(e.target.value);
        if (e.target.value === "") {
          onChange("");
        } else {
          debounced(e.target.value);
        }
      }}
      placeholder={placeholder}
    />
  );
};

export default AddInput;
