import SystemDataComponent from "@/components/SystemDataComponent";
import { getSystemData } from "@/lib/actions/system";
import { getUser } from "@/lib/dal";

export default async function SystemPage() {
  const data = await getSystemData();
  const user = await getUser();

  return (
    <div className="bg-card p-5 rounded-md h-full">
      <SystemDataComponent data={data} user={user} />
    </div>
  );
}
