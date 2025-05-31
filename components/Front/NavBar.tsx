"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingSpin from "../LoadingSpin";

interface NavBarProps {
  setData?: any;
}

const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

const NavBar: React.FC<NavBarProps> = ({ setData }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [uidInput, setUidInput] = useState<string>("");
  const [uidPathName, setUidPathName] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [disableSearchButton, setDisableSearchButton] =
    useState<boolean>(false);

  useEffect(() => {
    const pathNameArray = pathname.split("/");
    setUidPathName(pathNameArray[2]);
  }, []);

  return (
    <>
      <nav className="flex bg-[#030303] w-screen z-50 h-16 xl:fixed shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
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
                      if (isNaN(Number(uidInput))) {
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
                    if (isNaN(Number(uidInput))) {
                      if (setData) setData({ status: 400 });
                      setDisableSearchButton(false);
                    } else {
                      push(`/uid/${uidInput}`);
                    }
                  }
                }}
              >
                <span>{disableSearchButton ? "Recherche" : "Rechercher"}</span>
                {disableSearchButton && (
                  <span>
                    <LoadingSpin width="w-4" height="h-4" />
                  </span>
                )}
              </button>
            </div>

            <Link
              href={"/characters"}
              className="hidden xl:block xl:py-2 xl:px-3 bg-orange font-bold rounded-3xl xl:ml-32"
            >
              Personnages
            </Link>
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
          href={"/characters"}
          className="py-2 px-3 bg-orange font-bold rounded-3xl ml-5 smd:ml-32 z-50"
        >
          Personnages
        </Link>
      </div>
      <div className={`xl:h-16`}></div>
    </>
  );
};

export default NavBar;
