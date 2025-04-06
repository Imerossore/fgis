import PathDisplay from "@/components/path-display";
import { SubNav } from "@/components/sub-nav";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { DIVISIONS } from "@/lib/constant";

export default function ReportsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = DIVISIONS.map((division) => ({
    label: division.divisionName.toUpperCase().replace("-", " "),
    href: `/reports/${
      division.divisionName || division.divisionName.toLowerCase()
    }`,
  }));

  return (
    <div>
      <GlassMorphicCard className="rounded-lg p-4 flex flex-col gap-2 h-[85dvh]">
        <PathDisplay />
        <p className="w-[60dvw]">
          Manage uploaded reports from employees across all divisions. View
          submitted attachments, approve reports, or decline those requiring
          revision.
        </p>

        <div>
          <SubNav items={navItems} />
        </div>

        {children}
      </GlassMorphicCard>
    </div>
  );
}
