"use client";
import NavBar from "@/components/Front/NavBar";
import { CDN2 } from "@/utils/cdn";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Front/Footer";
import { Suspense } from "react";
import Section0 from "@/components/Front/Homepage/Section0";
import Section1 from "@/components/Front/Homepage/Section1";
import Section2 from "@/components/Front/Homepage/Section2";

function Homepage() {
  const [sectionIndex, setSectionIndex] = useState<number>(999);
  const [sectionPrevIndex, setSectionPrevIndex] = useState<number>(0);
  const [codes, setCodes] = useState<Array<string>>(["Chargement des codes"]);
  const [isCodeAnimation, setIsCodeAnimation] = useState<Boolean>(true);
  const isCodes = useRef(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const windowWidth = useRef<number>();
  const windowPixelRatio = useRef<number>();

  const searchParams = useSearchParams();

  useEffect(() => {
    const codesParams = searchParams.get("codes");

    window.addEventListener("resize", userResizing, true);
    if (window.innerWidth >= 1700) {
      AOS.init({ mirror: true });
      setSectionIndex(0);
    } else AOS.init();

    fetch("/api/other/all")
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
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: 0,
          }}
          data-aos="animate-stars"
        />
        <NavBar />
        <div className="flex w-screen h-[calc(100vh-295px)] justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-gray animate-spin  fill-orange"
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
          zIndex: 2,
        }}
        data-aos="animate-stars"
      />
      <div
        className={`overflow-x-hidden xl2:w-screen xl2:h-screen xl2:overflow-y-hidden`}
      >
        <NavBar
          isHomepage
          sectionIndex={sectionIndex}
          setSectionIndex={setSectionIndex}
          setSectionPrevIndex={setSectionPrevIndex}
        />
        <div className="text-white mt-10 xl2:mt-0 xl2:overflow-hidden xl2:h-[calc(100vh-64px)] flex flex-col justify-center items-center">
          {/* 1ere section */}
          {showSection0 && <Section0 sectionPrevIndex={sectionPrevIndex} />}

          {/* 2eme section */}
          {showSection1 && <Section1 sectionPrevIndex={sectionPrevIndex} />}
          {/* 3eme section */}
          {showSection2 && (
            <Section2 codes={codes} isCodeAnimation={isCodeAnimation} />
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
