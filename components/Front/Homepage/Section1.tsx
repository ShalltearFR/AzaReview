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
  lang: keyof TranslateSection | undefined;
}

const Section1: React.FC<Section1Props> = ({ lang }) => {
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
      id="section1"
      className={`xl2:mt-0 flex flex-col justify-center items-center pt-[96px] xl:h-screen font-Helvetica`}
    >
      <div className=" mx-auto flex flex-col items-center justify-center [&_article]:lg:!w-11/12 [&_article]:!xxl:w-1/2 [&_article]:w-full [&_article]:p-5 [&_article]:bg-black [&_article]:mmd:w-3/4 [&_article]:mmd:rounded-3xl">
        <div className="mx-auto w-full mmd:w-1/2 lg:!w-11/12 xxl:w-1/2 z-10">
          <img
            src={`${CDN2}/img/homepage/pela.webp`}
            alt="Pela"
            width={145}
            height={145}
            className="h-36 ml-auto translate-y-5 "
          />
        </div>
        <div className="flex flex-col gap-y-5 justify-center items-center my-auto mb-10 z-10">
          <article>
            <h2 className="text-xl xl:text-2xl extraXl:text-5xl font-bold text-center mb-5 extraXl:mb-10 text-orange">
              {translateSection[0]}
            </h2>
            <div className="extraXl:text-2xl">{translateSection[1]}</div>
            <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mt-5 extraXl:text-2xl">
              <li>
                <strong>{translateSection[2]}</strong>
                {translateSection[3]}
              </li>
              <li>{translateBBCode(translateSection[4])}</li>
              <li>{translateBBCode(translateSection[5])}</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl xl:text-2xl extraXl:text-5xl font-bold text-center mb-5 extraXl:mb-10 text-orange">
              {translateSection[6]}
            </h2>
            <div className="extraXl:text-2xl">
              {translateBBCode(translateSection[7])}
            </div>
            <ul className="list-disc mt-5 [&_li]:ml-5 italic extraXl:text-2xl">
              <li>{translateBBCode(translateSection[8])}</li>
              <li>{translateBBCode(translateSection[9])}</li>
              <li>{translateBBCode(translateSection[10])}</li>
            </ul>
          </article>
          <div className="bg-black mmd:bg-transparent w-full px-10 mmd:w-auto mmd:px-0 extraXl:text-2xl">
            <VerticalNotationArray translate={translateSectionArray} />

            <HorizontalNotationArray translate={translateSectionArray} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
