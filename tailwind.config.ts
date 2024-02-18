import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#1F2937", //Bleu foncé
      "light-blue": "#4E4A82",
      white: "#FFFFFF",
      black: "#000000",
      orange: "#F0A83B",
      orange2: "#FFA800",
      yellow: "#FFCD6C",
      brown: "#8C5C00",
      gray: "#828282",
      "light-gray": "#D9D9D9",
      red: "#FF4B4B",
    },
  },
  plugins: [],
};
export default config;
