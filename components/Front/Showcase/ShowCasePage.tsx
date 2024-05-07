"use client";
import NavBar from "@/components/Front/NavBar";
import { notFound } from "next/navigation";
import { CDN, CDN2 } from "@/utils/cdn";
import Footer from "@/components/Front/UID/Footer";
import { CharacterType, Data } from "@/types/CharacterModel";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import BuildShow from "@/components/Front/Showcase/BuildShow";
import Aos from "aos";

interface ShowCasePageProps {
  id: string;
}

const ShowCasePage: React.FC<ShowCasePageProps> = ({ id }) => {
  const [character, setCharacter] = useState<
    CharacterType | undefined | { error: true }
  >(undefined);
  const [lightCones, setLightCones] = useState<any>();
  const [relicsSet, setRelicsSet] = useState<any>();
  const [properties, setProperties] = useState<any>();
  const cookies = useCookies();
  const lang = cookies.get("lang");

  function hasStatus(value: any): value is { status: number } {
    return typeof value === "object" && "status" in value;
  }

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });

    fetch(`/api/character/${id}`, {
      next: { revalidate: 300 },
    })
      .then((res) => res.json())
      .then((data) => setCharacter(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`${CDN}/index_min/${lang || "fr"}/light_cones.json`, {
      next: { revalidate: 18000 },
    })
      .then((res) => res.json())
      .then((cone) => setLightCones(Object.values(cone)));

    fetch(`${CDN}/index_min/${lang || "fr"}/relic_sets.json`, {
      next: { revalidate: 18000 },
    })
      .then((res) => res.json())
      .then((cone) => setRelicsSet(Object.values(cone)));

    fetch(`${CDN}/index_min/${lang || "fr"}/properties.json`, {
      next: { revalidate: 18000 },
    })
      .then((res) => res.json())
      .then((cone) => setProperties(Object.values(cone)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  if (hasStatus(character)) return notFound();

  if (
    character &&
    "portrait" in character &&
    lightCones &&
    relicsSet &&
    properties
  )
    return (
      <>
        <NavBar />
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <div className="min-h-[calc(100vh-205px)] relative text-white">
          <img
            src={`${CDN}/${character.portrait}`}
            className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
          />
          <p className="font-bold text-4xl text-center mt-10">
            {character.name}
          </p>
          <section className="flex flex-col gap-y-10 mt-10">
            {character.data.map((build: Data, i: number) => (
              <article
                key={`build${i}`}
                className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl"
              >
                <BuildShow
                  build={build}
                  i={i}
                  characterID={character.id}
                  lightCones={lightCones}
                  properties={properties}
                  relicsSet={relicsSet}
                  lang={lang}
                />
              </article>
            ))}
          </section>
        </div>
        <Footer lang={lang} />
      </>
    );

  return (
    <>
      <NavBar />
      <div
        style={{
          backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
          zIndex: -10,
        }}
        data-aos="animate-stars"
      />
      <div className="flex w-screen h-[calc(100vh-295px)] justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-gray animate-spin  fill-orange"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  );
};

export default ShowCasePage;
