"use client";
import NavBar from "@/components/Front/NavBar";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Section0 from "@/components/Front/Homepage/Section0";
import Section1 from "@/components/Front/Homepage/Section1";
import Section2 from "@/components/Front/Homepage/Section2";
import HomepageFooter from "@/components/Front/Homepage/HomepageFooter";
import { useCookies } from "next-client-cookies";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import { TranslateSection } from "@/types/homepageDictionnary";

function Homepage() {
  const [sectionIndex, setSectionIndex] = useState<number>(999);
  const [sectionPrevIndex, setSectionPrevIndex] = useState<number>(0);
  const [codes, setCodes] = useState<Array<string>>(["Chargement des codes"]);
  const [isCodeAnimation, setIsCodeAnimation] = useState<Boolean>(true);
  const isCodes = useRef(false);
  const windowWidth = useRef<number>();
  const windowPixelRatio = useRef<number>();
  const cookies = useCookies();
  const lang = cookies.get("lang") as keyof TranslateSection;
  const [isLoading, setIsloading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const codesParams = searchParams.get("codes");

    window.addEventListener("resize", userResizing, true);
    if (window.innerWidth >= 1700) {
      AOS.init({ mirror: true });
      setSectionIndex(0);
    } else AOS.init();

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

    // Si l'url possède ?codes
    if (codesParams !== null) {
      isCodes.current = true;
      if (window.innerWidth >= 1700) {
        // Version desktop
        setSectionPrevIndex(1);
        setSectionIndex(2);
      }
    }
    setIsloading(false);
    windowWidth.current = window.innerWidth;
    windowPixelRatio.current = window.devicePixelRatio;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isCodes.current && window.innerWidth <= 1700) {
      setIsCodeAnimation(false);
      setTimeout(() => {
        const codesEl: any = document.querySelector("#codes");
        if (codesEl) codesEl.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  }, [isLoading]);

  // falsy isCodes.current pour donner accès à sectionIndex[0]
  useEffect(() => {
    if (isCodes.current && sectionIndex === 1) isCodes.current = false;
  }, [sectionIndex]);

  const userResizing = () => {
    // Detecte uniquement le resize en X, permet d'eviter le saut de page debut de page si scroll trop rapide sur mobile
    if (
      windowWidth.current !== window.innerWidth || // Detecte le resize width
      windowPixelRatio.current !== window.devicePixelRatio // Detecte le resize en zoomant
    ) {
      windowWidth.current = window.innerWidth;
      const startPage: any = document.querySelector("body");
      if (window.innerWidth <= 1700) {
        setSectionIndex(999);
        if (isCodes.current) {
          const codesEl: any = document.querySelector("#codes");
          if (codesEl) codesEl.scrollIntoView({ behavior: "auto" });
        } else {
          startPage.scrollIntoView({ behavior: "auto" });
        }
      } else {
        if (isCodes.current) {
          setSectionIndex(2);
        } else {
          setSectionIndex(0);
          startPage.scrollIntoView({ behavior: "auto" });
        }
      }
    }
  };

  const showSection0 = sectionIndex === 0 || sectionIndex === 999;
  const showSection1 = sectionIndex === 1 || sectionIndex === 999;
  const showSection2 = sectionIndex === 2 || sectionIndex === 999;

  if (isLoading) {
    return (
      <div className="overflow-hidden">
        <NavBar />
        <StarBGAnimation />
        <div className="flex w-screen h-[calc(100vh-205px)] justify-center items-center">
          <LoadingSpin />
        </div>
        <HomepageFooter lang={lang} />
      </div>
    );
  }

  return (
    <>
      <div
        className={`overflow-x-hidden xl2:w-screen xl2:h-screen xl2:overflow-y-hidden`}
      >
        <NavBar
          isHomepage
          sectionIndex={sectionIndex}
          setSectionIndex={setSectionIndex}
          setSectionPrevIndex={setSectionPrevIndex}
        />
        <StarBGAnimation zIndex={0} />
        <div className="text-white mt-10 xl2:mt-0 xl2:overflow-hidden xl2:h-[calc(100vh-64px)] flex flex-col justify-center items-center">
          {/* 1ere section */}
          {showSection0 && (
            <Section0 sectionPrevIndex={sectionPrevIndex} lang={lang} />
          )}

          {/* 2eme section */}
          {showSection1 && (
            <Section1 sectionPrevIndex={sectionPrevIndex} lang={lang} />
          )}
          {/* 3eme section */}
          {showSection2 && (
            <Section2
              codes={codes}
              isCodeAnimation={isCodeAnimation}
              lang={lang}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Suspense>
      <Homepage />
    </Suspense>
  );
}
