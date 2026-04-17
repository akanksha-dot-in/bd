import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          pink:    "#FF3CAC",
          magenta: "#C71585",
          coral:   "#FF6B6B",
          peach:   "#FFB347",
          gold:    "#FFD700",
          cream:   "#FFF8F0",
          dark:    "#1A0A2E",
          purple:  "#7B2FBE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        body:    ["var(--font-body)", "sans-serif"],
        accent:  ["var(--font-accent)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;