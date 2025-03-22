import Image from "next/image";
import Header from "../../components/shared/Header";
import SideNav from "../../components/shared/SideNav";
import { SideNavProvider } from "../../components/shared/SideNav/side-nav-context";
import PathDisplay from "@/components/path-display";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNavProvider>
      <div className="relative h-dvh overflow-hidden bg-primary dark:bg-background">
        <div className="fixed inset-0">
          <Image
            src={"/images/bg-pattern.svg"}
            alt="bg-pattern"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="flex h-full relative z-10">
          <SideNav />
          <div className="flex flex-col flex-1 overflow-auto">
            <Header />
            <main className="flex-1 pr-3 pt-3 md:pl-0 pl-3 space-y-2">
              <PathDisplay />
              {children}
            </main>
          </div>
        </div>
      </div>
    </SideNavProvider>
  );
}
