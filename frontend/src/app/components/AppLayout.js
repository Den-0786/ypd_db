"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ResourceProvider } from "./ResourceProvider";
import RefineNavigation from "./RefineNavigation";

export default function AppLayout({ children }) {
  return (
    <ThemeProvider>
      <ResourceProvider>
        <div className="min-h-screen flex flex-col">
          <RefineNavigation />
          {/* Main Content */}
          <main className="flex-1 max-w-full mx-auto py-6 px-6 lg:px-8 xl:px-12">
            {children}
          </main>
        </div>
      </ResourceProvider>
    </ThemeProvider>
  );
}
