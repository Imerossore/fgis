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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }

      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      } else if (window.innerWidth >= 768) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const toggleCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="h-full bg-gradient-root">
      <div className="fixed inset-0">
        <Image
          src="/images/bg-pattern.svg"
          alt="bg-pattern"
          fill
          priority
          className="object-cover opacity-45"
        />
      </div>

      <div
        className="hidden md:grid grid-rows-[auto_1fr] h-full transition-all duration-300"
        style={{
          gridTemplateColumns: sidebarCollapsed ? "90px 1fr" : "300px 1fr",
        }}
      >
        <div className="row-span-2 sticky top-0 h-dvh p-3 z-10">
          <SideNav collapsed={sidebarCollapsed} />
        </div>
        <Header
          toggleSidebar={toggleSidebar}
          toggleCollapsed={toggleCollapsed}
          isCollapsed={sidebarCollapsed}
        />
        <main className=" overflow-auto flex items-center justify-center">
          {children}
        </main>
      </div>

      <div className="md:hidden flex flex-col h-full">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1  overflow-auto">{children}</main>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={toggleSidebar}
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-40 w-[80%] max-w-[300px] p-3
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SideNav isMobile onClose={closeSidebar} />
        </div>
      </div>
    </div>
  );
}
