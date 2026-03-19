import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0e6b6e",
          50: "#f0fafa",
          100: "#d0f0f0",
          200: "#a1e1e2",
          300: "#62c9ca",
          400: "#2da9ab",
          500: "#0e6b6e",
          600: "#0b5759",
          700: "#094547",
          800: "#073537",
          900: "#052829",
        },
        accent: {
          DEFAULT: "#c9943a",
          50: "#fdf8ee",
          100: "#f9ecd0",
          200: "#f2d59e",
          300: "#e9ba63",
          400: "#dfa034",
          500: "#c9943a",
          600: "#a97a2e",
          700: "#876025",
          800: "#6a4b1e",
          900: "#4f3816",
        },
      },
    },
  },
  plugins: [],
};

export default config;
