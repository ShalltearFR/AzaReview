"use client";
import React, { useRef, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { CDN2 } from "@/utils/cdn";
import NavBar from "@/components/Front/NavBar";
import NotationArray from "@/components/Front/Homepage/NotationArray";

// https://awv3node-homepage.surge.sh/build/assets   .svg
const url = (name: string, wrap = false) =>
  `${wrap ? "url(" : ""}${CDN2}/img/homepage/${name}${wrap ? ")" : ""}`;

export default function App() {
  const parallax = useRef<IParallax>(null!);

  return (
    <>
      <div className="w-full h-full bg-[#253237]">
        <Parallax ref={parallax} pages={3}>
          <NavBar isHomepage />
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: "#805E73" }}
          />
          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: "#2f1c5b" }}
          />

          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url("stars.svg", true),
              backgroundSize: "cover",
            }}
          />

          <ParallaxLayer
            offset={1.3}
            speed={-0.3}
            style={{ pointerEvents: "none" }}
          >
            <img
              src={url("logo_SRE.webp")}
              style={{ width: "15%", marginLeft: "70%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            {/* <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          /> */}
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            {/* <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          /> */}
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            {/* <img
            src={url("stars.png")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          /> */}
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            {/* <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          /> */}
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            {/* <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          /> */}
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {/* <img src={url("earth")} style={{ width: "60%" }} /> */}
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: "80%",
              backgroundPosition: "center",
              // backgroundImage: url("clients", true),
            }}
          />

          <ParallaxLayer
            offset={0}
            speed={0.1}
            className="flex flex-col mt-20 md:flex-row md:mt-0 items-center justify-center gap-10"
          >
            <>
              <div className="flex flex-col justify-center items-center w-[512px] h-96 bg-black rounded-3xl text-white">
                <h1 className="text-3xl font-bold mb-10">
                  Votre review Honkai : Star Rail
                </h1>
                <p className="font-bold text-xl">Comment ça marche ?</p>

                <p>Entrez votre UID de jeu</p>
                <p>
                  Les elements en <span className="text-red">rouge</span> sont
                  des statistiques à améliorer
                </p>
                <p className="mt-8 font-medium">
                  Des recommandations peuvent apparaitre au passage de la souris
                </p>
              </div>
              <div className="w-96 h-96 bg-black rounded-3xl text-white flex flex-col">
                <p className="text-center font-bold text-lg mt-5">
                  Selectionnez vos personnages en vitrine
                </p>
                <img
                  src={`${CDN2}/img/homepage/expl02.webp`}
                  className="h-80 object-contain my-auto mx-auto"
                />
              </div>
            </>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            className="flex flex-col mt-20 md:flex-row md:mt-0 items-center justify-center gap-10"
          >
            <>
              <div className="flex flex-col justify-center items-center w-[512px] h-96 bg-black rounded-3xl text-white text-center px-20">
                <p>
                  {"Si vous possedez un score "} <strong>au dessus de A</strong>
                  {
                    ", vous n'avez pas forcément besoin de trouver une meilleure relique/ornement."
                  }
                </p>
                <p className="mt-5">
                  {"En revanche, si votre score est "}
                  <strong>en dessous de A</strong> {", il faut l'améliorer."}
                </p>
                <p className="mt-10">
                  Les notations sont adaptés pour les besoins du personnage
                </p>
                <p className="mt-10 font-medium text-lg">
                  Elles sont toutes évaluées par{" "}
                  <span>
                    <a
                      href="https://www.twitch.tv/azano__"
                      target="_blank"
                      className="underline font-bold hover:no-underline"
                    >
                      Azano
                    </a>
                    <img
                      src={`${CDN2}/img/twitch-logo.svg`}
                      className="h-6 ml-1 inline"
                      alt="logo twitch"
                    />
                  </span>
                </p>
              </div>
              <div className="w-96 h-96 bg-black/75 rounded-3xl text-white flex flex-col justify-center items-center">
                <NotationArray />
              </div>
            </>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            className="flex flex-col mt-20 md:flex-row md:mt-0 items-center justify-center gap-10"
          >
            <>
              <div className="flex flex-col justify-center items-center w-[512px] h-96 bg-black rounded-3xl text-white text-center px-16 text-2xl">
                <p className="font-bold mb-10">
                  Vous dépensez deja sur le jeu et vous voulez faire des
                  economies ?
                </p>
                <p>
                  Avec{" "}
                  <a
                    href="https://www.eneba.com/fr/top-up-honkai-star-rail-oneiric-shard-malaysia?enb_campaign=Main+Search&enb_content=search+dropdown+-+products&enb_medium=product+card&enb_source=https%3A%2F%2Fwww.eneba.com%2Ftop-up-genshin-impact-genesis-crystals-malaysia&enb_term=1&af_id=Azano&utm_medium=af&utm_source=Azano"
                    target="_blank"
                    className="font-bold underline hover:no-underline"
                  >
                    Eneba
                  </a>
                  , vous dépensez moins et vous avez un cashback quand vous
                  achetez
                </p>
              </div>
            </>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}
