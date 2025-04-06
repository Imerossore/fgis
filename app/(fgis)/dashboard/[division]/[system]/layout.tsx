"use client";
import { SubNav } from "@/components/sub-nav";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { getDivisionSystemsAsNavItems } from "@/lib/data/access_control";
import { useParams, useRouter } from "next/navigation";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { division } = useParams();
  const router = useRouter();

  const divisionOneNavItems = getDivisionSystemsAsNavItems(`${division}`);

  if (!divisionOneNavItems) {
    return router.replace("/dashboard");
  }

  return (
    <GlassMorphicCard className=" mr-3 p-3 rounded-md text-white space-y-2 flex flex-col h-[90dvh]">
      <h1 className="text-3xl font-semibold">
        {division?.toLocaleString().replace(/-/g, " ").toUpperCase()}
      </h1>
      <div className="flex items-center gap-2">
        <SubNav items={divisionOneNavItems} back />
      </div>
      {children}
    </GlassMorphicCard>
  );
}
