import Footer from "@/components/Front/Footer";
import NavBar from "@/components/Front/NavBar";
import { CDN2 } from "@/utils/cdn";
import React from "react";

const notFound = () => {
  return (
    <>
      <NavBar />
      <section className="flex justify-center items-center min-h-[calc(100vh-295px)]">
        <div className="">
          <h1 className="text-4xl text-center text-white">Kuru Kuru 404</h1>
          <div className="w-full md:w-[700px] md:m-6 my-5">
            <video autoPlay muted loop src={`${CDN2}/video/404.webm`} />
          </div>
          <h3 className="text-3xl text-center text-white">
            {"Il semble que vous soyez perdu dans l'espace"}
          </h3>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default notFound;
