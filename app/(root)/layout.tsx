"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useSidebar } from "@/context/sidebar-context";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { layoutWidth } = useSidebar();
  return (
    <div
      className={cn(
        "min-h-screen grid grid-rows-[auto_1fr] transition-all duration-300 ease-in-out",
        "md:grid md:transition-all md:duration-300 md:ease-in-out",
        `md:${layoutWidth}`
      )}
    >
      <Sidebar />
      <Header />

      <main className="p-6 bg-amber-200 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
