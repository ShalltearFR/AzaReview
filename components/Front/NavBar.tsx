"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";

interface NavBarProps {
  setData?: any;
  isHomepage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ setData, isHomepage }) => {
  const { push } = useRouter();
  const [uidInput, setUidInput] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

  useEffect(() => {
    if (isHomepage) setOpenMenu(true);
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
          <div
            className={`flex gap-7 ml-auto sm:!block mr-auto sm:mr-5 smd:mr-auto ${
              openMenu
                ? "animate-fade-in sm:!animate-alwaysShow"
                : "hidden animate-fade-out sm:!animate-alwaysShow"
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
              className="bg-[#3E7032] h-10 px-4 rounded-full text-white z-50"
              onClick={() => {
                if (uidInput !== "") {
                  if (isNaN(Number(uidInput)) && !isHomepage) {
                    setData({ status: 400 });
                  } else {
                    push(`/uid/${uidInput}`);
                  }
                }
              }}
            >
              Rechercher
            </button>
          </div>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`z-50 text-white mr-2 flex flex-col h-10 w-10 justify-center items-center group sm:hidden ${
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

            {/* <Bars4Icon className={`h-6`} /> */}
          </button>
        </div>
      </nav>

      <div className={`xl:h-16 ${isHomepage ? "" : "mt-[28px]"}`}></div>
    </>
  );
};

export default NavBar;
