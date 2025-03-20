import DivisionComponent from "@/components/shared/DivisionComponent";

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const divisions = [
    {
      id: 1,
      divisionName: "Division-1",
      link: "/Division1/system_1",
    },
    {
      id: 2,
      divisionName: "Division-2",
      link: "/Division2/system_1",
    },
    {
      id: 3,
      divisionName: "Division-3",
      link: "/Division3/system_1",
    },
    {
      id: 4,
      divisionName: "Division-4",
      link: "/Division4/system_1",
    },
    {
      id: 5,
      divisionName: "Division-5",
      link: "/Division5/system_1",
    },
    {
      id: 6,
      divisionName: "Division-6",
      link: "/Division6/system_1",
    },
    {
      id: 7,
      divisionName: "DRD",
      link: "/DRD/system_1",
    },
  ];

  return (
    <div className="grid grid-cols-1 grid-rows-2 pr-3 pt-3 md:pl:0">
      <DivisionComponent divisions={divisions} />
      <section>chart</section>
    </div>
  );
}
