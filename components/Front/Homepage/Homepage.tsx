// components/Homepage.tsx
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
import { useCookies } from "next-client-cookies"; // Assurez-vous que ceci est importé
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import { TranslateSection } from "@/types/homepageDictionnary";

function Homepage({ lang }: { lang: keyof TranslateSection }) {
  const [sectionIndex, setSectionIndex] = useState<number>(999);
  const [sectionPrevIndex, setSectionPrevIndex] = useState<number>(0);
  const [codes, setCodes] = useState<Array<string>>(["Chargement des codes"]);
  const [isCodeAnimation, setIsCodeAnimation] = useState<Boolean>(true);
  const isCodes = useRef(false);
  const windowWidth = useRef<number>(0);
  const windowPixelRatio = useRef<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  // // Appel de useCookies ici
  // const cookies = useCookies(); // Récupérer les cookies ici
  // const langFromCookies =
  //   (cookies.get("lang") as keyof TranslateSection) || lang; // Utiliser la langue récupérée

  useEffect(() => {
    const codesParams = searchParams.get("codes");

    window.addEventListener("resize", userResizing, true);
    if (window.innerWidth >= 1700) {
      AOS.init({ mirror: true });
      setSectionIndex(0);
    } else {
      AOS.init();
    }

    fetch("/api/other/all", { next: { revalidate: 300 } })
      .then((res) => res.json())
      .then((json: any) => {
        const { codes } = json.data;
        const codesArray = codes.split("\n");
        setCodes(
          codesArray[0] === "" ? ["Pas de code pour le moment"] : codesArray
        );
      });

    if (codesParams !== null) {
      isCodes.current = true;
      if (window.innerWidth >= 1700) {
        setSectionPrevIndex(1);
        setSectionIndex(2);
      }
    }
    setIsLoading(false);
    windowWidth.current = window.innerWidth;
    windowPixelRatio.current = window.devicePixelRatio;
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

  useEffect(() => {
    if (isCodes.current && sectionIndex === 1) isCodes.current = false;
  }, [sectionIndex]);

  const userResizing = () => {
    if (
      windowWidth.current !== window.innerWidth ||
      windowPixelRatio.current !== window.devicePixelRatio
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
        <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
          <div className="text-white mt-10 xl2:mt-0 xl2:overflow-hidden xl2:h-[calc(100vh-64px)] flex flex-col justify-center items-center">
            {showSection0 && (
              <Section0 sectionPrevIndex={sectionPrevIndex} lang={lang} />
            )}
            {showSection1 && (
              <Section1 sectionPrevIndex={sectionPrevIndex} lang={lang} />
            )}
            {showSection2 && (
              <Section2
                codes={codes}
                isCodeAnimation={isCodeAnimation}
                lang={lang}
              />
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default Homepage;
