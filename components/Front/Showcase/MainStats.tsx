import { TranslateSection } from "@/types/homepageDictionnary";
import { ReactElement, useState } from "react";

interface MainStatsProps {
  lang: keyof TranslateSection | undefined;
  type: ReactElement<any, any>;
  name: { en: string; fr: string };
}

const MainStats: React.FC<MainStatsProps> = ({ lang, type, name }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      className={`${
        showTooltip ? "bg-white/5" : "bg-black/75"
      } min-w-32 rounded-3xl p-5 w-64`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <p className="text-center font-bold text-xl ">
        {lang === "en" ? name.en : name.fr}
      </p>
      <ul className="mt-2">{type}</ul>
    </div>
  );
};

export default MainStats;
