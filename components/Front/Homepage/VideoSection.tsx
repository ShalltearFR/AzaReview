"use client";
import LoadingSpin from "@/components/LoadingSpin";
import { CDN2 } from "@/utils/cdn";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface VideoSectionProps {
  handleScrollTo: (id: string) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  handleScrollTo,
}) => {
  const [uidInput, setUidInput] = useState<string>("");
  const [disableSearchButton, setDisableSearchButton] =
    useState<boolean>(false);
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <>
      <div className="flex w-full h-[calc(100vh-64px)] justify-center items-center relative mt-16">
        <div className="absolute w-full h-full bg-black/25 z-10" />
        <video
          className="w-full h-full object-cover absolute"
          preload="auto"
          autoPlay
          muted
          loop
          poster={`${CDN2}/img/homepage/miniature_video.avif`}
          disablePictureInPicture
        >
          <source
            src={`https://res.cloudinary.com/shalltear/video/upload/f_auto:video,q_auto/v1/review%20HSR/mdx0mxnzi31cma79gbok`}
            type="video/mp4"
          />
        </video>
        <div
          className="hidden smd:flex w-32 h-full absolute right-0 z-30 flex-col justify-center items-center gap-5"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.1) 5%)",
          }}
        >
          <a href="https://www.twitch.tv/azano__" target="_blank">
            <img
              src={`${CDN2}/img/twitch-logo2.svg`}
              className="h-8 ml-3"
              alt="logo twitch"
            />
          </a>
          <a href="https://www.youtube.com/@azano" target="_blank">
            <img
              src={`${CDN2}/img/youtube.svg`}
              className="h-8 ml-3"
              alt="logo twitch"
            />
          </a>
          <a href="https://discord.gg/vFJgRZhNCh" target="_blank">
            <img
              src={`${CDN2}/img/discord.svg`}
              className="h-8 ml-3"
              alt="logo twitch"
            />
          </a>
        </div>
        <div className="flex flex-col justify-center items-center bg-black rounded-full py-5 px-5 smd:py-10 smd:px-10 z-30 gap-x-5 shadow-md shadow-black extraXl:text-2xl">
          <Link
            href={"/characters"}
            className="py-2 px-3 bg-orange font-bold rounded-3xl"
          >
            Personnages / Builds
          </Link>
          <div className="flex items-center gap-2 mt-5">
            <input
              className="rounded-full w-40 h-10 pl-5 text-lg z-50 text-black"
              maxLength={9}
              placeholder="UID"
              value={uidInput}
              onChange={(e) => setUidInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (uidInput !== "" && uidInput) {
                    setDisableSearchButton(true);
                    if (isNaN(Number(uidInput)) && !isHomepage) {
                      setDisableSearchButton(false);
                    } else {
                      push(`/uid/${uidInput}`);
                    }
                  }
                }
              }}
            />
            <button
              disabled={disableSearchButton}
              className="bg-[#3E7032] flex gap-2 items-center h-10 px-4 rounded-full text-white z-50 disabled:bg-gray text-xl"
              onClick={() => {
                if (uidInput !== "" && uidInput) {
                  setDisableSearchButton(true);
                  if (isNaN(Number(uidInput)) && !isHomepage) {
                    setDisableSearchButton(false);
                  } else {
                    push(`/uid/${uidInput}`);
                  }
                }
              }}
            >
              <span>{disableSearchButton ? "Rechercher" : "Recherche"}</span>
              {disableSearchButton && (
                <span>
                  <LoadingSpin width="w-4" height="h-4" />
                </span>
              )}
            </button>
          </div>
          <ChevronDownIcon
            className="absolute h-24 bottom-3 animate-bounce cursor-pointer"
            onClick={() => handleScrollTo("section0")}
          />
        </div>
      </div>
    </>
  );
};
