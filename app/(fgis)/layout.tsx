"use client";

import Header from "@/components/header";
import SideNav from "@/components/side-nav";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-full">
      {/* Background Image */}
      <div className="fixed inset-0">
        <Image
          src="/images/bg-pattern.svg"
          alt="bg-pattern"
          fill
          priority
          className="object-cover opacity-45"
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-[300px_1fr] grid-rows-[auto_1fr] h-full">
        <div className="row-span-2 sticky top-0 h-dvh p-3 z-10">
          <SideNav />
        </div>
        <Header />
        <main className="border overflow-auto flex items-center justify-center">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 border overflow-auto">{children}</main>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-40 w-[80%] max-w-[300px] p-3
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <SideNav isMobile onClose={closeSidebar} />
        </div>
      </div>
    </div>
  );
}
