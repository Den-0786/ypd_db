"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only access browser APIs after component is mounted
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
          setTheme(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        }
      } catch (error) {
        console.warn("Error accessing localStorage:", error);
        // Fallback to system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (
      mounted &&
      typeof window !== "undefined" &&
      typeof document !== "undefined"
    ) {
      try {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.warn("Error updating theme:", error);
      }
    }
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values instead of throwing error to prevent invariant issues
    console.warn("useTheme must be used within a ThemeProvider");
    return {
      theme: "light",
      setTheme: () => {},
      mounted: false,
    };
  }
  return context;
}
