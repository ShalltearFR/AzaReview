"use client";
import React, { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { CDN2 } from "@/utils/cdn";

// https://awv3node-homepage.surge.sh/build/assets   .svg
const url = (name: string, wrap = false) =>
  `${wrap ? "url(" : ""}${CDN2}/img/homepage/${name}${wrap ? ")" : ""}`;

export default function App() {
  const parallax = useRef<IParallax>(null!);
  return (
    <div style={{ width: "100%", height: "100%", background: "#253237" }}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#87BCDE" }}
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
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
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
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("stars.png")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
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
          <img src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true),
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          className="flex flex-col mt-20 md:flex-row md:mt-0 items-center justify-center gap-10"
        >
          <>
            <div className="w-96 h-96 bg-black rounded-3xl text-white">
              <p>Votre review Honkai : Star Rail rapide via votre UID</p>
            </div>
            <div className="w-96 h-96 bg-black rounded-3xl text-white">
              <p>Comment ça marche ?</p>
            </div>
          </>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={url("bash")} style={{ width: "40%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
          <img src={url("clients-main")} style={{ width: "40%" }} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
