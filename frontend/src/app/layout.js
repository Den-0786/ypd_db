import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YPG Database Management",
  description: "Young People's Guild Database Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Header */}
          <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-white text-xl font-bold">
                      <i className="fas fa-database mr-2"></i>
                      YPG Database
                    </h1>
                  </div>
                </div>
                
                <Navigation />
                
                {/* Mobile menu button */}
                <div className="sm:hidden">
                  <button className="text-white hover:text-blue-200 p-2">
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
