import { CDN2 } from "@/utils/cdn";
import { TitlesByLanguage, UIDtitles } from "@/utils/dictionnary";

interface FooterProps {
  lang: string | undefined;
}

const HomepageFooter: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-black text-white text-center py-5 w-full mt-auto z-10">
      <div className="justify-center z-10">
        {"Copyright © 2024 - "}
        {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].CreatedBy}{" "}
        <strong>ShalltearFR</strong> {" ~ "}
        {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].ReviewBy}
        <a
          href="https://www.twitch.tv/azano__"
          target="_blank"
          className="underline hover:no-underline font-bold"
        >
          Azano
          <img
            src={`${CDN2}/img/twitch-logo.svg`}
            className="h-6 ml-1 inline"
            alt="logo twitch"
          />
        </a>
        {" ~ "}{" "}
        {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].ENtranslate}
        <a
          href="http://twitch.tv/fred_night0wl"
          target="_blank"
          className="underline hover:no-underline font-bold"
        >
          Fred_NightOwl
        </a>
        <img
          src={`${CDN2}/img/twitch-logo.svg`}
          className="h-6 ml-1 inline"
          alt="logo twitch"
        />
      </div>
      <div>
        {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].HomepageDesign}
        <strong>Amane</strong>
      </div>
      <div>_</div>
      <div className="italic">
        {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].HoyoCopyright}
      </div>
    </footer>
  );
};

export default HomepageFooter;
