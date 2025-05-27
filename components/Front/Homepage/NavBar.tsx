"use client";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";

interface NavBarProps {
  handleScrollTo: (id: string) => void;
  activeId: string;
}

const NavBar: React.FC<NavBarProps> = ({ handleScrollTo, activeId }) => {
  return (
    <div className="flex w-full h-16 bg-[#030303] fixed z-50 shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
      <Link href={"/"}>
        <img
          src={`${CDN2}/img/homepage/logo_min.png`}
          className="absolute h-20 left-2 top-2 z-50 smd:mt-2 xl:mt-0"
          alt="Logo"
        />
      </Link>
      <div className="grid grid-cols-4 ml-52 w-full text-center items-center text-white text-xl font-medium extraXl:text-2xl font-Helvetica">
        <div>
          <button
            onClick={() => handleScrollTo("home")}
            className={`underlineAnimation ${activeId === "home" ? "font-extrabold underline underline-offset-8 decoration-orange" : "no-underline"}`}
          >
            Accueil
          </button>
        </div>
        <div>
          <button
            onClick={() => handleScrollTo("section0")}
            className={`underlineAnimation ${
              activeId === "section0"
                ? "font-extrabold underline underline-offset-8 decoration-orange"
                : ""
            }`}
          >
            Explications
          </button>
        </div>
        <div>
          <button
            onClick={() => handleScrollTo("section1")}
            className={`underlineAnimation ${
              activeId === "section1"
                ? "font-extrabold underline underline-offset-8 decoration-orange"
                : ""
            }`}
          >
            Analyses/Notes
          </button>
        </div>
        <div>
          <button
            onClick={() => handleScrollTo("section2")}
            className={`underlineAnimation ${
              activeId === "section2"
                ? "font-extrabold underline underline-offset-8 decoration-orange"
                : ""
            }`}
          >
            Codes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
