import Footer from "@/components/Front/UID/Footer";
import UidPage from "@/components/Front/UID/UidPage";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import shareCharactersStats from "@/utils/shareCharactersStats";
import type { Metadata } from "next";
import { cache } from "react";

import relic_setsFR from "@/static/relic_setsFR.json";
import light_conesFR from "@/static/light_conesFR.json";
import character_ranksFR from "@/static/character_ranksFR.json";
import relicsFR from "@/static/relicsFR.json";
import propertiesFR from "@/static/propertiesFR.json";

export const dynamic = "force-dynamic";

/*
 * ============================================================
 * CACHE DES DONNÉES INTERNES
 * ============================================================
 *
 * Les données des reviews et du changelog ne changent pas à
 * chaque requête UID.
 *
 * On les garde donc 5 minutes en cache côté Next.js.
 */

async function getData(url: string, convertToObject?: boolean) {
  const data = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!data.ok) {
    throw new Error(
      `Erreur HTTP ${data.status} lors de la récupération de ${url}`
    );
  }

  const dataJson = await data.json();

  if (convertToObject) {
    return Object.values(dataJson).map((item) => item);
  }

  return dataJson;
}

/*
 * ============================================================
 * RÉCUPÉRATION DES DONNÉES MIHOMO
 * ============================================================
 *
 * cache() permet de dédupliquer les appels identiques pendant
 * le rendu d'une même requête.
 *
 * C'est notamment utile ici :
 *
 * generateMetadata()
 *        ↓
 * getDataUid()
 *
 * Page()
 *        ↓
 * getDataUid()
 *
 * Les deux peuvent demander le même UID.
 */

const getDataUid = cache(
  async (
    endpoint: string,
    uid: number
  ): Promise<jsonUID | { status: number }> => {
    try {
      const data = await fetch(
        `https://api.mihomo.me/${endpoint}/${uid}?lang=fr&is_force_update=true`,
        {
          headers: {
            "User-Agent": "https://review-hsr.vercel.app",
            Host: "api.mihomo.me",
          },
          next: {
            revalidate: 300,
          },
        }
      );

      const jsonData = await data.json();

      /*
       * L'API Mihomo a répondu avec une erreur.
       */
      if (!data.ok) {
        let status: number;

        switch (jsonData.detail) {
          case "User not found":
            status = 404;
            break;

          case "Invalid uid":
            status = 400;
            break;

          default:
            status = 504;
            break;
        }

        return {
          status,
        };
      }

      /*
       * Réponse valide.
       */
      return {
        status: 200,
        ...jsonData,
      };
    } catch (error) {
      /*
       * Erreur réseau / timeout / problème de connexion.
       *
       * On traite cela comme une erreur 504 afin de conserver
       * le fonctionnement actuel de ton application.
       */
      console.error(
        `Erreur lors de la récupération de ${endpoint}/${uid} :`,
        error
      );

      return {
        status: 504,
      };
    }
  }
);

/*
 * ============================================================
 * MÉTADONNÉES
 * ============================================================
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: number }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const json = await getDataUid("sr_info_parsed", slug);

  /*
   * On vérifie que player existe avant de l'utiliser.
   */
  if ("player" in json && json.player) {
    return {
      metadataBase: new URL(CDN),

      title: `Review HSR de ${json.player.nickname}`,

      description: `Review Honkai : Star Rail sur le compte de ${json.player.nickname} - Pionnier ${json.player.level} - UID : ${json.player.uid}`,

      openGraph: {
        images: [`/${json.player.avatar.icon}`],
      },
    };
  }

  return {
    metadataBase: new URL(CDN),

    title: "Review HSR",

    description: "Review Honkai : Star Rail - UID non existant",

    openGraph: {
      images: ["/icon/avatar/8004.png"],
    },
  };
}

/*
 * ============================================================
 * UID DONT LES STATS ONT DÉJÀ ÉTÉ PARTAGÉES
 * ============================================================
 */

const sharedUID: string[] = [];

const isAllreadyShared = (uid: string) => {
  return sharedUID.includes(uid);
};

/*
 * Remise à zéro de la liste des UID partagés toutes les
 * 30 minutes.
 */
setInterval(
  () => {
    sharedUID.length = 0;
  },
  1000 * 60 * 30
);

