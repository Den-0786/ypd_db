"use client";
import { useState } from "react";

export default function ExportAnalyticsButton({
  filtered,
  label = "Export Analytics Report",
  className = "",
}) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const { saveAs } = await import("file-saver");
      // Example: Export weekly trend as CSV
      const headers = ["Date", "Male", "Female", "Total"];
      const rows = (filtered?.sundayAttendance?.weeklyTrend || []).map((w) => [
        w.date,
        w.male,
        w.female,
        w.total,
      ]);
      const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      saveAs(blob, "analytics-weekly.csv");
    } catch (err) {
      alert("Failed to export analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      className={`w-full flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800 focus:bg-blue-100 dark:focus:bg-blue-700 transition rounded-t-lg ${className}`}
      aria-label={label}
      disabled={loading}
    >
      <i className="fas fa-download"></i> {loading ? "Exporting..." : label}
    </button>
  );
}
