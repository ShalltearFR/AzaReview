import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import NavBar from "../NavBar";
import StarBGAnimation from "../StarBGAnimation";
import { CDN } from "@/utils/cdn";
import Footer from "../UID/Footer";
import StatsTable from "./StatsTable";
import ChartVisu from "./ChartVisu";
import TopRelics from "./TopRelics";
import TopLightCones from "./TopLightCones";
import { Suspense } from "react";
import LoadingSpin from "@/components/LoadingSpin";

interface StatsPageProps {
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
  date,
  dataStats,
  character,
  relicsList,
  lightConesList,
}) => {
  const characterName =
    character.name === "{NICKNAME}" ? "Pionnier" : character.name;
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
          fetchPriority="low"
        />
        <div className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl">
          <header className="flex flex-col relative items-center mmd:items-center italic">
            <h1 className="mx-auto text-4xl font-bold">{characterName}</h1>
            <div className="mmd:absolute right-0 text-right pr-2 xl:pr-0 mt-2 mmd:mt-0">
              <p>{`Mis à jour le ${formattedDate} `}</p>
              <p>{`Stats sur ${statsLength} comptes`}</p>
            </div>
          </header>
          <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
            <div className="flex justify-center items-center mt-10 flex-wrap lg:h-[540px]">
              <section className="mx-auto">
                <h2 className="font-bold text-2xl underline text-orange text-center mb-3">
                  Moyenne
                </h2>
                <div className="lg:h-[500px]">
                  <StatsTable dataStats={dataStats} />
                </div>
              </section>
              <section className="mx-auto mt-5 lg:mt-0">
                <h2 className="font-bold text-2xl underline text-orange text-center mb-2">
                  Statistiques priorisées par les joueurs
                </h2>
                <div className="lg:h-[500px]">
                  <ChartVisu dataStats={dataStats} />
                </div>
              </section>
            </div>
            <TopRelics dataStats={dataStats} relicsList={relicsList} />
            <TopLightCones
              dataStats={dataStats}
              lightConesList={lightConesList}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StatsPage;
