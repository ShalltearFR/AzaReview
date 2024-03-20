import { CDN2 } from "@/utils/cdn";
import HomepageFooter from "./HomepageFooter";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Section2Props {
    sectionPrevIndex: number
    isCodeAnimation: Boolean
    codes: Array<string>
}

const Section2: React.FC<Section2Props> = ({ sectionPrevIndex, isCodeAnimation, codes }) => {
    const [isShareCodes, setIsShareCodes] = useState<boolean>(false);

    return (
        <section
        className={`flex flex-col justify-center items-center bg-darkPurple w-full xl2:min-h-[calc(100vh-64px)] pt-5 xl2:pt-0 mmd:mx-auto my-auto`}
      >
        <div className="flex flex-col-reverse mb-16 xl2:mb-0 xl2:flex-row gap-20 justify-center items-center my-auto mx-auto w-full xl2:w-auto mmd:mx-auto my-auto">
          <div className="relative mt-44 w-full mmd:mx-auto">
            <div
              data-aos="zoom-out-left"
              data-aos-delay="250"
              className="absolute mx-auto my-auto w-full z-20"
            >
              <img
                src={`/img/homepage/topaz.gif`}
                className="h-44 -mt-44 translate-y-7 mmd:mx-auto"
              />
            </div>
            <div
              data-aos={isCodeAnimation ? "fade-right" : ""}
              className="relative bg-black mmd:rounded-2xl w-full mmd:w-[600px] p-6 z-10 mmd:mx-auto my-auto"
            >
              <div className="relative z-10">
                <h2
                  id="codes"
                  className="text-3xl font-bold text-center mb-5 mx-auto"
                >
                  Codes actifs
                </h2>

                <p
                  className={`absolute p-2 bg-gray right-0 top-0 z-10 rounded-xl ${
                    isShareCodes ? "animate-fade-in" : "hidden"
                  }`}
                >
                  Lien copié
                </p>
                <LinkIcon
                  className="absolute right-0 top-2 h-6 hover:cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://review-hsr.vercel.app/?codes"
                    );
                    setIsShareCodes(true);
                    setTimeout(() => {
                      setIsShareCodes(false);
                    }, 3000);
                  }}
                />
              </div>
              {codes.length > 1 ? (
                <div className="grid sm:grid-cols-2 text-center font-bold text-xl">
                  {codes.map((code, i) => {
                    const codeWithoutSpace = code.split(" ");
                    return (
                      <p
                        className={`py-2 font-bold ${
                          codeWithoutSpace[1]
                            ? "text-yellow"
                            : "text-light-blue2"
                        } `}
                        key={`code${i}`}
                      >
                        <a
                          target="_blank"
                          href={`https://hsr.hoyoverse.com/gift?code=${codeWithoutSpace[0]}`}
                        >
                          {code}
                        </a>
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center font-bold text-xl">
                  {codes[0]}
                </p>
              )}
            </div>
          </div>
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
              data-aos="fade-left"
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
                  {" pour vos achats, vous soutiendrez énormément !"}
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
                  <img
                    src={`${CDN2}/img/homepage/banderole_eneba.webp`}
                  />
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
                  <img
                    src={`${CDN2}/img/homepage/banderole_azano.webp`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomepageFooter />
      </section>
    );
};

export default Section2;
