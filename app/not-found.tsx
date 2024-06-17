import Footer from "@/components/Front/UID/Footer";
import NavBar from "@/components/Front/NavBar";
import { CDN2 } from "@/utils/cdn";
import React from "react";
import { cookies } from "next/headers";
import { TranslateSection } from "@/types/homepageDictionnary";

const notFound = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  return (
    <>
      <NavBar />
      <section className="flex justify-center items-center min-h-[calc(100vh-295px)]">
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <div>
          <h1 className="text-4xl text-center text-white font-bold">
            Kuru Kuru 404
          </h1>
          <div className="w-full md:w-[700px] md:m-6 my-5">
            <video
              autoPlay
              muted
              loop
              src={`https://res.cloudinary.com/shalltear/video/upload/v1710719830/review%20HSR/iwk9xt1rwtyim0cnkfju.webm`}
            />
          </div>
          <h3 className="text-3xl text-center text-white">
            {"Il semble que vous soyez perdu dans l'espace"}
          </h3>
        </div>
      </section>
      <Footer lang={lang} />
    </>
  );
};

export default notFound;
