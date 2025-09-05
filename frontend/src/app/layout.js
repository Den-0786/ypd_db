import { Inter } from "next/font/google";
import "./globals.css";
import { ClientThemeProvider } from "./components/ClientThemeProvider";

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
      <body className={`${inter.className}`}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
