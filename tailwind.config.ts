import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "#F5F3FF",
          100: "#EBE9FF",
          200: "#E6E6FA",
          300: "#D9D1FF",
          400: "#DDA0DD",
          500: "#C8A2C8",
          600: "#9B72AA",
          700: "#7B5EA7",
          800: "#4B0082",
          900: "#2D0052",
        },
        pink: {
          light: "#FFB6C1",
          glow: "#FFB6C1",
        },
        dark: {
          DEFAULT: "#0D0A1A",
          deep: "#1A0F2E",
        },
        light: {
          DEFAULT: "#F8F9FA",
          deep: "#EEEFF5",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "lavender-dark": "linear-gradient(135deg, #0D0A1A 0%, #1A0F2E 100%)",
        "lavender-light": "linear-gradient(135deg, #F8F9FA 0%, #EEEFF5 100%)",
      },
      backdropBlur: {
        glass: "10px",
      },
      boxShadow: {
        "glow-lavender": "0 0 20px rgba(155, 114, 170, 0.5)",
        "glow-pink": "0 0 20px rgba(255, 182, 193, 0.5)",
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        typewriter: "typewriter 0.05s steps(1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(155, 114, 170, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(155, 114, 170, 0.8)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
