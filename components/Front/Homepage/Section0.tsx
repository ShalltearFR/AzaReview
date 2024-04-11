"use client";
import { CDN2 } from "@/utils/cdn";
import type { TranslateSection } from "@/utils/homepageDictionnary";
import { TranslateSection0 } from "@/utils/homepageDictionnary";
import translateBBCode from "@/utils/translateBBCode";
import { useEffect, useState } from "react";

interface Section0Props {
  sectionPrevIndex: number;
  lang: string | undefined;
}

const Section0: React.FC<Section0Props> = ({ sectionPrevIndex, lang }) => {
  const [translateSection, setTranslateSection] = useState<Array<string>>([""]);

  useEffect(() => {
    setTranslateSection(
      TranslateSection0[(lang as keyof TranslateSection) ?? "fr"]
    );
  }, [lang]);

  return (
    <section
      className={`flex flex-col w-full xl:flex-row justify-center items-center gap-y-10 lg:gap-x-10 pb-10 xl:pb-0 xl:px-5`}
    >
      <div
        data-aos={`${sectionPrevIndex === 0 ? "fade-right" : "fade-left"}`}
        className=" bg-black p-5 w-full mmd:w-[750px] mmd:rounded-3xl xl2:w-[900px] pt-10 z-10"
      >
        <h1 className="text-3xl xl:text-4xl font-bold text-center">
          {translateBBCode(translateSection[0])}
        </h1>
        <h2 className="mt-5 mb-7 text-xl xl:text-2xl font-bold text-center">
          {translateBBCode(
            TranslateSection0[(lang as keyof TranslateSection) ?? "fr"][1]
          )}
        </h2>
        <p className="text-center text-lg text-darkGreen font-semibold">
          {translateBBCode(translateSection[2])}
        </p>
        <p className="mt-5">{translateBBCode(translateSection[3])}</p>
        <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mb-5">
          {translateBBCode(translateSection[4])}
        </ul>
        <p className="my-5">
          {translateSection[5]}
          <span className="text-red font-bold">{translateSection[6]}</span>
          {translateSection[7]}
        </p>
        <p className="font-semibold">{translateSection[8]}</p>
        <ul className="list-disc [&_*]:ml-3 mb-5 font-semibold italic">
          {translateBBCode(translateSection[9])}
        </ul>
        <p>
          {translateSection[10]}
          <span className="text-red font-bold">{translateSection[6]}</span>
          {translateSection[11]}
        </p>
        <p className="mt-5">
          <span className="font-semibold">{translateSection[12]}</span>
          {translateSection[13]}
        </p>
      </div>
      <div
        data-aos="fade-left"
        className="bg-black p-5 w-full mmd:w-auto mmd:rounded-3xl z-10 h-full flex flex-col justify-center"
      >
        <p className="text-3xl font-bold text-center mb-5">
          {translateSection[14]}
        </p>
        <video autoPlay playsInline muted loop className="rounded-2xl mx-auto">
          <source
            src={`${CDN2}/video/homepage/vitrine.webm`}
            type="video/webm"
          />
        </video>
      </div>
    </section>
  );
};

export default Section0;
