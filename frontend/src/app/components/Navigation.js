"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render until client-side
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">YPG Database</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link href="/members" className="text-gray-600 hover:text-gray-900">
              Members
            </Link>
            <Link
              href="/attendance"
              className="text-gray-600 hover:text-gray-900"
            >
              Attendance
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
