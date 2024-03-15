import { CDN2 } from "@/utils/cdn";

const HomepageFooter: React.FC = () => {
  return (
    <div className="bg-black text-white text-center py-5 w-full mt-auto">
      <p className="justify-center">
        {"Copyright © 2024 - Creation par"} <strong>ShalltearFR</strong>{" "}
        {" ~ Review par "}
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
      </p>
      <p>
        {"Design page d'accueil par "}
        <strong>Amane</strong>
      </p>
      <p>_</p>
      <p className="italic">
        {
          "Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du jeu sont des marques déposées et des droits d'auteur de Hoyoverse."
        }
      </p>
    </div>
  );
};

export default HomepageFooter;
