"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { useState } from "react";

interface DivisionCardProps {
  id: number;
  divisionName: string;
  link: string;
}

export default function DivisionCard({
  divisionName,
  link,
}: DivisionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDivisionName = divisionName.split("-").join(" ").toUpperCase();

  return (
    <div
      className="transition-all duration-300 ease-in-out transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassMorphicCard
        className={`p-5 rounded-xl transition-all duration-300 ${
          isHovered
            ? "shadow-lg bg-white/25 dark:bg-slate-800/40 translate-y-[-5px]"
            : "shadow-sm"
        }`}
      >
        <div className="flex flex-col h-[11dvh]">
          <div className="flex-none">
            <h3
              className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
                isHovered ? "text-primary" : "text-foreground"
              }`}
            >
              {formattedDivisionName}
            </h3>
          </div>

          <div className="flex-none flex justify-center mt-auto">
            <Button
              variant={"outline"}
              className="transition-all duration-300"
              asChild
            >
              <Link href={link}>
                {isHovered ? "Open Division" : "View Division"}
                <ArrowRight
                  className={`transition-transform duration-300 ${
                    isHovered ? "ml-2 h-4 w-4 translate-x-1" : "ml-2 h-4 w-4"
                  }`}
                />
              </Link>
            </Button>
          </div>
        </div>
      </GlassMorphicCard>
    </div>
  );
}
