import { TranslateSection } from "@/types/homepageDictionnary";
import { DefaultUserOptions, UserOptionsProps } from "@/types/UserOptions";
import { userOptionsLanguage } from "@/utils/dictionnary";
import { useEffect } from "react";

interface OptionsProps {
  setUserOptions: (value: UserOptionsProps) => void;
  userOptions: UserOptionsProps;
  lang: keyof TranslateSection | undefined;
}

const Options: React.FC<OptionsProps> = ({
  setUserOptions,
  userOptions,
  lang,
}) => {
  useEffect(() => {
    if (userOptions !== DefaultUserOptions) {
      //setUserOptions(DefaultUserOptions);
      localStorage.setItem("userOptions", JSON.stringify(userOptions));
    }
  }, [userOptions]);

  useEffect(() => {
    const item = localStorage.getItem("userOptions");
    if (item) {
      setUserOptions(JSON.parse(item));
    } else {
      setUserOptions(DefaultUserOptions);
    }
  }, []);

  return (
    <div className="rounded-xl xl2:rounded-none bg-[#4E4A82] w-fit p-5 mx-auto mt-10 xl2:mt-0 xl2:w-[350px]">
      <div className="text-center">
        <p className="text-orange text-xl font-bold xl2:hidden">
          {userOptionsLanguage[lang ?? "fr"].displayOptions}
        </p>
      </div>
      <div className="flex flex-col mmd:flex-row justify-center gap-5 mt-3 xl2:flex-col">
        <div className="p-3 rounded-xl border border-gray">
          <p className="text-white text-lg font-bold mb-1">
            {userOptionsLanguage[lang ?? "fr"].reliquesOrnaments}
          </p>
          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showNotation}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showNotation: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].notations}
            </span>
          </label>
          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showRelicProc}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showRelicProc: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].procs}
            </span>
          </label>
        </div>

        <div className="p-3 rounded-xl border border-gray">
          <p className="text-white text-lg font-bold mb-1">
            {userOptionsLanguage[lang ?? "fr"].recommandedStatistics}
          </p>

          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showRecommandedStats}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showRecommandedStats: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].statistics}
            </span>
          </label>
          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showRecommandedStatsCom}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showRecommandedStatsCom: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].commentary}
            </span>
          </label>
        </div>

        <div className="p-3 rounded-xl border border-gray">
          <p className="text-white text-lg font-bold mb-1">
            {userOptionsLanguage[lang ?? "fr"].others}
          </p>

          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showRedstats}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showRedstats: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].redStats}
            </span>
          </label>
          <label className="flex items-center gap-x-2 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-[1px]"
              checked={userOptions.showInformations}
              onChange={(e) =>
                setUserOptions({
                  ...userOptions,
                  showInformations: e.target.checked,
                })
              }
            />
            <span className="text-white">
              {userOptionsLanguage[lang ?? "fr"].informations}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Options;
