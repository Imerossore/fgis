import Image from "next/image";
import Header from "../../components/shared/Header";
import SideNav from "../../components/shared/SideNav";
import { SideNavProvider } from "../../components/shared/SideNav/side-nav-context";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNavProvider>
      <div className="relative h-dvh overflow-hidden">
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
          <SideNav userRole="admin" />
          <div className="flex flex-col flex-1 overflow-auto">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </SideNavProvider>
  );
}
