import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN2 } from "@/utils/cdn";
import { UIDtitles } from "@/utils/dictionnary";

interface FooterProps {
  lang: keyof TranslateSection | undefined;
}

const HomepageFooter: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-black text-white text-center py-5 w-full mt-10 z-10">
      <div className="justify-center z-10">
        {"Copyright © 2024 - "}
        {UIDtitles[lang ?? "fr"].CreatedBy} <strong>ShalltearFR</strong> {" ~ "}
        {UIDtitles[lang ?? "fr"].ReviewBy}
        <a
          href="https://www.twitch.tv/azano__"
          target="_blank"
          className="underline hover:no-underline font-bold"
        >
          Azano
          <img
            src={`${CDN2}/img/twitch-logo.svg`}
            width={22}
            height={24}
            className="h-6 ml-1 inline"
            alt="logo twitch"
          />
        </a>
      </div>
      <div>
        {UIDtitles[lang ?? "fr"].HomepageDesign}
        <strong>Amane</strong>
      </div>
      <div>_</div>
      <div className="italic">{UIDtitles[lang ?? "fr"].HoyoCopyright}</div>
    </footer>
  );
};

export default HomepageFooter;
