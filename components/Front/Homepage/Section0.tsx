import { CDN2 } from "@/utils/cdn";

const Section0: React.FC = () => {
  return (
    <section
      id="section0"
      className={`flex flex-col w-full xl:flex-row justify-center items-center gap-y-10 lg:gap-x-10 xl:px-5 xl:h-screen xl:pt-[96px] font-Helvetica`}
    >
      <div className=" bg-black p-5 w-full mmd:w-[750px] mmd:rounded-3xl xl2:w-[900px] extraXl:w-[1200px] py-10 z-10 smd:shadow-md smd:shadow-black">
        <h1 className="text-3xl xl:text-4xl extraXl:text-6xl font-bold text-center text-orange">
          Votre review Honkai : Star Rail
        </h1>
        <h2 className="mt-5 mb-7 text-xl xl:text-2xl extraXl:text-4xl font-bold text-center">
          C'est quoi Review HSR ?
        </h2>
        <div className="text-center text-lg extraXl:text-3xl text-darkGreen font-semibold">
          Un site d'aide pour améliorer facilement vos personnages.
        </div>
        <div className="mt-5 extraXl:text-2xl">
          Des conseils clairs et adaptés pour une utilisation en toute
          simplicité.
        </div>
        <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mb-5 extraXl:marker:text-2xl extraXl:text-2xl">
          <li key={`list-1-item-1`}>
            Mettez vos personnages du jeu en vitrine.{" "}
            <b>(cf. vidéo de la page)</b>
          </li>
          <li key={`list-1-item-2`}>
            Entrez votre UID sur le site et cliquez sur "Rechercher".
            <b>
              {" "}
              Si vous venez de modifier votre vitrine en jeu, patientez 10
              minutes{" "}
            </b>
            pour que la synchronisation soit bien effectuée.
          </li>
          <li key={`list-1-item-3`}>
            Si un personnage possède plusieurs façons d'être équipé / joué, il
            faudra sélectionner le build correspondant à votre utilisation.
          </li>
        </ul>
        <div className="my-5 extraXl:my-7 extraXl:text-2xl">
          Le moindre élément qui ne convient pas sera noté en
          <span className="text-red font-bold"> rouge </span>
          et des recommandations seront faites pour vous aider.
        </div>
        <div className="font-semibold extraXl:text-2xl">
          Les éléments suivants sont analysés :
        </div>
        <ul className="list-disc [&_*]:ml-3 mb-5 font-semibold italic extraXl:text-2xl">
          <li>Le cône.</li>
          <li>Les ensembles de reliques et ornements.</li>
          <li>Les statistiques principales de vos pièces.</li>
          <li>Vos statistiques finales.</li>
          <li>
            La pertinence de vos pièces avec un système de notation (de D à
            SSS).
          </li>
        </ul>
        <div className="extraXl:text-2xl">
          Sélectionnez ou survolez les éléments en
          <span className="text-red font-bold"> rouge </span>
          pour voir une recommandation accessible pour tous.
        </div>
        <div className="mt-5 extraXl:text-2xl">
          <span className="font-semibold">
            Si votre personnage n'a aucun élément en rouge alors il est bien
            équipé
          </span>
          , libre à vous d'essayer d'améliorer la pièce avec la notation la plus
          faible ou de passer au personnage suivant !
        </div>
      </div>
      <div className="bg-black p-5 w-full mmd:w-auto mmd:rounded-3xl z-10 flex flex-col justify-center smd:shadow-md smd:shadow-black">
        <div className="text-3xl font-bold text-center mb-5">
          Sélectionnez vos personnages en vitrine
        </div>
        <video
          width={596}
          height={596}
          autoPlay
          playsInline
          muted
          loop
          className="rounded-2xl mx-auto"
          poster={`${CDN2}/video/homepage/vitrine.avif`}
        >
          <source
            src={`https://res.cloudinary.com/shalltear/video/upload/f_auto:video,q_auto/v1/review%20HSR/aqhaema6h9qet9euqmjr`}
            type="video/webm"
          />
        </video>
      </div>
    </section>
  );
};

export default Section0;
