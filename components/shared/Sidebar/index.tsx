"use client";
import { useSidebar } from "@/context/sidebar-context";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { sidebarWidth } = useSidebar();
  return (
    <aside className="row-span-2 relative bg-gray-100 p-4 hidden md:block transition-all duration-300 ease-in-out">
      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 left-0 p-2 transition-all duration-300 ease-in-out",
          sidebarWidth
        )}
      >
        <nav className="border-4 border-black h-full">nav</nav>
      </div>
    </aside>
  );
}
