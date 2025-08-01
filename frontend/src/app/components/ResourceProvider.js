"use client";

import { createContext, useContext, useState } from "react";

const ResourceContext = createContext({
  resources: [],
  currentResource: null,
  setCurrentResource: () => {},
});

export function ResourceProvider({ children }) {
  const [currentResource, setCurrentResource] = useState("dashboard");

  // Define available resources (equivalent to Refine resources)
  const resources = [
    {
      name: "dashboard",
      path: "/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "members",
      path: "/members",
      label: "Members",
      icon: "fas fa-users",
    },
    {
      name: "attendance",
      path: "/attendance",
      label: "Attendance",
      icon: "fas fa-clipboard-check",
    },
    {
      name: "analytics",
      path: "/analytics",
      label: "Analytics",
      icon: "fas fa-chart-bar",
    },
    {
      name: "bulk",
      path: "/bulk",
      label: "Bulk Operations",
      icon: "fas fa-upload",
    },
    {
      name: "leaderboard",
      path: "/leaderboard",
      label: "Leaderboard",
      icon: "fas fa-trophy",
    },
  ];

  const value = {
    resources,
    currentResource,
    setCurrentResource,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResource() {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    console.warn("useResource must be used within a ResourceProvider");
    return {
      resources: [],
      currentResource: null,
      setCurrentResource: () => {},
    };
  }
  return context;
}
