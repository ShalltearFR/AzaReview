import { CDN2 } from "@/utils/cdn";
import VerticalNotationArray from "./VerticalNotationArray";
import HorizontalNotationArray from "./HorizontalNotationArray";

interface Section1Props {
    sectionPrevIndex: number
}

const Section1: React.FC<Section1Props> = ({ sectionPrevIndex }) => {
    return (
        <section
            className={`bg-brown2 mt-10 xl2:mt-0 xl:min-h-screen flex flex-col justify-center items-center`}
        >
            <div className=" mx-auto flex flex-col items-center justify-center [&_article]:lg:!w-11/12 [&_article]:!xxl:w-1/2 [&_article]:w-full [&_article]:p-5 [&_article]:bg-black [&_article]:mmd:w-3/4 [&_article]:mmd:rounded-3xl">
                <div
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="mx-auto w-full mmd:w-1/2 lg:!w-11/12 xxl:w-1/2 z-10"
                >
                    <img
                        src={`${CDN2}/img/homepage/pela.webp`}
                        className="h-36 ml-auto translate-y-5 "
                    />
                </div>
                <div
                    data-aos={`${sectionPrevIndex === 0 ? "fade-right" : "fade-left"
                        }`}
                    className="flex flex-col gap-y-5 justify-center items-center my-auto mb-10 z-10"
                >
                    <article>
                        <h2 className="text-xl xl:text-2xl font-bold text-center mb-5">
                            {"Analyse des Recommandations"}
                        </h2>
                        <p>
                            {
                                "Le site analyse des personnages terminés, c'est à dire avec le niveau, le cône, les traces et les reliques / ornements améliorés. Prenez donc en considération qu'une relique sera par exemple mal notée si elle n'est pas montée."
                            }
                        </p>
                        <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mt-5">
                            <li>
                                <strong>{"Les statistiques recommandées "}</strong>
                                {
                                    "permettent d'évaluer le besoin d'un personnage et votre objectif à dépasser."
                                }
                            </li>
                            <li>
                                {
                                    "Bien évidement si vous offrez de la vitesse ou des gains d'actions avec des personnages tels que Sparkle ou Bronya, alors "
                                }
                                <strong>
                                    {"la recommandation de vitesse ne sera pas la même "}
                                </strong>
                                {"(à vous d'ajuster / réduire)"}
                            </li>
                            <li>
                                {
                                    "Les recommandations sont faites pour posséder des personnages "
                                }
                                <strong className="text-darkGreen">versatiles</strong>{" "}
                                et{" "}
                                <strong className="text-darkGreen">équilibrés</strong>.
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h2 className="text-xl xl:text-2xl font-bold text-center mb-5">
                            {"Les Notes et Objectifs"}
                        </h2>
                        <p>
                            {
                                "Le système de notation de Reliques et Ornements prend en compte les besoins du personnage. Les statistiques les plus utiles amélioreront significativement la notation (chaque statistique a son coef. en fonction du personnage), les valeurs obtenues, le nombre d'augmentations de statistiques (4 ou 5) ainsi que la statistique principale."
                            }
                            <span className="font-semibold">
                                {
                                    " Les statistiques jugées totalement inutiles n'amélioreront pas la notation :"
                                }
                            </span>
                        </p>
                        <ul className="list-disc mt-5 [&_li]:ml-5 italic">
                            <li>
                                {"Une notation inférieure (de "}
                                <strong className="text-red">{" D "}</strong> {"à "}
                                <strong className="text-red">{"B+"}</strong>
                                {
                                    " ) signifie qu'il est fortement recommandé de changer la pièce correspondante."
                                }
                            </li>
                            <li>
                                {"Obtenir une note de"}
                                <strong className="text-blue">{" A "}</strong> {"ou "}
                                <strong className="text-blue">{"A+ "}</strong>
                                {"est la moyenne à atteindre si possible partout."}
                            </li>
                            <li>
                                {"Une notation supérieur (de "}
                                <strong className="text-darkGreen">{"S "}</strong>{" "}
                                {"à "}{" "}
                                <strong className="text-darkGreen">{"SSS"}</strong>
                                {
                                    ") confirme que la pièce est très bien et qu'il n'y a pas besoin de perdre du temps à l'améliorer (sauf si vous souhaitez perfectionner votre personnage)."
                                }
                            </li>
                        </ul>
                    </article>
                    <div className="bg-black mmd:bg-transparent w-full px-10 mmd:w-auto mmd:px-0">
                        <VerticalNotationArray />

                        <HorizontalNotationArray />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section1;
