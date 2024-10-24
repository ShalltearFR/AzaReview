import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "510px",
      smd: "650px",
      mmd: "750px",
      md: "880px",
      lg: "990px",
      xl: "1350px",
      xl2: "1700px",
      xxl: "1920px",
    },
    fontFamily: {},
    colors: {
      transparent: "transparent",
      background: "#1F2937", //Bleu foncé
      blue: "#04576f", //Bleu azano
      "light-blue": "#4E4A82",
      "light-blue2": "#6a91fd",
      white: "#FFFFFF",
      black: "#000000",
      orange: "#F0A83B",
      orange2: "#cf8800",
      yellow: "#FFCD6C",
      brown: "#8C5C00",
      brown2: "#432e2b",
      gray: "#828282",
      "light-gray": "#D9D9D9",
      red: "#FF4B4B",
      green: "#00ff00",
      darkGreen: "#108f10",
      darkGreen2: "#0c2d0c",
      purple: "#76617b",
      darkPurple: "#42368d",
      darkRed: "#420d02",
    },
    extend: {
      animation: {
        // Définir des animations personnalisées ici
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        alwaysShow: "alwaysShow 0.5s ease-in-out",
        homePageBounce: "homePage-bounce 2s ease-in-out infinite",
      },
      keyframes: {
        alwaysShow: {
          "0%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "homePage-bounce": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
};
export default config;
