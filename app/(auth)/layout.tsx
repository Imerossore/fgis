"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NiaLogo from "@/components/nia-logo";
import ImageCarousel from "@/components/image-carousel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const goto = () => {
    return pathname.startsWith("/login") ? (
      <p>
        New here?{" "}
        <Link href="/register" className="text-primary font-semibold">
          Create an account
        </Link>{" "}
        to get started.
      </p>
    ) : (
      <p>
        Existing user?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Sign in
        </Link>{" "}
        here.
      </p>
    );
  };

  return (
    <div className="flex items-center flex-col h-full ">
      <div className="absolute top-0 left-0 right-0 md:top-10 md:left-10 md:right-10 h-[65vh] overflow-hidden rounded-none md:rounded-2xl ">
        <ImageCarousel />
      </div>
      <div className="absolute top-0 left-0 right-0 md:top-10 md:left-10 md:right-10 h-[65vh] overflow-hidden rounded-none md:rounded-2xl bg-white/25 " />
      <h1 className="absolute top-14 md:top-16 text-center text-primary  glassmorphic p-2  overflow-hidden text-2xl md:text-4xl font-semibold ">
        NIA-UPRIIS FGIS MONITORING SYSTEM
      </h1>
      <Card className="z-[1] w-[22rem] absolute top-[50%] md:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 py-2">
        <CardHeader className="flex items-center justify-center pt-3">
          <NiaLogo size={110} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex items-center justify-center text-xs pb-3 ">
          {goto()}
        </CardFooter>
      </Card>
    </div>
  );
}
