"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Option {
  value: string;
  label: string;
}

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

export default AddInput;
