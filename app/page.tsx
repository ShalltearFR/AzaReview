"use client";
import HomepageFooter from "@/components/Front/Homepage/HomepageFooter";
import HorizontalNotationArray from "@/components/Front/Homepage/HorizontalNotationArray";
import VerticalNotationArray from "@/components/Front/Homepage/VerticalNotationArray";
import NavBar from "@/components/Front/NavBar";
import { CDN2 } from "@/utils/cdn";
import { useEffect, useState } from "react";
import AOS from "aos";

export default function App() {
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  useEffect(() => {
    AOS.init({ mirror: true });

    if (window.innerWidth <= 1700) setSectionIndex(999);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSection0 = sectionIndex === 0 || sectionIndex === 999;
  const showSection1 = sectionIndex === 1 || sectionIndex === 999;
  const showSection2 = sectionIndex === 2 || sectionIndex === 999;

  return (
    <>
      <div
        style={{
          backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
          zIndex: 2,
        }}
        data-aos="animate-stars"
      />
      <div className={`xl2:w-screen xl2:h-screen xl2:overflow-hidden`}>
        <NavBar isHomepage />
        <div className="text-white mt-10 xl:mt-0 w-full h-full overflow-hidden">
          {sectionIndex !== 0 && (
            <button className="hidden xl2:block absolute top-16 right-1/2 z-50 opacity-50 hover:opacity-100 -rotate-90">
              <img
                src="/img/homepage/nextSection.svg"
                className="h-16 animate-homePageBounce"
                onClick={() => setSectionIndex(sectionIndex - 1)}
              />
            </button>
          )}
          {sectionIndex !== 2 && (
            <button className="hidden xl2:block absolute bottom-0 right-1/2 z-50 opacity-50 hover:opacity-100 rotate-90">
              <img
                src="/img/homepage/nextSection.svg"
                className="h-16 animate-homePageBounce"
                onClick={() => setSectionIndex(sectionIndex + 1)}
              />
            </button>
          )}

          {/* 1ere section */}
          {showSection0 && (
            <section
              className={`flex flex-col w-full xl:flex-row justify-center items-center min-h-screen gap-y-10 lg:gap-x-10 scroll-m-96 snap-start pb-10 xl:pb-0`}
            >
              <div
                data-aos="fade-right"
                data-aos-id="section1"
                className=" bg-black p-5 w-full mmd:w-[750px] mmd:rounded-3xl pt-10 z-10"
              >
                <h1 className="text-3xl xl:text-4xl font-bold text-center">
                  {"Votre review Honkai : Star Rail"}
                </h1>
                <h2 className="mt-5 mb-7 text-xl xl:text-2xl font-bold text-center">
                  {"C'est quoi Review HSR ?"}
                </h2>
                <p className="font-medium">
                  {"Un site d'aide pour améliorer facilement vos personnages."}
                </p>
                <p>
                  {
                    "Des conseils clairs et adaptés pour une utilisation en toute simplicité."
                  }
                </p>
                <p className="my-5">
                  {"Le moindre élément qui ne convient pas sera noté en "}
                  <span className="text-red font-bold">rouge</span>
                  {" et des recommandations seront faites pour vous aider."}
                </p>
                <p className="font-semibold">
                  {"Les éléments suivants sont analysés :"}
                </p>
                <ul className="list-disc [&_*]:ml-5 mb-5 font-semibold italic">
                  <li>{"Le cône"}</li>
                  <li>{"Les ensembles de reliques et ornements"}</li>
                  <li>{"Les statistiques principales de vos pièces"}</li>
                  <li>{"Vos statistiques finales"}</li>
                  <li>
                    {
                      "La pertinance de vos pièces avec un système de notation ( de D à SSS)"
                    }
                  </li>
                </ul>
                <p>
                  {"Sélectionnez ou survolez les éléments en "}
                  <span className="text-red font-bold">rouge</span>
                  {" pour voir une recommandation accessible pour tous."}
                </p>
                <p className="mt-5">
                  <span className="font-semibold">
                    {
                      "Si votre personnage n'a aucun élément en rouge alors il est bien équipé"
                    }
                  </span>
                  {
                    ", libre à vous d'essayer d'améliorer la pièce avec la notation la plus faible ou de passer au personnage suivant !"
                  }
                </p>
              </div>
              <div
                data-aos="fade-left"
                className="bg-black p-5 w-full mmd:w-96 mmd:rounded-3xl z-10"
              >
                <p className="text-2xl font-bold text-center mb-5 ">
                  Sélectionnez vos personnages en vitrine
                </p>
                <img
                  src="/img/homepage/vitrine.webp"
                  alt="personnages de vitrine"
                  className="mx-auto "
                />
              </div>
            </section>
          )}

          {/* 2eme section */}
          {showSection1 && (
            <section
              className={`bg-brown2 min-h-screen flex flex-col justify-center items-center`}
            >
              <div className=" mx-auto  flex flex-col items-center justify-center [&_article]:lg:!w-11/12 [&_article]:xxl:w-1/2 [&_article]:w-full [&_article]:p-5 [&_article]:bg-black [&_article]:mmd:w-3/4 [&_article]:mmd:rounded-3xl">
                <div
                  data-aos="fade-up"
                  data-aos-delay="250"
                  data-aos-id="section2"
                  className="mx-auto w-full mmd:w-1/2 lg:!w-11/12 xxl:w-1/2 z-10"
                >
                  <img
                    src={`${CDN2}/img/homepage/pela.webp`}
                    className="h-36 ml-auto translate-y-5 "
                  />
                </div>
                <div
                  data-aos="fade-right"
                  className="flex flex-col gap-y-5 justify-center items-center my-auto mb-10 z-10"
                >
                  <article>
                    <h2 className="text-xl xl:text-2xl font-bold text-center">
                      {"Comment l'utiliser et le comprendre ?"}
                    </h2>
                    <ul className="mt-5 list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold">
                      <li>{"Mettez vos personnages du jeu en vitrine"}</li>
                      <li>
                        <span>
                          {
                            'Entrez votre UID sur le site et cliquez sur "Rechercher".'
                          }
                        </span>
                        <span className="font-semibold">
                          {
                            " Si vous venez de modifier votre vitrine en jeu, patientez 10 minutes "
                          }
                        </span>
                        {"pour que la synchronisation soit bien effectuée."}
                      </li>
                      <li>
                        {
                          "Si un personnage possède plusieurs façons d'être équipé / joué, il faudra sélectionner le build correspondant à votre utilisation"
                        }
                      </li>
                    </ul>
                  </article>
                  <article>
                    <p>
                      {
                        "Le site analyse des personnages terminés, c'est à dire avec le niveau, le cône, les traces et les reliques / ornements améliorés. Prenez donc en considération qu'une relique sera par exemple mal notée si elle n'est pas montée."
                      }
                    </p>
                  </article>
                  <article>
                    <p>
                      {
                        "Les statistiques recommandés permettent d'évaluer le besoin d'un personnage et votre objectif à dépasser. Bien évidement si vous offrez de la vitesse ou des gains d'actions avec des personnages harmonies tels que Sparkle ou Bronya, la recommandation de Vitesse ne sera pas la même. Les recommandations sont donc faites pour posséder des personnages versatiles et équilibrés."
                      }
                    </p>
                  </article>
                  <article>
                    <p>
                      {
                        "Le système de notation de Reliques et Ornements prend en compte les besoins du personnage. Les statistiques les plus utiles amélioreront significativement la notation (chaque statistique a son coef. en fonction du personnage), les valeurs obtenues, le nombre d'augmentations de statistiques (4 ou 5) ainsi que la statistique principale."
                      }
                      <span className="font-semibold">
                        {
                          " Les statistiques jugées totalement inutiles n'amélioreront pas la notation :"
                        }
                      </span>
                    </p>
                    <ul className="list-disc mt-2 [&_li]:ml-5 italic">
                      <li>
                        {
                          "Obtenir une note de A ou A+ est la moyenne à atteindre si possible partout"
                        }
                      </li>
                      <li>
                        {
                          "Une notation inférieure (de D à B+) signifie qu'il est fortement recommandé de changer la pièce correspondante"
                        }
                      </li>
                      <li>
                        {
                          "Une notation supérieur (de S à SSS) confirme que la pièce est très bien et qu'il n'y a pas besoin de perdre du temps à l'améliorer (sauf si vous souhaitez perfectionner votre personnage)"
                        }
                      </li>
                    </ul>
                  </article>
                  <div className="bg-black mmd:bg-transparent w-full px-10 mmd:w-auto mmd:px-0">
                    <VerticalNotationArray />

                    <HorizontalNotationArray />
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* 3eme section */}
          {showSection2 && (
            <section
              className={`flex flex-col justify-center items-center bg-darkPurple min-h-screen pt-5 xl2:pt-0`}
            >
              <div className="mt-auto mb-10 xl2:mb-0 z-10">
                <div
                  data-aos="fade-up"
                  data-aos-delay="250"
                  className="mx-auto w-full mmd:w-[747px] z-10"
                >
                  <img
                    src={`${CDN2}/img/homepage/guinaifen.webp`}
                    className="h-36 translate-y-1"
                  />
                </div>
                <div
                  data-aos="fade-right"
                  data-aos-id="section3"
                  className="bg-black mmd:rounded-2xl w-full mmd:w-[747px] py-6 z-20 relative"
                >
                  <div className="px-6 ">
                    <h2 className="text-center font-bold text-xl mb-5">
                      Dépenser moins sur HSR tout en soutenant le site !
                    </h2>
                    <p>
                      {"En utilisant ce lien "}
                      <a
                        href="https://www.eneba.com/fr/top-up-honkai-star-rail-oneiric-shard-malaysia?enb_campaign=Main+Search&enb_content=search+dropdown+-+products&enb_medium=product+card&enb_source=https%3A%2F%2Fwww.eneba.com%2Ftop-up-genshin-impact-genesis-crystals-malaysia&enb_term=1&af_id=Azano&utm_medium=infl&utm_source=Azano&currency=EUR&region=global"
                        target="_blank"
                        className="font-bold text-light-blue2"
                      >
                        {"Eneba"}
                      </a>
                      {" avant vos achats, vous soutiendrez énormément !"}
                    </p>
                    <p>
                      {
                        "Les mêmes prix qu'en jeu mais avec 10% de cashback pour dépenser moins les prochaines fois."
                      }
                    </p>
                    <p>
                      {
                        "C'est bénéfique pour vous comme pour nous, alors n'hésitez pas à jeter un oeil !"
                      }
                    </p>
                  </div>
                  <div className="sm:px-6">
                    <div className="mt-5 relative">
                      <div className="absolute text-xs sm:text-sm smd:text-lg px-3 text-center w-1/2 right-0 top-1/2 -translate-y-1/2">
                        <p>{"Rapide et sécurisé avec Razer Gold"}</p>
                        <p>{"(partenaire Hoyoverse)"}</p>
                      </div>
                      <img
                        src={`${CDN2}/img/homepage/banderole_razergold.webp`}
                      />
                    </div>
                    <div className="mt-3 relative">
                      <div className="absolute text-xs sm:text-sm smd:text-[20px] px-2 text-center w-3/5 left-0 top-1/2 -translate-y-1/2">
                        <p>
                          {
                            "Votre UID suffit, pas besoin de vos identifiants personnels."
                          }
                        </p>
                        <p className="sm:mt-2">
                          {"Réception instantanée en jeu !"}
                        </p>
                      </div>
                      <img src={`${CDN2}/img/homepage/banderole_eneba.webp`} />
                    </div>
                    <div className="mt-3 relative">
                      <div className="absolute text-xs sm:text-base smd:text-lg px-2 smd:px-10 text-center w-3/5 right-0 top-1/2 -translate-y-1/2 font-semibold">
                        <p>
                          {"Au besoin, passez sur le live Twitch d'"}
                          <a
                            href="https://www.twitch.tv/azano__"
                            target="_blank"
                            className="underline hover:no-underline"
                          >
                            Azano
                          </a>
                          {" pour plus d'informations."}
                        </p>
                      </div>
                      <img src={`${CDN2}/img/homepage/banderole_azano.webp`} />
                    </div>
                  </div>
                </div>
              </div>

              <HomepageFooter />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
