import DivisionComponent from "@/components/shared/DivisionComponent";
import { getAccessibleDivisions } from "@/lib/static-data";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import DivisionServicePieChart from "@/components/shared/ChartsComponent/DivisionServicePieChart";
import MonthlyComparisonBarChart from "@/components/shared/ChartsComponent/MonthlyComparisonBarChart";

export default function DashboardPage() {
  const divisions = getAccessibleDivisions();

  return (
    <div className="grid grid-cols-1 space-y-4 max-w-full">
      <DivisionComponent divisions={divisions} />

      <div>
        <GlassMorphicCard className="flex flex-row justify-between items-center  mb-3 gap-2 rounded-lg p-2 px-2 border-none">
          <div className="flex-1 min-w-0 ">
            <h2 className="text-sm sm:text-lg font-semibold tracking-tight text-white line-clamp-1">
              Key Metrics
            </h2>
            <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
              Performance visualization and insights
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/20 hover:bg-white/30 border-white/30 cursor-pointer"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4 text-white" />
              <span className="sr-only">Refresh data</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-1 h-8 text-white hover:bg-white/20 hover:text-white text-sm px-3 whitespace-nowrap"
            >
              <Link href="/charts">
                See more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </GlassMorphicCard>

        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 overflow-hidden mb-3">
          <MonthlyComparisonBarChart />
          <DivisionServicePieChart />
        </section>
      </div>
    </div>
  );
}
