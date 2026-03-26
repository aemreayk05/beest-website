import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dirty-white": "#F3F3F3",
        "jet-black": "#111111",
        "neon-purple": "#7F00FF",
      },
      boxShadow: {
        "soft-purple": "0 10px 40px -10px rgba(127, 0, 255, 0.2)",
        "neon-glow": "0 0 16px 2px rgba(127, 0, 255, 0.45)",
      },
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
