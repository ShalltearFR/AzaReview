import { TranslateSection } from "@/types/homepageDictionnary";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { StatsTranslate } from "@/utils/statsDictionnary";
import NavBar from "../NavBar";
import StarBGAnimation from "../StarBGAnimation";
import { CDN } from "@/utils/cdn";
import RadarChart from "./RadarChart";
import Footer from "../UID/Footer";
import StatsTable from "./StatsTable";
import { Chart } from "chart.js";
import ChartVisu from "./ChartVisu";
import TopRelics from "./TopRelics";
import TopLightCones from "./TopLightCones";

interface StatsPageProps {
  lang: keyof TranslateSection;
  date: Date;
  dataStats: CharacterStatsType;
  character: any;
  relicsList: any;
  lightConesList: any;
}

const StatsPage: React.FC<StatsPageProps> = ({
  lang,
  dataStats,
  character,
  relicsList,
  lightConesList,
  date,
}) => {
  return (
    <>
      <NavBar />
      <StarBGAnimation />
      <div className="min-h-[calc(100vh-205px)] relative text-white mt-5 mb-5">
        <img
          src={`${CDN}/${character.portrait}`}
          className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
        />
        <div className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl">
          <div className="flex flex-col relative items-right mmd:items-center italic">
            <h1 className="mx-auto text-4xl font-bold">
              {character.name === "{NICKNAME}"
                ? lang === "en"
                  ? "Pioneer"
                  : "Pionnier"
                : character.name}
            </h1>
            <div className="mmd:absolute right-0 text-right pr-2 xl:pr-0 mt-2 mmd:mt-0">
              <p>
                {StatsTranslate[lang ?? "fr"][0]} {date.toLocaleDateString()}{" "}
                {StatsTranslate[lang ?? "fr"][1]}{" "}
                {date.toLocaleTimeString().replaceAll("/", "-")}
              </p>
              <p>
                {StatsTranslate[lang ?? "fr"][2]} {dataStats.data.length}{" "}
                {StatsTranslate[lang ?? "fr"][3]}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 flex-wrap">
            <div className="mx-auto">
              <h2 className="text-2xl text-center font-bold text-yellow mb-3">
                {StatsTranslate[lang ?? "fr"][4]}
              </h2>
              <StatsTable dataStats={dataStats} lang={lang} />
            </div>

            <div className="mx-auto mt-5 lg:mt-0">
              <h2 className="font-bold text-2xl underline text-orange text-center mb-2">
                {StatsTranslate[lang ?? "fr"][16]}
              </h2>
              <ChartVisu dataStats={dataStats} lang={lang} />
            </div>
          </div>
          <TopRelics
            dataStats={dataStats}
            lang={lang}
            relicsList={relicsList}
          />
          <TopLightCones
            dataStats={dataStats}
            lang={lang}
            lightConesList={lightConesList}
          />
        </div>
      </div>
      <Footer lang={lang} />
    </>
  );
};

export default StatsPage;
