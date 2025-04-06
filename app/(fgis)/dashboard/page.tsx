import DivisionComponent from "@/components/shared/DivisionComponent";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import DivisionServicePieChart from "@/components/shared/ChartsComponent/DivisionServicePieChart";
import MonthlyComparisonBarChart from "@/components/shared/ChartsComponent/MonthlyComparisonBarChart";
import { getAccessibleDivisions } from "@/lib/data/access_control";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import PathDisplay from "@/components/path-display";

export default async function DashboardPage() {
  const user = await getUser();
  const divisions = getAccessibleDivisions({ user });

  if (!user.role) {
    redirect("/setting");
  }

  return (
    <div className="grid grid-cols-1 space-y-4 max-w-full">
      <PathDisplay />
      <DivisionComponent divisions={divisions} />

      <div>
        <GlassMorphicCard className="flex flex-row justify-between items-center  mb-3 gap-2 rounded-lg py-2 px-4 border-none">
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
