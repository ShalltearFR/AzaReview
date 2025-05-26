import { useEffect, useState, useRef } from "react";

const useDebouncedActiveId = (initialId: string | null, delay = 200) => {
  const [activeId, setActiveId] = useState<string | null>(initialId);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveIdDebounced = (id: string | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return [activeId, setActiveIdDebounced] as const;
};

export default useDebouncedActiveId;
