import Link from "next/link";
import { ChevronRight } from "lucide-react";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Division as DivisionType } from "@/lib/types";

export default function DivisionCard({ divisionName, link }: DivisionType) {
  const formattedDivisionName = divisionName.split("-").join(" ").toUpperCase();

  return (
    <div className="relative transition-all duration-300 ease-in-out transform hover:-translate-y-[5px] active:translate-y-0">
      <Link href={link} className="block outline-none">
        <GlassMorphicCard
          className={cn(
            "p-4 md:p-5 rounded-xl transition-all duration-300",
            "shadow-sm hover:shadow-lg active:shadow",
            "hover:bg-white/25 active:bg-white/30 dark:hover:bg-slate-800/40"
          )}
        >
          <div className="flex md:flex-col md:h-[11dvh]">
            <div className="flex-grow md:flex-none">
              <h3
                className={cn(
                  "text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-300 drop-shadow-lg",
                  "text-background dark:text-foreground "
                )}
              >
                {formattedDivisionName}
              </h3>
            </div>

            <div className="flex items-center md:hidden ml-3">
              <ChevronRight className="h-5 w-5 text-background dark:text-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <div className="hidden md:flex md:justify-center md:w-full md:mt-auto ">
              <GlassMorphicCard className="rounded-full">
                <Button
                  variant="ghost"
                  className="transition-all duration-300 text-background hover:text-background  dark:text-foreground rounded-full hover:bg-transparent"
                  asChild
                >
                  <div className="group">
                    <span className="transition-opacity duration-300">
                      <span className="inline group-hover:hidden">
                        View Division
                      </span>
                      <span className="hidden group-hover:inline">
                        Open Division
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "ml-2 h-4 w-4 transition-transform duration-300",
                        "group-hover:translate-x-1"
                      )}
                    />
                  </div>
                </Button>
              </GlassMorphicCard>
            </div>
          </div>
        </GlassMorphicCard>
      </Link>
    </div>
  );
}
