"use client";
import { CDN2 } from "@/utils/cdn";
import {
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FR_Month } from "@/utils/month";
import translateBBCode from "@/utils/translateBBCode";

const Section2: React.FC = () => {
  const [isShareCodes, setIsShareCodes] = useState<boolean>(false);
  const [changeLog, setChangelog] = useState<Array<any>>([]);
  const [patchPage, setPatchPage] = useState<number>(0);
  const [patchDate, setPatchDate] = useState<string>("");
  const [patchDesc, setPatchDesc] = useState<Array<string>>([""]);

  const [codes, setCodes] = useState<Array<string>>([]);

  useEffect(() => {
    fetch("/api/changelog/all", { next: { revalidate: 3000 } })
      .then((res) => res.json())
      .then((json) => setChangelog(json.data));

    fetch("/api/other/all", { next: { revalidate: 300 } })
      .then((res) => res.json())
      .then((json: any) => {
        const { codes } = json.data;
        const codesArray = codes.split("\n");
        if (codesArray[0] === "") {
          setCodes(["Pas de code pour le moment"]);
        } else {
          setCodes(codesArray);
        }
      });
  }, []);

  useEffect(() => {
    if (changeLog.length > 0) {
      const date = new Date(changeLog[patchPage].createdAt);
      const day = date.getDate();
      const mounth = FR_Month[date.getMonth()];
      const year = date.getFullYear();
      setPatchDate(`${day} ${mounth} ${year}`);

      setPatchDesc(changeLog[patchPage].desc.split("\n"));
    }
  }, [changeLog, patchPage]);

  return (
    <section
      id="section2"
      className={`flex flex-col justify-center items-center w-full mt-10 xl2:pt-0 mmd:mx-auto my-auto overflow-x-hidden xl:h-screen font-Helvetica`}
    >
      <div className="flex flex-col-reverse mb-16 xl2:mb-0 xl2:flex-row gap-20 justify-center items-center mx-auto w-full xl2:w-auto mmd:mx-auto">
        <div className="flex flex-col gap-5 relative mt-32 w-full mmd:mx-auto">
          {/* PARTIE CODES */}
          <div>
            <div className="absolute mx-auto my-auto w-full z-20">
              <video
                width={125}
                height={160}
                autoPlay
                playsInline
                muted
                loop
                className="h-40 -mt-40 translate-y-[25px] mmd:mx-auto"
              >
                <source
                  src={`${CDN2}/video/homepage/topaz.webm`}
                  type="video/webm"
                />
              </video>
            </div>
            <div className="relative bg-black mmd:rounded-2xl w-full mmd:w-[600px] p-6 z-10 mmd:mx-auto my-auto smd:shadow-md smd:shadow-black">
              <div className="relative z-10">
                <h2
                  id="codes"
                  className="text-3xl extraXl:text-4xl font-bold text-center mb-5 mx-auto"
                >
                  Codes actifs
                </h2>

                <p
                  className={`absolute p-2 bg-gray right-0 top-0 z-10 rounded-xl extraXl:text-2xl ${
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
                <div className="grid sm:grid-cols-2 text-center font-bold text-xl extraXl:text-2xl">
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
                <p className="text-center font-bold text-xl">{codes[0]}</p>
              )}
            </div>
          </div>
          {changeLog.length > 0 && (
            <div>
              {/* PARTIE CHANGELOG */}
              <div className="relative bg-black mmd:rounded-2xl w-full mmd:w-[600px] p-6 z-10 mmd:mx-auto my-auto items-center smd:shadow-md smd:shadow-black">
                {/* FLECHE GAUCHE */}
                <div className="absolute left-2">
                  {patchPage > 0 && (
                    <ChevronLeftIcon
                      className="h-10 text-white hover:cursor-pointer"
                      onClick={() => setPatchPage(patchPage - 1)}
                    />
                  )}
                </div>

                {/* FLECHE DROITE */}
                <div className="absolute right-2">
                  {patchPage < changeLog.length - 1 && (
                    <ChevronRightIcon
                      className="h-10 text-white hover:cursor-pointer"
                      onClick={() => setPatchPage(patchPage + 1)}
                    />
                  )}
                </div>
                {/* PARTIE CENTRALE */}
                <div className="px-2">
                  <h3 className="text-3xl extraXl:text-4xl font-bold text-center mb-5">
                    ChangeLog
                  </h3>
                  <div>
                    <span className="font-bold extraXl:text-3xl">
                      Version {changeLog[patchPage].version.toFixed(2)}
                    </span>
                    <span className="ml-2 italic extraXl:text-2xl">
                      - {patchDate}
                    </span>
                  </div>
                  <ul className="mt-2 ml-5 list-disc extraXl:text-2xl">
                    {patchDesc.map((el, i) => (
                      <li key={`${el.substring(0, 10)}+${i}`}>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* PARTIE LOOTBAR */}
        <div className="mb-10 xl2:mb-0 z-10">
          <div className="mx-auto w-full mmd:w-[747px] z-10 flex">
            <img
              src={`${CDN2}/img/homepage/guinaifen.webp`}
              alt="Guinaifen"
              width={160}
              height={144}
              className="h-36 translate-y-1"
            />
            <div className="ml-auto mt-auto mr-5 px-4 py-2 rounded-t-2xl translate-y-[1px] xl2:flex xl2:gap-2">
              <a
                href="https://lootbar.gg/fr/top-up/honkai-star-rail?utm_source=Azano"
                target="_blank"
              >
                <img
                  src={`${CDN2}/img/eneba.svg`}
                  alt="Logo Eneba"
                  width={206}
                  height={64}
                  className="h-16 mx-auto"
                />
              </a>
            </div>
          </div>
          <div className="bg-black mmd:rounded-2xl w-full mmd:w-[747px] py-6 z-20 relative smd:shadow-md smd:shadow-black">
            <div className="px-6 ">
              <h2 className="text-center font-bold text-xl extraXl:text-4xl mb-5 text-orange">
                Dépenser moins sur HSR tout en soutenant le site !
              </h2>
              <div className="extraXl:text-2xl">
                En utilisant ce lien Eneba pour vos achats, vous soutiendrez
                énormément !
              </div>
              <div className="extraXl:text-2xl">
                <a
                  href="https://ene.ba/Azano-HSR"
                  target="_blank"
                  className="text-light-blue2 font-bold"
                >
                  Achetez sur le site
                </a>{" "}
                pour obtenir de{" "}
                <span className="bold text-light-blue2">10%</span> à{" "}
                <span className="bold text-light-blue2">30%</span> de réduction
                sur le pack à 100€.
              </div>
            </div>
            <div className="sm:px-6">
              {/* <div className="mt-5 relative">
                <div className="absolute text-xs sm:text-sm smd:text-lg px-3 text-center w-1/2 right-0 top-1/2 -translate-y-1/2">
                  <div>Rapide et sécurisé avec Razer Gold</div>
                  <div>Réception instantanée en jeu !</div>
                  <div>(partenaire Hoyoverse)</div>
                </div>
                <img
                  src={`${CDN2}/img/homepage/banderole_razergold.webp`}
                  alt="Razer Gold"
                  width={700}
                  height={99}
                />
              </div> */}
              <div className="mt-3 relative">
                <div className="absolute text-xs sm:text-sm smd:text-[20px] px-2 text-center w-3/5 left-0 top-1/2 -translate-y-1/2">
                  <div className="sm:mt-2">
                    Votre UID suffit, pas besoin de vos identifiants personnels.
                  </div>
                </div>
                <img
                  src={`${CDN2}/img/homepage/banderole_lootbar.webp`}
                  alt="Lootbar"
                  width={700}
                  height={99}
                />
              </div>
              <div className="mt-3 relative">
                <div className="absolute text-xs sm:text-base smd:text-lg px-2 smd:px-10 text-center w-3/5 right-0 top-1/2 -translate-y-1/2 font-semibold">
                  <div>
                    Au besoin, passez sur le live Twitch d'{" "}
                    <a
                      href="https://www.twitch.tv/azano__"
                      target="_blank"
                      className="underline hover:no-underline"
                    >
                      Azano
                    </a>{" "}
                    pour plus d'informations.
                  </div>
                </div>
                <img
                  src={`${CDN2}/img/homepage/banderole_azano.webp`}
                  alt="Azano"
                  width={700}
                  height={99}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
