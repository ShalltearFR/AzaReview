"use client";
import { Suspense, useEffect, useRef } from "react";
import Section0 from "@/components/Front/Homepage/Section0";
import Section1 from "@/components/Front/Homepage/Section1";
import Section2 from "@/components/Front/Homepage/Section2";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import NavBar from "@/components/Front/Homepage/NavBar";
import { VideoSection } from "@/components/Front/Homepage/VideoSection";
import scrollIntoView from "scroll-into-view-if-needed";
import useDebouncedActiveId from "@/components/Front/Homepage/useDebouncedActiveId";
import HomepageFooter from "@/components/Front/Homepage/HomepageFooter";

const sections = ["home", "section0", "section1", "section2"];

const Homepage = () => {
  const [activeId, setActiveId] = useDebouncedActiveId("", 250);
  const isScrollingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return; // bloque maj activeId pendant scroll programmé

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections[0];
          setActiveId(mostVisible.target.id);
        }
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
        rootMargin: "0px 0px -50% 0px",
      }
    );

    const observer = observerRef.current;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingRef.current = true;

      scrollIntoView(el, {
        behavior: "smooth",
        scrollMode: "if-needed",
        block: window.innerWidth < 1350 ? "start" : "center", // Readapte le scroll pour la version mobile/tablette
        inline: window.innerWidth < 1350 ? "start" : "center",
      });

      // Bloque les changements d’activeId pendant ~600ms
      setTimeout(() => {
        isScrollingRef.current = false;
        setActiveId(id); // force le bon id une fois le scroll terminé
      }, 600);
    }
  };
  return (
    <>
      <div id="home" />
      <StarBGAnimation zIndex={0} />
      <NavBar handleScrollTo={handleScrollTo} activeId={activeId ?? "home"} />
      <div className="text-white flex flex-col justify-center items-center">
        <VideoSection handleScrollTo={handleScrollTo} />
        <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
          <Section0 />
          <Section1 />
          <Section2 />
          <HomepageFooter />
        </Suspense>
      </div>
    </>
  );
};

export default function App() {
  return <Homepage />;
}
