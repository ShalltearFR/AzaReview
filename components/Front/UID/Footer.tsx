import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN2 } from "@/utils/cdn";
import { UIDtitles } from "@/utils/dictionnary";

interface FooterProps {
  lang: keyof TranslateSection | undefined;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <div className="bg-black text-white text-center py-5 xl:mt-14 z-10">
      <p className="justify-center">
        {"Copyright © 2024 - "}
        {UIDtitles[lang ?? "fr"].CreatedBy}
        <strong>ShalltearFR</strong> {" ~ "} {UIDtitles[lang ?? "fr"].ReviewBy}
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
        {" ~ "} {UIDtitles[lang ?? "fr"].ENtranslate}
        <a
          href="https://twitter.com/orelsan01"
          target="_blank"
          className="underline hover:no-underline font-bold"
        >
          Orelsan
        </a>
        <img
          src={`${CDN2}/img/twitter-logo.webp`}
          width={24}
          height={24}
          className="h-6 ml-1 inline"
          alt="logo twitter"
        />
      </p>
      <p className="text-lg">
        {UIDtitles[lang ?? "fr"].PayLess}
        <a
          className="font-bold underline hover:no-underline"
          href="https://lootbar.gg/fr/top-up/honkai-star-rail?utm_source=Azano"
        >
          Lootbar
        </a>
      </p>
      <p>_</p>
      <p className="italic">{UIDtitles[lang ?? "fr"].HoyoCopyright}</p>
      <p className="mt-2 underline hover:no-underline">
        <a
          href="https://march7th.xiaohei.moe/en/resource/mihomo_api.html"
          target="_blank"
        >
          API : mihomo.me
        </a>
      </p>
    </div>
  );
};

export default Footer;
