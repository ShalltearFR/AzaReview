import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,

  {
    rules: {
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off",
    },
  },

  globalIgnores([
    "node_modules/**",
    "build/**",
    "dist/**",
    "public/**",
    ".next/**",
  ]),
]);
