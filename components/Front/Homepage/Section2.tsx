import { CDN2 } from "@/utils/cdn";
import HomepageFooter from "./HomepageFooter";
import {
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FR_Month } from "@/utils/month";
import { TranslateSection2 } from "@/utils/homepageDictionnary";
import translateBBCode from "@/utils/translateBBCode";
import { TranslateSection } from "@/types/homepageDictionnary";

interface Section2Props {
  isCodeAnimation: Boolean;
  codes: Array<string>;
  lang: keyof TranslateSection | undefined;
}

const Section2: React.FC<Section2Props> = ({
  isCodeAnimation,
  codes,
  lang,
}) => {
  const [isShareCodes, setIsShareCodes] = useState<boolean>(false);
  const [changeLog, setChangelog] = useState<Array<any>>([]);
  const [patchPage, setPatchPage] = useState<number>(0);
  const [patchDate, setPatchDate] = useState<string>("");
  const [patchDesc, setPatchDesc] = useState<Array<string>>([""]);

  const [translateSection, setTranslateSection] = useState<Array<string>>([""]);

  useEffect(() => {
    setTranslateSection(TranslateSection2[lang ?? "fr"]);
  }, [lang]);

  useEffect(() => {
    fetch("/api/changelog/all", { next: { revalidate: 300 } })
      .then((res) => res.json())
      .then((json) => setChangelog(json.data));
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
      className={`flex flex-col justify-center items-center bg-darkPurple w-full xl2:min-h-[calc(100vh-64px)] pt-5 xl2:pt-0 mmd:mx-auto my-auto overflow-x-hidden`}
    >
      <div className="flex flex-col-reverse mb-16 xl2:mb-0 xl2:flex-row gap-20 justify-center items-center my-auto mx-auto w-full xl2:w-auto mmd:mx-auto">
        <div className="flex flex-col gap-5 relative mt-32 w-full mmd:mx-auto">
          {/* PARTIE CODES */}
          <div>
            <div
              data-aos="zoom-out-left"
              data-aos-delay="250"
              className="absolute mx-auto my-auto w-full z-20"
            >
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
            <div
              data-aos={isCodeAnimation ? "fade-right" : ""}
              className="relative bg-black mmd:rounded-2xl w-full mmd:w-[600px] p-6 z-10 mmd:mx-auto my-auto"
            >
              <div className="relative z-10">
                <h2
                  id="codes"
                  className="text-3xl font-bold text-center mb-5 mx-auto"
                >
                  {translateSection[0]}
                </h2>

                <p
                  className={`absolute p-2 bg-gray right-0 top-0 z-10 rounded-xl ${
                    isShareCodes ? "animate-fade-in" : "hidden"
                  }`}
                >
                  {translateSection[1]}
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
                <p className="text-center font-bold text-xl">{codes[0]}</p>
              )}
            </div>
          </div>
          {changeLog.length > 0 && (
            <div>
              {/* PARTIE CHANGELOG */}
              <div
                data-aos={isCodeAnimation ? "fade-right" : ""}
                className="relative bg-black mmd:rounded-2xl w-full mmd:w-[600px] p-6 z-10 mmd:mx-auto my-auto items-center"
              >
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
                  <h3 className="text-3xl font-bold text-center mb-5">
                    ChangeLog
                  </h3>
                  <div>
                    <span className="font-bold">
                      Version {changeLog[patchPage].version}
                    </span>
                    <span className="ml-2 italic">- {patchDate}</span>
                  </div>
                  <ul className="mt-2 ml-5 list-disc">
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
        <div className="mt-auto mb-10 xl2:mb-0 z-10">
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className="mx-auto w-full mmd:w-[747px] z-10 flex"
          >
            <img
              src={`${CDN2}/img/homepage/guinaifen.webp`}
              alt="Guinaifen"
              width={160}
              height={144}
              className="h-36 translate-y-1"
            />
            <div className="ml-auto mt-auto mr-5 px-4 py-2 bg-background rounded-t-2xl translate-y-[1px] xl2:flex xl2:gap-2">
              <a href={translateSection[4]} target="_blank">
                <img
                  src={`${CDN2}/img/LootbarLogo.webp`}
                  alt="Logo Lootbar"
                  width={211}
                  height={30}
                  className="h-10 mx-auto"
                />
              </a>
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="bg-black mmd:rounded-2xl w-full mmd:w-[747px] py-6 z-20 relative"
          >
            <div className="px-6 ">
              <h2 className="text-center font-bold text-xl mb-5">
                {translateSection[2]}
              </h2>
              <div>{translateSection[3]}</div>
              <div>
                <a
                  href={translateSection[4]}
                  target="_blank"
                  className="text-light-blue2 font-bold"
                >
                  {translateSection[5]}
                </a>
                {translateBBCode(translateSection[6], true)}
              </div>
            </div>
            <div className="sm:px-6">
              <div className="mt-5 relative">
                <div className="absolute text-xs sm:text-sm smd:text-lg px-3 text-center w-1/2 right-0 top-1/2 -translate-y-1/2">
                  <div>{translateSection[7]}</div>
                  <div>{translateSection[8]}</div>
                  <div>{translateSection[9]}</div>
                </div>
                <img
                  src={`${CDN2}/img/homepage/banderole_razergold.webp`}
                  alt="Razer Gold"
                  width={700}
                  height={99}
                />
              </div>
              <div className="mt-3 relative">
                <div className="absolute text-xs sm:text-sm smd:text-[20px] px-2 text-center w-3/5 left-0 top-1/2 -translate-y-1/2">
                  <div className="sm:mt-2">{translateSection[10]}</div>
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
                    {translateSection[11]}
                    <a
                      href="https://www.twitch.tv/azano__"
                      target="_blank"
                      className="underline hover:no-underline"
                    >
                      Azano
                    </a>
                    {translateSection[12]}
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

      <HomepageFooter lang={lang} />
    </section>
  );
};

export default Section2;
