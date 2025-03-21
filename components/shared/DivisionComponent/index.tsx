import DivisionCard from "./division-card";

interface DivisionComponentProps {
  divisions: Array<{
    id: number;
    divisionName: string;
    link: string;
  }>;
}

export default function DivisionComponent({
  divisions,
}: DivisionComponentProps) {
  return (
    <section className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 grid-rows-2 ">
      {divisions.map((division) => (
        <DivisionCard
          key={division.id}
          id={division.id}
          divisionName={division.divisionName}
          link={division.link}
        />
      ))}
    </section>
  );
}
