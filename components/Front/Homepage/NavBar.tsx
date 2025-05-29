"use client";
import { useState } from "react";
import { CDN2 } from "@/utils/cdn";
import Link from "next/link";

interface NavBarProps {
  handleScrollTo: (id: string) => void;
  activeId: string;
}

const NavBar: React.FC<NavBarProps> = ({ handleScrollTo, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: "home", label: "Accueil" },
    { id: "section0", label: "Explications" },
    { id: "section1", label: "Analyses/Notes" },
    { id: "section2", label: "Codes" },
  ];

  const handleClick = (id: string) => {
    handleScrollTo(id);
    setIsOpen(false);
  };

  const renderLinks = (isMobile: boolean = false) => (
    <>
      {links.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`underlineAnimation ${
            activeId === id
              ? "font-extrabold underline underline-offset-8 decoration-orange"
              : ""
          } ${isMobile ? "text-left w-full" : "text-center"}`}
        >
          {label}
        </button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col w-screen bg-[#030303] fixed z-50 shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
      {/* Mobile Header */}
      <div className="flex items-center justify-between h-16 px-4 smd:hidden">
        <Link href="/">
          <img
            src={`${CDN2}/img/homepage/logo_min.png`}
            className="h-12"
            alt="Logo"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-start px-6 gap-4 pb-4 smd:hidden text-white text-lg font-medium font-Helvetica">
          {renderLinks(true)}
        </div>
      )}

      {/* Desktop / Tablet Menu */}
      <div className="hidden relative smd:grid grid-cols-6 w-full text-white text-xl font-medium extraXl:text-2xl font-Helvetica h-16 items-center px-4">
        {/* Logo intégré à la grille */}
        <div className="flex justify-start absolute top-2 left-2">
          <Link href="/">
            <img
              src={`${CDN2}/img/homepage/logo_min.png`}
              className="h-20 "
              alt="Logo"
            />
          </Link>
        </div>
        <div className="mx-auto" /> {/* Permet de Centrer les accès rapide */}
        {/* Liens de navigation */}
        {links.map(({ id, label }) => (
          <div key={id} className="text-center">
            <button
              onClick={() => handleScrollTo(id)}
              className={`underlineAnimation ${
                activeId === id
                  ? "font-extrabold underline underline-offset-8 decoration-orange"
                  : ""
              }`}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
