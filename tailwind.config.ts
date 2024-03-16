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
      xxl: "1920px",
    },
    fontFamily: {},
    colors: {
      transparent: "transparent",
      background: "#1F2937", //Bleu foncé
      blue: "#006A89", //Bleu azano
      "light-blue": "#4E4A82",
      "light-blue2": "#6a91fd",
      white: "#FFFFFF",
      black: "#000000",
      orange: "#F0A83B",
      orange2: "#cf8800",
      yellow: "#FFCD6C",
      brown: "#8C5C00",
      gray: "#828282",
      "light-gray": "#D9D9D9",
      red: "#FF4B4B",
      green: "#00ff00",
      purple: "#76617b",
      darkPurple: "#42368d",
      darkRed: "#5b0f00",
    },
    extend: {
      animation: {
        // Définir des animations personnalisées ici
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        // Définir les keyframes pour les animations personnalisées
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
