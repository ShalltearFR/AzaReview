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
  }, 1000);

  return (
    <input
      value={textInput || value}
      onChange={(e) => {
        setTextInput(e.target.value);
        debounced(e.target.value);
      }}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default AddInput;
