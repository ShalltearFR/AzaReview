import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN2 } from "@/utils/cdn";
import { TranslateSection0 } from "@/utils/homepageDictionnary";
import translateBBCode from "@/utils/translateBBCode";
import { useEffect, useState } from "react";

interface Section0Props {
  sectionPrevIndex: number;
  lang: keyof TranslateSection | undefined;
}

const Section0: React.FC<Section0Props> = ({ sectionPrevIndex, lang }) => {
  const [translateSection, setTranslateSection] = useState<Array<string>>([""]);

  useEffect(() => {
    setTranslateSection(TranslateSection0[lang ?? "fr"]);
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
          {translateBBCode(TranslateSection0[lang ?? "fr"][1])}
        </h2>
        <div className="text-center text-lg text-darkGreen font-semibold">
          {translateBBCode(translateSection[2])}
        </div>
        <div className="mt-5">{translateBBCode(translateSection[3])}</div>
        <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mb-5">
          <li key={`list-1-item-1${lang}`}>
            {translateBBCode(translateSection[4])}
          </li>
          <li key={`list-1-item-2${lang}`}>
            {translateBBCode(translateSection[5])}
          </li>
          <li key={`list-1-item-3${lang}`}>
            {translateBBCode(translateSection[6])}
          </li>
        </ul>
        <div className="my-5">
          {translateSection[7]}
          <span className="text-red font-bold">{translateSection[8]}</span>
          {translateSection[9]}
        </div>
        <div className="font-semibold">{translateSection[10]}</div>
        <ul className="list-disc [&_*]:ml-3 mb-5 font-semibold italic">
          {/* <li key={"list-2-item-1"}>{translateBBCode(translateSection[11])}</li>
          <li key={"list-2-item-2"}>{translateBBCode(translateSection[12])}</li>
          <li key={"list-2-item-3"}>{translateBBCode(translateSection[13])}</li>
          <li key={"list-2-item-4"}>{translateBBCode(translateSection[14])}</li>
          <li key={"list-2-item-5"}>{translateBBCode(translateSection[15])}</li> */}
        </ul>
        <div>
          {translateSection[16]}
          <span className="text-red font-bold">{translateSection[8]}</span>
          {translateSection[17]}
        </div>
        <div className="mt-5">
          <span className="font-semibold">{translateSection[18]}</span>
          {translateSection[19]}
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="bg-black p-5 w-full mmd:w-auto mmd:rounded-3xl z-10 h-full flex flex-col justify-center"
      >
        <div className="text-3xl font-bold text-center mb-5">
          {translateSection[20]}
        </div>
        <video
          width={596}
          height={596}
          autoPlay
          playsInline
          muted
          loop
          className="rounded-2xl mx-auto"
        >
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
