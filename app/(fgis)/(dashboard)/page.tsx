import DivisionComponent from "@/components/shared/DivisionComponent";
import { getAccessibleDivisions } from "@/lib/static-data";

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const divisions = getAccessibleDivisions();

  return (
    <div className="grid grid-cols-1 space-y-5">
      <DivisionComponent divisions={divisions} />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4"></section>
    </div>
  );
}
