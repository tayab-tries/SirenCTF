import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--bg-canvas)",
        foreground: "var(--color-text-primary)",
        brand: {
          50: "#ecfeff",
          100: "#cffaff",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "var(--color-accent-primary)",
          600: "var(--color-accent-hover)",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        surface: {
          50: "#162032",
          100: "#111827",
          200: "var(--bg-surface-elevated)",
          300: "var(--bg-surface)",
          400: "var(--bg-canvas)",
        },
        accent: {
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
          purple: "#a855f7",
          teal: "#0d9488",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-spin": "radarSpin 10s linear infinite",
      },
      keyframes: {
        radarSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
