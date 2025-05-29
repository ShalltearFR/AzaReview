import { CDN2 } from "@/utils/cdn";

const HomepageFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white text-center py-5 w-full mt-10 z-10">
      <div className="justify-center z-10">
        {"Copyright © 2024 - "}
        Création par <b>ShalltearFR</b> {" ~ "}
        Review par
        <a
          href="https://www.twitch.tv/azano__"
          target="_blank"
          className="underline hover:no-underline font-bold"
        >
          {" "}
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
        Design page d'accueil par
        <b>Amane</b> et <b>Shalltear</b>
      </div>
      <div>_</div>
      <div className="italic">
        Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du
        jeu sont des marques déposées et des droits d'auteur de Hoyoverse.
      </div>
    </footer>
  );
};

export default HomepageFooter;
