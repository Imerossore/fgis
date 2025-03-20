"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";

interface DivisionCardProps {
  id: number;
  divisionName: string;
  link: string;
}

export default function DivisionCard({
  divisionName,
  link,
}: DivisionCardProps) {
  const formattedDivisionName = divisionName.split("-").join(" ").toUpperCase();
  return (
    <GlassMorphicCard className="p-5 rounded-xl shadow-sm">
      <div className=" flex flex-col h-[11dvh] hover:border-primary/50 transition-colors ">
        <div className="flex-none">
          <h3 className="text-xl md:text-2xl font-medium text-foreground ">
            {formattedDivisionName}
          </h3>
        </div>

        <div className="flex-none flex justify-center mt-auto">
          <Button variant="outline" asChild>
            <Link href={link}>
              View Division
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </GlassMorphicCard>
  );
}
