"use client";
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
import NavBar from "@/components/Front/Homepage/NavBar";

function Homepage() {
  const [codes, setCodes] = useState<Array<string>>(["Chargement des codes"]);
  const [isCodeAnimation, setIsCodeAnimation] = useState<Boolean>(true);
  const cookies = useCookies();
  const lang = cookies.get("lang") as keyof TranslateSection;

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div>
        <StarBGAnimation zIndex={0} />
        <NavBar />
        <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
          <div className="text-white flex flex-col justify-center items-center">
            <div className="flex w-full h-[calc(100vh-96px)] justify-center items-center relative">
              <video
                className="w-full h-full object-cover absolute"
                autoPlay
                muted
                loop
                src={`https://res.cloudinary.com/shalltear/video/upload/f_auto:video,q_auto/v1/review%20HSR/mdx0mxnzi31cma79gbok`}
                poster="https://res.cloudinary.com/shalltear/image/upload/v1710719830/review%20HSR/hsr_homepage_poster.webp"
              />
              <div>fefefe</div>
            </div>
            <Section0 lang={lang} />
            <Section1 lang={lang} />
            <Section2
              codes={codes}
              isCodeAnimation={isCodeAnimation}
              lang={lang}
            />
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpin width="w-10" height="h-10" />}>
      <Homepage />
    </Suspense>
  );
}
