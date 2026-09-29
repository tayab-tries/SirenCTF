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
        background: "var(--background)",
        foreground: "var(--text-primary)",
        obsidian: "#050507",
        charcoal: "#0d0d11",
        graphite: "#15151b",
        borderDark: "#27272a",
        siren: {
          crimson: "#c1121f",
          red: "#e31b2e",
          hot: "#ff3347",
          dark: "#700914",
        },
        surface: {
          50: "#18181b",
          100: "#15151b",
          200: "#0d0d11",
          300: "#050507",
        },
        accent: {
          red: "#e31b2e",
          crimson: "#c1121f",
          hot: "#ff3347",
          neutral: "#a1a1aa",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-orbitron)", "var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "siren-spin": "sirenRotate 24s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
