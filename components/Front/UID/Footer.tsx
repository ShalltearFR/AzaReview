import { CDN2 } from "@/utils/cdn";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white text-center py-5 xl:mt-14 z-10">
      <p className="justify-center">
        {"Copyright © 2024 - Création par "}
        <strong>ShalltearFR</strong> {" ~ "} {"Review par "}
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
      </p>
      <p className="text-lg">
        {"Payez moins cher avec "}
        <a
          className="font-bold underline hover:no-underline"
          href={
            "https://lootbar.gg/fr/top-up/honkai-star-rail?utm_source=Azano"
          }
        >
          Lootbar
        </a>
      </p>
      <p>_</p>
      <p className="italic">
        Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du
        jeu sont des marques déposées et des droits d'auteur de Hoyoverse.
      </p>
      <p className="mt-2 underline hover:no-underline">
        <a href="https://github.com/Mar-7th/StarRailRes" target="_blank">
          API : mihomo.me
        </a>
      </p>
    </div>
  );
};

export default Footer;
