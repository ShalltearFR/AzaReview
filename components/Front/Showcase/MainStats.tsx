"use client";
import { ReactElement, useState } from "react";

interface MainStatsProps {
  type: ReactElement<any, any>;
  name: string;
}

const MainStats: React.FC<MainStatsProps> = ({ type, name }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      className={`${
        showTooltip ? "bg-white/5" : "bg-black/75"
      } min-w-32 rounded-3xl p-5 w-64`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <p className="text-center font-bold text-xl ">{name}</p>
      <ul className="mt-2">{type}</ul>
    </div>
  );
};

export default MainStats;
