import { Skeleton } from "@/components/ui/skeleton";

export default function UsermanagementLoading() {
  return (
    <div className="h-full grid grid-cols-4 grid-rows-4 gap-3  pt-2">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
