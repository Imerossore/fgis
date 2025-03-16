"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SideNavContextType {
  isExpanded: boolean;
  toggleSideNav: () => void;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export function SideNavProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsExpanded(false);
      } else if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideNav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SideNavContext.Provider
      value={{
        isExpanded,
        toggleSideNav,
        isMobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
}

export function useSideNav() {
  const context = useContext(SideNavContext);
  if (context === undefined) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
}
