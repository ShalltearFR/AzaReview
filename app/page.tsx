"use client";
import HorizontalNotationArray from "@/components/Front/Homepage/HorizontalNotationArray";
import VerticalNotationArray from "@/components/Front/Homepage/VerticalNotationArray";
import NavBar from "@/components/Front/NavBar";
import { CDN2 } from "@/utils/cdn";

export default function App() {
  return (
    <>
      <NavBar isHomepage />
      <div className="mt-10 text-white">
        <section className="flex flex-col xl:flex-row justify-center items-center min-h-[calc(100vh-104px)] gap-y-10 xl:gap-x-10">
          <div className="bg-black p-5 w-full xl:w-[750px] xl:rounded-3xl">
            <h1 className="text-3xl xl:text-4xl font-bold text-center">
              {"Votre review Honkai : Star Rail"}
            </h1>
            <h2 className="my-5 text-xl xl:text-2xl font-bold text-center">
              {"C'est quoi Review HSR ?"}
            </h2>
            <p>{"Un site d'aide pour améliorer facilement vos personnages."}</p>
            <p>
              {
                "Des conseils clairs et adaptés pour une utilisation en toute simplicité."
              }
            </p>
            <p className="my-5">
              {"Le moindre élément qui ne convient pas sera noté en "}
              <span className="text-red">rouge</span>
              {" et des recommandations seront faites pour vous aider."}
            </p>
            <p>{"Les éléments suivants sont analysés :"}</p>
            <ul className="list-disc [&_*]:ml-5 mb-5">
              <li>{"Le cône"}</li>
              <li>{"Les ensembles de reliques et ornements"}</li>
              <li>{"Les statistiques principales de vos pièces"}</li>
              <li>{"Vos statistiques finales"}</li>
              <li>
                {
                  "La pertinance de vos pièces avec un système de notation ( de D à SSS)"
                }
              </li>
            </ul>
            <p>
              {"Sélectionnez ou survolez les éléments en "}
              <span className="text-red">rouge</span>
              {" pour voir une recommandation accessible pour tous."}
            </p>
            <p className="mt-5">
              {
                "Si votre personnage n'a aucun élément en rouge alors il est bien équipé, libre à vous d'essayer d'améliorer la pièce avec la notation la plus faible ou de passer au personnage suivant !"
              }
            </p>
          </div>
          <div className="bg-black p-5 w-full xl:w-96 xl:rounded-3xl">
            <p className="text-2xl font-bold text-center mb-5">
              Sélectionnez vos personnages en vitrine
            </p>
            <img
              src="/img/homepage/vitrine.webp"
              alt="personnages de vitrine"
              className="mx-auto"
            />
          </div>
        </section>
        <section className="bg-purple py-20">
          <div className="mx-auto w-full xl:w-[750px] translate-y-5">
            <img src="/img/homepage/pela.webp" className="h-36 ml-auto" />
          </div>
          <div className="flex flex-col gap-y-5 min-h-screen [&_article]:p-5 [&_article]:bg-black [&_article]:xl:w-[750px] [&_article]:w-full justify-center items-center [&_article]:xl:rounded-3xl">
            <article>
              <h2 className="text-xl font-bold text-center">
                {"Comment l'utiliser et le comprendre ?"}
              </h2>
              <ul className="mt-5 list-decimal [&_*]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold">
                <li>{"Mettez vos personnages du jeu en vitrine"}</li>
                <li>
                  {
                    'Entrez votre UID sur le site et cliquez sur "Rechercher". Si vous venez de modifier votre vitrine en jeu, patientez 10 minutes pour que la synchronisation soit bien effectuée.'
                  }
                </li>
                <li>
                  {
                    "Si un personnage possède plusieurs façons d'être équipé / joué, il faudra sélectionner le build correspondant à votre utilisation"
                  }
                </li>
              </ul>
            </article>
            <article>
              <p>
                {
                  "Le site analyse des personnages terminés, c'est à dire avec le niveau, le cône, les traces et les reliques / ornements améliorés. Prenez donc en considération qu'une relique sera par exemple mal notée si elle n'est pas montée."
                }
              </p>
            </article>
            <article>
              <p>
                {
                  "Les statistiques recommandés permettent d'évaluer le besoin d'un personnage et votre objectif à dépasser. Bien évidement si vous offrez de la vitesse ou des gains d'actions avec des personnages harmonies tels que Sparkle ou Bronya, la recommandation de Vitesse ne sera pas la même. Les recommandations sont donc faites pour possèder des personnages versatiles et équilibrés."
                }
              </p>
            </article>
            <article>
              <p>
                {
                  "Le système de notation de Reliques et Ornements prend en compte les besoins du personnage. Les statistiques les plus utiles amélioreront significativement la notation (chaque statistique a son coef. en fonction du personnage), les valeurs obtenues, le nombre d'augmentations de statistiques (4 ou 5) ainsi que la statistique principale. Les statistiques jugées totalement inutiles n'amélioreront pas la notation :"
                }
              </p>
              <ul className="list-disc mt-5 [&_li]:ml-5">
                <li>
                  {
                    "Obtenir une note de A ou A+ est la moyenne à atteindre si possible partout"
                  }
                </li>
                <li>
                  {
                    "Une notation inférieure (de D à B+) signifie qu'il est fortement recommandé de changer la pièce correspondante"
                  }
                </li>
                <li>
                  {
                    "Une notation supérieur (de S à SSS) confirme que la pièce est très bien et qu'il n'y a pas besoin de perdre du temps à l'améliorer (sauf si vous souhaitez perfectionner votre personnage)"
                  }
                </li>
              </ul>
            </article>
            <div className="bg-black xl:bg-transparent w-full px-10 xl:w-auto xl:px-0">
              <VerticalNotationArray />

              <HorizontalNotationArray />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
