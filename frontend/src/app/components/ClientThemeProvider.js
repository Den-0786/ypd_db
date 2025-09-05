"use client";

import { ThemeProvider } from "./ThemeProvider";

export function ClientThemeProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}


