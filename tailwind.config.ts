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
      white: "#FFFFFF",
      black: "#000000",
      orange: "#F0A83B",
    },
  },
  plugins: [],
};
export default config;
