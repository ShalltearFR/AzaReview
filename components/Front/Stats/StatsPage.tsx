import { TranslateSection } from "@/types/homepageDictionnary";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { StatsTranslate } from "@/utils/statsDictionnary";
import NavBar from "../NavBar";
import StarBGAnimation from "../StarBGAnimation";
import { CDN } from "@/utils/cdn";
import RadarChart from "./RadarChart";
import Footer from "../UID/Footer";
import StatsTable from "./StatsTable";
import { Suspense } from "react";
import LoadingSpin from "@/components/LoadingSpin";
import ChartVisu from "./ChartVisu";
import TopRelics from "./TopRelics";
import TopLightCones from "./TopLightCones";

interface StatsPageProps {
  lang: keyof TranslateSection;
  date: Date;
  dataStats: CharacterStatsType;
  character: {
    name: string;
    portrait: string;
  };
  relicsList: any;
  lightConesList: any;
}

const StatsPage: React.FC<StatsPageProps> = ({
  lang = "fr",
  date,
  dataStats,
  character,
  relicsList,
  lightConesList,
}) => {
  const characterName =
    character.name === "{NICKNAME}"
      ? lang === "en"
        ? "Pioneer"
        : "Pionnier"
      : character.name;
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const statsLength = dataStats.data.length;

  return (
    <>
      <NavBar />
      <StarBGAnimation />
      <div className="min-h-[calc(100vh-205px)] relative text-white mt-5 mb-5">
        <img
          src={`${CDN}/${character.portrait}`}
          alt={`${characterName} portrait`}
          className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
        />
        <div className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl">
          <header className="flex flex-col relative items-center mmd:items-center italic">
            <h1 className="mx-auto text-4xl font-bold">{characterName}</h1>
            <div className="mmd:absolute right-0 text-right pr-2 xl:pr-0 mt-2 mmd:mt-0">
              <p>{`${StatsTranslate[lang][0]} ${formattedDate} `}</p>
              <p>{`${StatsTranslate[lang][2]} ${statsLength} ${StatsTranslate[lang][3]}`}</p>
            </div>
          </header>
          {/* <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}> */}
          <main className="flex justify-center items-center mt-10 flex-wrap h-[540px]">
            <section className="mx-auto">
              <h2 className="font-bold text-2xl underline text-orange text-center mb-3">
                {StatsTranslate[lang][4]}
              </h2>
              <div className="h-[500px]">
                <StatsTable dataStats={dataStats} lang={lang} />
              </div>
            </section>
            <section className="mx-auto mt-5 lg:mt-0">
              <h2 className="font-bold text-2xl underline text-orange text-center mb-2">
                {StatsTranslate[lang][16]}
              </h2>
              <div className="h-[500px]">
                <ChartVisu dataStats={dataStats} lang={lang} />
              </div>
            </section>
          </main>
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
          {/* </Suspense> */}
        </div>
      </div>
      <Footer lang={lang} />
    </>
  );
};

export default StatsPage;
