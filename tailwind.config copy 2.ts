import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#F7F7F5",
          surface: "#FFFFFF",
          raised: "#F0F0EE",
        },
        border: {
          DEFAULT: "#E2E2DF",
          strong: "#CFCFCA",
        },
        ink: {
          DEFAULT: "#18181A",
          muted: "#6B6B70",
          faint: "#A1A1A6",
        },
        accent: {
          DEFAULT: "#F97316",
          dim: "#C2410C",
          faint: "#FFF1E8",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jbmono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.5rem, 2.5vw, 2.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
      maxWidth: {
        content: "1180px",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;