"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { UIDtitles } from "@/utils/dictionnary";
import LoadingSpin from "../LoadingSpin";
import { TranslateSection } from "@/types/homepageDictionnary";

interface NavBarProps {
  setData?: any;
  isHomepage?: boolean;
  sectionIndex?: number;
  setSectionIndex?: (index: number) => void;
  setSectionPrevIndex?: (index: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  setData,
  isHomepage,
  sectionIndex = 0,
  setSectionIndex,
  setSectionPrevIndex,
}) => {
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const [uidInput, setUidInput] = useState<string>("");
  const [uidPathName, setUidPathName] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [disableSearchButton, setDisableSearchButton] =
    useState<boolean>(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;
  const cookies = useCookies();
  const lang = cookies.get("lang") as keyof TranslateSection;

  useEffect(() => {
    if (isHomepage) setOpenMenu(true);
    const pathNameArray = pathname.split("/");
    setUidPathName(pathNameArray[2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLang = (country: string) => {
    //Evite le refresh si même langue
    if (lang !== country) {
      cookies.set("lang", country, { sameSite: "Lax" });
      refresh();
    }
  };

  return (
    <>
      <nav className="flex bg-[#030303] w-screen z-50 h-16 xl:fixed">
        <div className="relative flex w-full items-center">
          <Link
            href={"/"}
            className={`smd:!block ${
              openMenu
                ? "hidden animate-fade-out smd:!animate-alwaysShow"
                : "animate-fade-in smd:!animate-alwaysShow"
            }`}
          >
            <img
              src={`${CDN2}/img/homepage/logo_min.png`}
              className="absolute h-16 smd:h-20 left-2 top-2 z-50 smd:mt-2 xl:mt-0"
              alt="Logo"
            />
          </Link>
          <div className="w-0 mmd:w-28" />
          <div className="flex mx-auto smd:mx-0 smd:ml-auto mmd:mx-auto items-center">
            <div className="h-0 w-0 xl2:h-16 xl2:w-16">
              {isHomepage &&
                setSectionIndex &&
                setSectionPrevIndex &&
                sectionIndex > 0 && (
                  <button
                    key={`sectionArrow0+${sectionIndex}`}
                    className="hidden xl2:block xl2:h-16 xl2:w-16 z-50 opacity-50 hover:opacity-100 rotate-180"
                  >
                    <img
                      src={`${CDN2}/img/homepage/nextSection.svg`}
                      alt=""
                      width={64}
                      height={64}
                      className="ml-8 h-16 animate-homePageBounce"
                      onClick={() => {
                        setSectionIndex(sectionIndex - 1);
                        setSectionPrevIndex(sectionIndex);
                      }}
                    />
                  </button>
                )}
            </div>

            <div
              className={`flex gap-5 ${
                openMenu
                  ? "animate-fade-in smd:!animate-alwaysShow"
                  : "hidden animate-fade-out smd:!flex smd:!animate-alwaysShow"
              }`}
            >
              <input
                className="rounded-full w-40 sm:w-40 h-10 pl-5 text-lg z-50 "
                maxLength={9}
                placeholder="UID"
                value={uidInput}
                onChange={(e) => setUidInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (uidInput !== "" && uidInput !== uidPathName) {
                      setDisableSearchButton(true);
                      if (isNaN(Number(uidInput)) && !isHomepage) {
                        if (setData) setData({ status: 400 });
                        setDisableSearchButton(false);
                      } else {
                        push(`/uid/${uidInput}`);
                      }
                    }
                  }
                }}
              />
              <button
                disabled={disableSearchButton}
                className="bg-[#3E7032] flex gap-2 items-center h-10 px-4 rounded-full text-white z-50 disabled:bg-gray over"
                onClick={() => {
                  if (uidInput !== "" && uidInput !== uidPathName) {
                    setDisableSearchButton(true);
                    if (isNaN(Number(uidInput)) && !isHomepage) {
                      if (setData) setData({ status: 400 });
                      setDisableSearchButton(false);
                    } else {
                      push(`/uid/${uidInput}`);
                    }
                  }
                }}
              >
                <span>
                  {disableSearchButton
                    ? UIDtitles[lang ?? "fr"].searching
                    : UIDtitles[lang ?? "fr"].search}
                </span>
                {disableSearchButton && (
                  <span>
                    <LoadingSpin width="w-4" height="h-4" />
                  </span>
                )}
              </button>
            </div>
            <div className="h-0 w-0 xl2:h-16 xl2:w-16">
              {isHomepage &&
                setSectionIndex &&
                setSectionPrevIndex &&
                sectionIndex < 2 && (
                  <button
                    key={`sectionArrow1+${sectionIndex}`}
                    className="hidden xl2:block xl2:h-16 xl2:w-16 z-50 opacity-50 hover:opacity-100"
                  >
                    <img
                      src={`${CDN2}/img/homepage/nextSection.svg`}
                      alt=""
                      width={64}
                      height={64}
                      className="ml-8 h-16 animate-homePageBounce"
                      onClick={() => {
                        setSectionIndex(sectionIndex + 1);
                        setSectionPrevIndex(sectionIndex);
                      }}
                    />
                  </button>
                )}
            </div>
            <Link
              href={"/characters"}
              className="hidden xl:block xl:py-2 xl:px-3 bg-orange font-bold rounded-3xl xl:ml-32"
            >
              {lang === "en" ? "Characters" : "Personnages"}
            </Link>
          </div>

          {/* Partie langue */}
          <div
            className={`${
              openMenu ? "hidden smd:flex" : "flex"
            } items-center  flex-grow-0 flex-shrink-0 mr-5`}
          >
            <button
              className={`p-2 rounded-full z-50 ${
                lang === "fr" || lang === undefined ? "bg-white/80" : ""
              }`}
              onClick={() => handleChangeLang("fr")}
            >
              <img
                src={`${CDN2}/img/lang/FR.webp`}
                width={40}
                height={30}
                className="w-10"
                alt="French Flag"
              />
            </button>
            <button
              className={`p-2 rounded-full z-50 ${
                lang === "en" ? "bg-white/80" : ""
              }`}
              onClick={() => handleChangeLang("en")}
            >
              <img
                src={`${CDN2}/img/lang/EN.webp`}
                width={40}
                height={27}
                className="w-10"
                alt="English Flag"
              />
            </button>
          </div>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`z-50 text-white flex flex-col mr-2 h-10 w-10 justify-center items-center group smd:hidden`}
          >
            <div
              className={`${genericHamburgerLine} ${
                openMenu ? "rotate-45 translate-y-3 " : ""
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                openMenu ? "opacity-0" : ""
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                openMenu ? "-rotate-45 -translate-y-3 " : ""
              }`}
            />
          </button>
        </div>
      </nav>
      <div
        className={`bg-black pb-2 w-screen ${
          openMenu ? "flex xl:hidden" : "hidden smd:flex xl:hidden"
        }`}
      >
        <Link
          href={"/guides"}
          className="py-2 px-3 bg-orange font-bold rounded-3xl ml-5 smd:ml-32 z-50"
        >
          {lang === "en" ? "Showcase" : "Guides"}
        </Link>
      </div>
      <div className={`xl:h-16`}></div>
    </>
  );
};

export default NavBar;
