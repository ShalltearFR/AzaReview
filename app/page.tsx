"use client";
import { Suspense, useEffect, useState } from "react";
import Section0 from "@/components/Front/Homepage/Section0";
import Section1 from "@/components/Front/Homepage/Section1";
import Section2 from "@/components/Front/Homepage/Section2";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import { TranslateSection } from "@/types/homepageDictionnary";
import NavBar from "@/components/Front/Homepage/NavBar";
import { VideoSection } from "@/components/Front/Homepage/VideoSection";
import { useCookies } from "next-client-cookies";
import scrollIntoView from "scroll-into-view-if-needed";

const sections = ["home", "section0", "section1", "section2"];

const Homepage = () => {
  const cookies = useCookies();
  const lang = cookies.get("lang") as keyof TranslateSection;
  const [activeId, setActiveId] = useState<string | null>("home");

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    setActiveId(id);
    if (el) {
      scrollIntoView(el, {
        behavior: "smooth",
        scrollMode: "always",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /*   useEffect(() => {
    AOS.init();

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
  }, []); */

  return (
    <>
      <div id="home" />
      <StarBGAnimation zIndex={0} />
      <NavBar handleScrollTo={handleScrollTo} activeId={activeId ?? "home"} />
      <div className="text-white flex flex-col justify-center items-center">
        <VideoSection />
        <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
          <Section0 lang={lang} />
          <Section1 lang={lang} />
          <Section2 codes={[]} isCodeAnimation={false} lang={lang} />
        </Suspense>
      </div>
    </>
  );
};

export default function App() {
  return <Homepage />;
}
