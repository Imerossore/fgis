import Header from "../../components/shared/Header/header";
import SideNav from "../../components/shared/SideNav";

import { SideNavProvider } from "../../components/shared/SideNav/side-nav-context";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNavProvider>
      <div className="flex h-dvh flex-col md:flex-row">
        <SideNav userRole="admin" />
        <div className="flex flex-col flex-1 transition-[width] duration-200 ease-in-out">
          <Header />
          <main className="border flex-1">{children}</main>
        </div>
      </div>
    </SideNavProvider>
  );
}
