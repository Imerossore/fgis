import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { cn } from "@/lib/utils";

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
    <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-[5px]">
      <GlassMorphicCard
        className={cn(
          "p-5 rounded-xl transition-all duration-300",
          "shadow-sm hover:shadow-lg",
          "hover:bg-white/25 dark:hover:bg-slate-800/40"
        )}
      >
        <div className="flex flex-col h-[11dvh]">
          <div className="flex-none">
            <h3
              className={cn(
                "text-xl md:text-2xl font-medium transition-colors duration-300",
                "text-foreground group-hover:text-primary hover:text-primary"
              )}
            >
              {formattedDivisionName}
            </h3>
          </div>

          <div className="flex-none flex justify-center mt-auto ">
            <Button
              variant="outline"
              className="transition-all duration-300 "
              asChild
            >
              <Link href={link} className="group">
                <span className="transition-opacity duration-300">
                  <span className="inline group-hover:hidden">
                    View Division
                  </span>
                  <span className="hidden group-hover:inline">
                    Open Division
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    "ml-2 h-4 w-4 transition-transform duration-300",
                    "group-hover:translate-x-1"
                  )}
                />
              </Link>
            </Button>
          </div>
        </div>
      </GlassMorphicCard>
    </div>
  );
}
