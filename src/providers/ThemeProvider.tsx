"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Strictly configured with default light theme and attribute class
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="unitypulse-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
