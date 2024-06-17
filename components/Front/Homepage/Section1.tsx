"use client";
import { CDN2 } from "@/utils/cdn";
import VerticalNotationArray from "./VerticalNotationArray";
import HorizontalNotationArray from "./HorizontalNotationArray";
import { useEffect, useState } from "react";
import {
  TranslateSection1,
  TranslateSection1Array,
} from "@/utils/homepageDictionnary";
import translateBBCode from "@/utils/translateBBCode";
import { TranslateSection } from "@/types/homepageDictionnary";

interface Section1Props {
  sectionPrevIndex: number;
  lang: keyof TranslateSection | undefined;
}

const Section1: React.FC<Section1Props> = ({ sectionPrevIndex, lang }) => {
  const [translateSection, setTranslateSection] = useState<Array<string>>([""]);
  const [translateSectionArray, setTranslateSectionArray] = useState<
    Array<string>
  >([""]);

  useEffect(() => {
    setTranslateSection(TranslateSection1[lang ?? "fr"]);
    setTranslateSectionArray(TranslateSection1Array[lang ?? "fr"]);
  }, [lang]);
  return (
    <section
      className={`bg-brown2 mt-10 xl2:mt-0 xl:min-h-screen flex flex-col justify-center items-center`}
    >
      <div className=" mx-auto flex flex-col items-center justify-center [&_article]:lg:!w-11/12 [&_article]:!xxl:w-1/2 [&_article]:w-full [&_article]:p-5 [&_article]:bg-black [&_article]:mmd:w-3/4 [&_article]:mmd:rounded-3xl">
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="mx-auto w-full mmd:w-1/2 lg:!w-11/12 xxl:w-1/2 z-10"
        >
          <img
            src={`${CDN2}/img/homepage/pela.webp`}
            className="h-36 ml-auto translate-y-5 "
          />
        </div>
        <div
          data-aos={`${sectionPrevIndex === 0 ? "fade-right" : "fade-left"}`}
          className="flex flex-col gap-y-5 justify-center items-center my-auto mb-10 z-10"
        >
          <article>
            <h2 className="text-xl xl:text-2xl font-bold text-center mb-5">
              {translateSection[0]}
            </h2>
            <div>{translateSection[1]}</div>
            <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mt-5">
              <li>
                <strong>{translateSection[2]}</strong>
                {translateSection[3]}
              </li>
              <li>{translateBBCode(translateSection[4])}</li>
              <li>{translateBBCode(translateSection[5])}</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl xl:text-2xl font-bold text-center mb-5">
              {translateSection[6]}
            </h2>
            <div>{translateBBCode(translateSection[7])}</div>
            <ul className="list-disc mt-5 [&_li]:ml-5 italic">
              <li>{translateBBCode(translateSection[8])}</li>
              <li>{translateBBCode(translateSection[9])}</li>
              <li>{translateBBCode(translateSection[10])}</li>
            </ul>
          </article>
          <div className="bg-black mmd:bg-transparent w-full px-10 mmd:w-auto mmd:px-0">
            <VerticalNotationArray translate={translateSectionArray} />

            <HorizontalNotationArray translate={translateSectionArray} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
