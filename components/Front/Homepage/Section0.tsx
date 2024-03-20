import { CDN2 } from "@/utils/cdn";

interface Section0Props {
    sectionPrevIndex: number
}

const Section0: React.FC<Section0Props> = ({ sectionPrevIndex }) => {
    return (
        <section
            className={`flex flex-col w-full xl:flex-row justify-center items-center gap-y-10 lg:gap-x-10 pb-10 xl:pb-0 xl:px-5`}
        >
            <div
                data-aos={`${sectionPrevIndex === 0 ? "fade-right" : "fade-left"
                    }`}
                className=" bg-black p-5 w-full mmd:w-[750px] mmd:rounded-3xl xl2:w-[900px] pt-10 z-10"
            >
                <h1 className="text-3xl xl:text-4xl font-bold text-center">
                    {"Votre review Honkai : Star Rail"}
                </h1>
                <h2 className="mt-5 mb-7 text-xl xl:text-2xl font-bold text-center">
                    {"C'est quoi Review HSR ?"}
                </h2>
                <p className="text-center text-lg text-darkGreen font-semibold">
                    {"Un site d'aide pour améliorer facilement vos personnages."}
                </p>
                <p className="mt-5">
                    {
                        "Des conseils clairs et adaptés pour une utilisation en toute simplicité."
                    }
                </p>
                <ul className="list-decimal [&_li]:ml-5 marker:text-purple marker:text-xl marker:font-extrabold mb-5">
                    <li>
                        {"Mettez vos personnages du jeu en vitrine. "}
                        <strong>(cf. vidéo de la page)</strong>
                    </li>
                    <li>
                        <span>
                            {
                                'Entrez votre UID sur le site et cliquez sur "Rechercher".'
                            }
                        </span>
                        <span className="font-semibold">
                            {
                                " Si vous venez de modifier votre vitrine en jeu, patientez 10 minutes "
                            }
                        </span>
                        {"pour que la synchronisation soit bien effectuée."}
                    </li>
                    <li>
                        {
                            "Si un personnage possède plusieurs façons d'être équipé / joué, il faudra sélectionner le build correspondant à votre utilisation."
                        }
                    </li>
                </ul>
                <p className="my-5">
                    {"Le moindre élément qui ne convient pas sera noté en "}
                    <span className="text-red font-bold">rouge</span>
                    {" et des recommandations seront faites pour vous aider."}
                </p>
                <p className="font-semibold">
                    {"Les éléments suivants sont analysés :"}
                </p>
                <ul className="list-disc [&_*]:ml-5 mb-5 font-semibold italic">
                    <li>{"Le cône."}</li>
                    <li>{"Les ensembles de reliques et ornements."}</li>
                    <li>{"Les statistiques principales de vos pièces."}</li>
                    <li>{"Vos statistiques finales."}</li>
                    <li>
                        {
                            "La pertinance de vos pièces avec un système de notation ( de D à SSS)."
                        }
                    </li>
                </ul>
                <p>
                    {"Sélectionnez ou survolez les éléments en "}
                    <span className="text-red font-bold">rouge</span>
                    {" pour voir une recommandation accessible pour tous."}
                </p>
                <p className="mt-5">
                    <span className="font-semibold">
                        {
                            "Si votre personnage n'a aucun élément en rouge alors il est bien équipé"
                        }
                    </span>
                    {
                        ", libre à vous d'essayer d'améliorer la pièce avec la notation la plus faible ou de passer au personnage suivant !"
                    }
                </p>
            </div>
            <div
                data-aos="fade-left"
                className="bg-black p-5 w-full mmd:w-auto mmd:rounded-3xl z-10 h-full flex flex-col justify-center"
            >
                <p className="text-3xl font-bold text-center mb-5">
                    Sélectionnez vos personnages en vitrine
                </p>
                <video
                    autoPlay
                    playsInline
                    muted
                    loop
                    className="rounded-2xl mx-auto"
                >
                    <source
                        src={`${CDN2}/video/homepage/vitrine.webm`}
                        type="video/webm"
                    />
                </video>
            </div>
        </section>
    );
};

export default Section0;
