const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white text-center py-5 mt-14">
      <p className="font-bold">Copyright © 2024 - Creation par Shalltear</p>
      <p className="italic">
        {
          "Ce site n'est pas affilié à Hoyoverse et tous les contenus et actifs du jeu sont des marques déposées et des droits d'auteur de Hoyoverse."
        }
      </p>
      <p className="mt-2 underline">
        <a href="https://march7th.xiaohei.moe/zh/resource/mihomo_api.html">
          API : mihomo.me
        </a>
      </p>
    </div>
  );
};

export default Footer;
