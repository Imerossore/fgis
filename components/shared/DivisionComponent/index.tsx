import { Division, UserRole } from "@/lib/types";
import DivisionCard from "./division-card";
import StatusComponent from "@/components/status-component";
import NotificationComponent from "@/components/notification-component";

export default function DivisionComponent({
  divisions,
  userRole,
}: {
  divisions: Division[];
  userRole: UserRole;
}) {
  const isEditor = userRole === "editor" || divisions.length === 1;

  if (isEditor) {
    return (
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-full">
        <div className="col-span-1 row-span-1">
          <DivisionCard
            key={divisions[0].id}
            id={divisions[0].id}
            divisionName={divisions[0].divisionName}
            systems={divisions[0].systems}
          />
        </div>

        <div className="col-span-1 row-span-1">
          <div className="h-full">
            <StatusComponent />
          </div>
        </div>

        <div className="col-span-3 row-span-2 col-start-2 row-start-1">
          <div className="h-full">
            <NotificationComponent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {divisions.map((division) => (
        <DivisionCard
          key={division.id}
          id={division.id}
          divisionName={division.divisionName}
          systems={division.systems}
        />
      ))}
    </section>
  );
}
