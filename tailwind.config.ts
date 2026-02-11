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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-4px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "typing-dot-1": "typing-dot 1.2s ease-in-out infinite 0s",
        "typing-dot-2": "typing-dot 1.2s ease-in-out infinite 0.2s",
        "typing-dot-3": "typing-dot 1.2s ease-in-out infinite 0.4s",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
