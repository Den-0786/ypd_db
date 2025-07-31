import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YPG Database Management",
  description: "Young People's Guild Database Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.className} bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-1 max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
