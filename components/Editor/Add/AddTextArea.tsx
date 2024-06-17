import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface AddTextAreaProps {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const AddTextArea: React.FC<AddTextAreaProps> = ({
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
    <textarea
      value={textInput || value}
      onChange={(e) => {
        setTextInput(e.target.value);
        if (e.target.value === "") {
          onChange("");
        } else {
          debounced(e.target.value);
        }
      }}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default AddTextArea;
