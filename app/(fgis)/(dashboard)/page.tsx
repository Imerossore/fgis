import DivisionComponent from "@/components/shared/DivisionComponent";

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="grid grid-rows-2 gap-3 pr-3 pt-3">
      <DivisionComponent />
      <section>chart </section>
    </div>
  );
}
