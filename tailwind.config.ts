import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "min-height max-height",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "button-secondary-color": "var(--button-secondary-color)",
        "link-color": "var(--link-color)",

        "button-primary-color": "var(--button-primary-color)",
      },
      fontFamily: {
        "reem-kufi": ["var(--font-reem-kufi)"],
        "noto-kufi": ["var(--font-noto-kufi)"],
      },
    },
  },

  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
