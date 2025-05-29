import { CDN2 } from "@/utils/cdn";
import VerticalNotationArray from "./VerticalNotationArray";
import HorizontalNotationArray from "./HorizontalNotationArray";

const Section1: React.FC = () => {
  return (
    <section
      id="section1"
      className={`xl2:mt-0 flex flex-col justify-center items-center pt-[96px] xl:h-screen font-Helvetica`}
    >
      <div className=" mx-auto flex flex-col items-center justify-center [&_article]:lg:!w-11/12 [&_article]:!xxl:w-1/2 [&_article]:w-full [&_article]:p-5 [&_article]:bg-black [&_article]:smd:shadow-md [&_article]:smd:shadow-black [&_article]:mmd:w-3/4 [&_article]:mmd:rounded-3xl">
        <div className="mx-auto w-full mmd:w-1/2 lg:!w-11/12 xxl:w-1/2 z-10">
          <img
            src={`${CDN2}/img/homepage/pela.webp`}
            alt="Pela"
            width={145}
            height={145}
            className="h-36 ml-auto translate-y-5 "
          />
        </div>
        <div className="flex flex-col gap-y-5 justify-center items-center my-auto mb-10 z-10">
          <article>
            <h2 className="text-xl xl:text-2xl extraXl:text-5xl font-bold text-center mb-5 extraXl:mb-10 text-orange">
              Analyse des Recommandations
            </h2>
            <div className="extraXl:text-2xl">
              Le site analyse des personnages terminés, c'est à dire avec le
              niveau, le cône, les traces et les reliques / ornements améliorés.
              Prenez donc en considération qu'une relique sera par exemple mal
              notée si elle n'est pas montée.
            </div>
            <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mt-5 extraXl:text-2xl">
              <li>
                <strong>Les statistiques recommandées </strong>
                permettent d'évaluer le besoin d'un personnage et votre objectif
                à dépasser.
              </li>
              <li>
                Bien évidement si vous offrez de la vitesse ou des gains
                d'actions avec des personnages tels que Sparkle ou Bronya, alors{" "}
                <b>la recommandation de vitesse ne sera pas la même</b> (à vous
                d'ajuster / réduire)
              </li>
              <li>
                Les recommandations sont faites pour posséder des personnages{" "}
                <span className="bold text-darkGreen">versatiles</span> et{" "}
                <span className="bold text-darkGreen">équilibrés</span>.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl xl:text-2xl extraXl:text-5xl font-bold text-center mb-5 extraXl:mb-10 text-orange">
              Les Notes et Objectifs
            </h2>
            <div className="extraXl:text-2xl">
              Le système de notation de Reliques et Ornements prend en compte
              les besoins du personnage. Les statistiques les plus utiles
              amélioreront significativement la notation (chaque statistique a
              son coef. en fonction du personnage), les valeurs obtenues, le
              nombre d'augmentations de statistiques (4 ou 5) ainsi que la
              statistique principale.{" "}
              <b>
                Les statistiques jugées totalement inutiles n'amélioreront pas
                la notation
              </b>{" "}
              :
            </div>
            <ul className="list-disc mt-5 [&_li]:ml-5 italic extraXl:text-2xl">
              <li>
                Une notation inférieure (de{" "}
                <span className="bold text-red"> D </span> à{" "}
                <span className="bold text-red"> B+</span>) signifie qu'il est
                fortement recommandé de changer la pièce correspondante.
              </li>
              <li>
                Obtenir une note de{" "}
                <span className="bold text-light-blue">A</span> ou{" "}
                <span className="bold text-light-blue">A+</span> est la moyenne
                à atteindre si possible partout.
              </li>
              <li>
                Une notation supérieur (de{" "}
                <span className="bold text-darkGreen">S</span> à{" "}
                <span className="bold text-darkGreen">SSS</span>) confirme que
                la pièce est très bien et qu'il n'y a pas besoin de perdre du
                temps à l'améliorer (sauf si vous souhaitez perfectionner votre
                personnage).
              </li>
            </ul>
          </article>
          <div className="bg-black mmd:bg-transparent w-full px-10 mmd:w-auto mmd:px-0 extraXl:text-2xl">
            <VerticalNotationArray />

            <HorizontalNotationArray />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
