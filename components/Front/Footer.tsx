const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white text-center py-5 xl:mt-14">
      <p className="font-bold flex gap-1 justify-center">
        Copyright © 2024 - Creation par ShalltearFR ~ Review par
        <a
          href="https://www.twitch.tv/azano__"
          target="_blank"
          className="underline hover:no-underline"
        >
          Azano
          <img
            src="/img/twitch-logo.svg"
            className="h-6 ml-1 inline"
            alt="logo twitch"
          />
        </a>
      </p>
      <p>_</p>
      <p className="italic">
        {
          "Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du jeu sont des marques déposées et des droits d'auteur de Hoyoverse."
        }
      </p>
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
