import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-en)", "system-ui", "sans-serif"],
        georgian: ["var(--font-ka)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
