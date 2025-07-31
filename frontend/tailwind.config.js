/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Light theme colors
        light: {
          bg: "#f8fafc",
          surface: "#ffffff",
          "surface-elevated": "#f1f5f9",
          text: "#1e293b",
          "text-secondary": "#64748b",
          border: "#e2e8f0",
          accent: "#3b82f6",
          "accent-hover": "#2563eb",
        },
        // Dark theme colors
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          "surface-elevated": "#334155",
          text: "#f1f5f9",
          "text-secondary": "#94a3b8",
          border: "#334155",
          accent: "#06b6d4",
          "accent-hover": "#0891b2",
        },
      },
      boxShadow: {
        "neumorphic-light": "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
        "neumorphic-light-inset":
          "inset 8px 8px 16px #d1d5db, inset -8px -8px 16px #ffffff",
        "neumorphic-dark": "8px 8px 16px #0f172a, -8px -8px 16px #334155",
        "neumorphic-dark-inset":
          "inset 8px 8px 16px #0f172a, inset -8px -8px 16px #334155",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.5)",
        "glow-yellow": "0 0 20px rgba(251, 191, 36, 0.5)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(6, 182, 212, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