/*
 * ============================================================
 * PAGE
 * ============================================================
 */

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  /*
   * ==========================================================
   * RÉCUPÉRATION UID
   * ==========================================================
   *
   * Grâce à cache(), cet appel peut être dédupliqué avec celui
   * effectué dans generateMetadata().
   */

  const jsonUid = await getDataUid("sr_info_parsed", slug);

  /*
   * ==========================================================
   * FILTRAGE DES PERSONNAGES
   * ==========================================================
   *
   * IMPORTANT :
   *
   * Une réponse d'erreur peut être :
   *
   * { status: 400 }
   * { status: 404 }
   * { status: 504 }
   *
   * Ces objets ne possèdent pas "characters".
   *
   * On ne fait donc .filter() que si characters existe
   * réellement et est bien un tableau.
   */

  if ("characters" in jsonUid && Array.isArray(jsonUid.characters)) {
    jsonUid.characters = jsonUid.characters.filter(
      (character) =>
        Array.isArray(character.skills) && character.skills.length > 0
    );
  }

  /*
   * ==========================================================
   * PARTAGE DES STATS DES PERSONNAGES
   * ==========================================================
   */

  if (
    "characters" in jsonUid &&
    Array.isArray(jsonUid.characters) &&
    "player" in jsonUid &&
    jsonUid.player?.uid &&
    !isAllreadyShared(jsonUid.player.uid)
  ) {
    jsonUid.characters.map((character: Character) =>
      shareCharactersStats(character, jsonUid.player.uid)
    );

    sharedUID.push(jsonUid.player.uid);
  }

  /*
   * ==========================================================
   * RÉCUPÉRATION DES REVIEWS + CHANGELOG
   * ==========================================================
   *
   * Ces deux fetch utilisent maintenant le cache de 5 minutes
   * défini dans getData().
   *
   * Cela évite de récupérer ces données à chaque page UID.
   */

  const [resReview, changelog] = await Promise.all([
    getData(`${process.env.WWW}/api/characters/all`, false),

    getData(`${process.env.WWW}/api/changelog/all`, false),
  ]);

  /*
   * ==========================================================
   * VÉRIFICATION DES DONNÉES
   * ==========================================================
   */

  if (!jsonUid || !resReview) {
    return <div className="text-center mt-10">Chargement en cours ...</div>;
  }

  /*
   * ==========================================================
   * RENDU
   * ==========================================================
   */

  try {
    /*
     * --------------------------------------------------------
     * ERREUR 504
     * --------------------------------------------------------
     *
     * On conserve ton système actuel :
     *
     * - UidPage reçoit status 200
     * - error504=true
     * - UidPage peut alors utiliser les données du
     *   localStorage côté client.
     */

    if ("status" in jsonUid && jsonUid.status === 504) {
      return (
        <>
          <UidPage
            jsonUid={{ status: 200 }}
            jsonReview={resReview}
            statsTranslate={propertiesFR}
            relicsSetTranslate={relic_setsFR}
            lightconesTranslate={light_conesFR}
            RelicsList={relicsFR}
            eidolonsList={character_ranksFR}
            changelog={changelog}
            error504
          />

          <Footer />
        </>
      );
    }

    /*
     * --------------------------------------------------------
     * ERREUR 400 / 404
     * --------------------------------------------------------
     */

    if (
      "status" in jsonUid &&
      (jsonUid.status === 400 || jsonUid.status === 404)
    ) {
      return (
        <>
          <UidPage
            jsonUid={jsonUid}
            jsonReview={resReview}
            statsTranslate={propertiesFR}
            relicsSetTranslate={relic_setsFR}
            lightconesTranslate={light_conesFR}
            RelicsList={relicsFR}
            eidolonsList={character_ranksFR}
            changelog={changelog}
          />

          <Footer />
        </>
      );
    }

    /*
     * --------------------------------------------------------
     * UID VALIDE
     * --------------------------------------------------------
     */

    return (
      <>
        <UidPage
          jsonUid={jsonUid}
          jsonReview={resReview}
          statsTranslate={propertiesFR}
          relicsSetTranslate={relic_setsFR}
          lightconesTranslate={light_conesFR}
          RelicsList={relicsFR}
          eidolonsList={character_ranksFR}
          changelog={changelog}
        />

        <Footer />
      </>
    );
  } catch (err) {
    console.error("Erreur lors du rendu de la page UID :", err);

    /*
     * En cas d'erreur inattendue, on conserve ton système
     * de fallback 504.
     */

    return (
      <>
        <UidPage
          jsonUid={{ status: 200 }}
          jsonReview={resReview}
          statsTranslate={propertiesFR}
          relicsSetTranslate={relic_setsFR}
          lightconesTranslate={light_conesFR}
          RelicsList={relicsFR}
          eidolonsList={character_ranksFR}
          changelog={changelog}
          error504
        />

        <Footer />
      </>
    );
  }
}
