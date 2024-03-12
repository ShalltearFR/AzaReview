"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavBarProps {
  setData?: any;
  isHomepage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ setData, isHomepage }) => {
  const { push } = useRouter();
  const [uidInput, setUidInput] = useState<string>("");

  return (
    <>
      <nav className="flex bg-[#030303] w-screen h-16 xl:fixed z-50">
        <div className="relative flex w-full gap-7 justify-center items-center">
          <Link href={"/"}>
            <img
              src={`${CDN2}/img/homepage/logo_min.png`}
              className="absolute h-0 sm:h-20 left-2 top-2 z-50"
            />
          </Link>
          <input
            className="rounded-full w-40 h-10 pl-5 text-lg z-50"
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
      </nav>

      <div className={`xl:h-16 ${isHomepage ? "" : "mt-[28px]"}`}></div>
    </>
  );
};

export default NavBar;
