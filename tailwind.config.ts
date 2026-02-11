import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        finnik: {
          "blue-main": "#0938BD",
          "blue-deep": "#0931AC",
          "blue-intense": "#0730AA",
          "blue-mid": "#103195",
          "blue-dark": "#0B2572",
          black: "#070F14",
          white: "#FCFDFD",
          "white-cool": "#F6F7F8",
          "gray-light": "#DDDFE4",
          "gray-mid": "#ADB0BB",
          "header-bg": "#CAD5F2",
          coral: "#D07371",
        },
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-4px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease-out forwards",
        "typing-dot-1": "typing-dot 1.2s ease-in-out infinite 0s",
        "typing-dot-2": "typing-dot 1.2s ease-in-out infinite 0.2s",
        "typing-dot-3": "typing-dot 1.2s ease-in-out infinite 0.4s",
      },
    },
  },
  plugins: [],
};

export default config;
