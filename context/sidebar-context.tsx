"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  sidebarWidth: string;
  layoutWidth: string;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const sidebarWidth = isCollapsed ? "w-[100px]" : "w-[300px]";
  const layoutWidth = isCollapsed
    ? "grid-cols-[100px_1fr]"
    : "grid-cols-[300px_1fr]";

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        sidebarWidth,
        layoutWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
