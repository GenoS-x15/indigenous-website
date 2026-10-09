import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Images must go through components/Img, which adds the base path used on GitHub Pages.
  {
    ignores: ["components/Img.tsx"],
    rules: {
      "no-restricted-imports": ["error", { paths: [{ name: "next/image", message: "Import Image from components/Img instead." }] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
