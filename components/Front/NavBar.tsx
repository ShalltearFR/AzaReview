"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  const { push } = useRouter();
  const pathname = usePathname();
  const [uidInput, setUidInput] = useState<string>("");
  const [uidPathName, setUidPathName] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [disableSearchButton, setDisableSearchButton] =
    useState<boolean>(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

  useEffect(() => {
    if (isHomepage) setOpenMenu(true);
    const pathNameArray = pathname.split("/");
    setUidPathName(pathNameArray[2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="flex bg-[#030303] w-screen z-50 h-16 xl:fixed ">
        <div className="relative flex w-full justify-center items-center">
          <Link
            href={"/"}
            className={`sm:!block ${
              openMenu
                ? "hidden animate-fade-out sm:!animate-alwaysShow"
                : "animate-fade-in sm:!animate-alwaysShow"
            }`}
          >
            <img
              src={`${CDN2}/img/homepage/logo_min.png`}
              className="absolute h-16 sm:h-20 left-2 top-2 z-50"
            />
          </Link>
          <div className="flex gap-16 mx-auto items-center mr-auto sm:mr-5 smd:mr-auto">
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
                      src="/img/homepage/nextSection.svg"
                      className="animate-homePageBounce"
                      onClick={() => {
                        setSectionIndex(sectionIndex - 1);
                        setSectionPrevIndex(sectionIndex);
                      }}
                    />
                  </button>
                )}
            </div>

            <div
              className={`flex gap-2 ${
                openMenu
                  ? "animate-fade-in sm:!animate-alwaysShow"
                  : "hidden animate-fade-out sm:!flex sm:!animate-alwaysShow"
              }`}
            >
              <input
                className="rounded-full w-40 h-10 pl-5 text-lg z-50 sm:mr-7"
                maxLength={9}
                placeholder="UID"
                value={uidInput}
                onChange={(e) => setUidInput(e.target.value)}
              />
              <button
                disabled={disableSearchButton}
                className="bg-[#3E7032] flex gap-2 items-center h-10 px-4 rounded-full text-white z-50 disabled:bg-gray"
                onClick={() => {
                  if (uidInput !== "" && uidInput !== uidPathName) {
                    setDisableSearchButton(true);
                    if (isNaN(Number(uidInput)) && !isHomepage) {
                      setData({ status: 400 });
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
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-black animate-spin  fill-orange"
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
                      src="/img/homepage/nextSection.svg"
                      className="h-16 animate-homePageBounce"
                      onClick={() => {
                        setSectionIndex(sectionIndex + 1);
                        setSectionPrevIndex(sectionIndex);
                      }}
                    />
                  </button>
                )}
            </div>
          </div>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`z-50 text-white flex flex-col h-10 w-10 justify-center items-center group sm:hidden ${
              openMenu ? " " : "ml-auto "
            }`}
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

      <div className={`xl:h-16`}></div>
    </>
  );
};

export default NavBar;
