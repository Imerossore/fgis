import { Division } from "@/lib/types";
import DivisionCard from "./division-card";

export default function DivisionComponent({
  divisions,
}: {
  divisions: Division[];
}) {
  return (
    <section className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 ">
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
