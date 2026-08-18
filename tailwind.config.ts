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
          DEFAULT: "#F3F3F1",
          surface: "#FFFFFF",
          raised: "#EAEAE7",
        },
        border: {
          DEFAULT: "#DCDCD8",
          strong: "#C8C8C3",
        },
        ink: {
          DEFAULT: "#18181A",
          muted: "#68686D",
          faint: "#99999F",
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